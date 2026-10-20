//! Inspiration — application de bureau.
//!
//! Le moteur est en Rust : pas de Chromium embarqué, pas de Node. L'interface
//! est dessinée par le WebView2 déjà installé sur Windows. Au repos, l'app
//! consomme quelques dizaines de mégaoctets de mémoire et n'allume le
//! processeur que lorsqu'il y a quelque chose à afficher.

use tauri::menu::{Menu, MenuItem};
use tauri::tray::TrayIconBuilder;
use tauri::{Emitter, Manager, WindowEvent};

/// Taille minimale de la fenêtre (celle déclarée dans `tauri.conf.json`).
///
/// La taille mémorisée peut devenir aberrante (fenêtre réduite par un
/// logiciel tiers, affichage débranché, mise à l'échelle bizarre) : dans ce
/// cas, l'application s'ouvrirait dans un rectangle de quelques pixels.
const MIN_WIDTH: u32 = 480;
const MIN_HEIGHT: u32 = 520;

/// Taille habituelle de la fenêtre.
const DEFAULT_WIDTH: f64 = 1320.0;
const DEFAULT_HEIGHT: f64 = 860.0;

/// Remet une taille valable si celle restaurée est aberrante.
fn ensure_sane_size(window: &tauri::WebviewWindow) {
    let Ok(size) = window.outer_size() else {
        return;
    };

    if size.width >= MIN_WIDTH && size.height >= MIN_HEIGHT {
        return;
    }

    let _ = window.set_size(tauri::LogicalSize::new(DEFAULT_WIDTH, DEFAULT_HEIGHT));
    let _ = window.center();
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let mut builder = tauri::Builder::default();

    // Une seule instance : un second lancement réveille la fenêtre
    // existante (et non une deuxième fenêtre, qui viderait la mémoire).
    #[cfg(not(any(target_os = "android", target_os = "ios")))]
    {
        builder = builder.plugin(tauri_plugin_single_instance::init(|app, _argv, _cwd| {
            if let Some(window) = app.get_webview_window("main") {
                let _ = window.unminimize();
                let _ = window.show();
                let _ = window.set_focus();
            }
        }));
    }

    builder
        // Mémorise la taille et la position de la fenêtre entre deux
        // ouvertures (et le plein écran).
        .plugin(tauri_plugin_window_state::Builder::default().build())
        // Mise à jour automatique : les paquets sont signés, l'application
        // refuse d'installer une mise à jour non signée.
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_opener::init())
        // Les requêtes adressées au site (téléversement d'images, GIF,
        // tendances) sont faites depuis la couche native : le navigateur ne
        // peut donc pas les bloquer pour une question d'origine.
        .plugin(tauri_plugin_http::init())
        // Redémarrage de l'application après l'installation d'une mise à
        // jour.
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_autostart::init(
            tauri_plugin_autostart::MacosLauncher::LaunchAgent,
            None,
        ))
        .setup(|app| {
            // La taille mémorisée est restaurée par le greffon : on vérifie
            // qu'elle est bien utilisable avant d'afficher quoi que ce soit.
            if let Some(window) = app.get_webview_window("main") {
                ensure_sane_size(&window);
            }

            // Icône dans la zone de notification : l'application reste
            // accessible même quand la fenêtre est fermée.
            let open = MenuItem::with_id(app, "open", "Ouvrir Inspiration", true, None::<&str>)?;
            let update = MenuItem::with_id(app, "update", "Rechercher des mises à jour", true, None::<&str>)?;
            let quit = MenuItem::with_id(app, "quit", "Quitter", true, None::<&str>)?;

            let menu = Menu::with_items(app, &[&open, &update, &quit])?;

            let _tray = TrayIconBuilder::with_id("main")
                .icon(app.default_window_icon().unwrap().clone())
                .tooltip("Inspiration")
                .menu(&menu)
                .show_menu_on_left_click(false)
                .on_menu_event(|app, event| match event.id().as_ref() {
                    "open" => {
                        if let Some(window) = app.get_webview_window("main") {
                            let _ = window.unminimize();
                            let _ = window.show();
                            let _ = window.set_focus();
                        }
                    }
                    "update" => {
                        // L'interface s'occupe de la vérification et de
                        // l'installation ; on se contente de la réveiller.
                        if let Some(window) = app.get_webview_window("main") {
                            let _ = window.show();
                            let _ = window.set_focus();
                            let _ = window.emit_to("main", "menu://update", ());
                        }
                    }
                    "quit" => app.exit(0),
                    _ => {}
                })
                .on_tray_icon_event(|tray, event| {
                    // Un clic gauche ouvre la fenêtre, un double-clic aussi.
                    if let tauri::tray::TrayIconEvent::Click {
                        button: tauri::tray::MouseButton::Left,
                        button_state: tauri::tray::MouseButtonState::Up,
                        ..
                    } = event
                    {
                        if let Some(window) = tray.app_handle().get_webview_window("main") {
                            let _ = window.unminimize();
                            let _ = window.show();
                            let _ = window.set_focus();
                        }
                    }
                })
                .build(app)?;

            Ok(())
        })
        .on_window_event(|window, event| {
            // Une taille aberrante (restaurée ou imposée par le système)
            // est remplacée par une taille utilisable.
            if let WindowEvent::Resized(_) = event {
                ensure_sane_size(window);
            }

            // La croix ferme la fenêtre sans quitter l'application (qui
            // reste dans la zone de notification).
            if let WindowEvent::CloseRequested { api, .. } = event {
                if window.label() == "main" {
                    api.prevent_close();
                    let _ = window.hide();
                }
            }
        })
        .run(tauri::generate_context!())
        .expect("erreur au lancement de l'application");
}
