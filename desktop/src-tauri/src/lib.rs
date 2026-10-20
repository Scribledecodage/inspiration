//! Inspiration — application de bureau.
//!
//! Le moteur est en Rust : pas de Chromium embarqué, pas de Node. L'interface
//! est dessinée par le WebView2 déjà installé sur Windows. Au repos, l'app
//! consomme quelques dizaines de mégaoctets de mémoire et n'allume le
//! processeur que lorsqu'il y a quelque chose à afficher.

use tauri::menu::{Menu, MenuItem};
use tauri::tray::TrayIconBuilder;
use tauri::{Manager, WindowEvent};

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
        // Redémarrage de l'application après l'installation d'une mise à
        // jour.
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_autostart::init(
            tauri_plugin_autostart::MacosLauncher::LaunchAgent,
            None,
        ))
        .setup(|app| {
            // Icône dans la zone de notification : l'application reste
            // accessible même quand la fenêtre est fermée.
            let open = MenuItem::with_id(app, "open", "Ouvrir Inspiration", true, None::<&str>)?;
            let update = MenuItem::with_id(app, "update", "Rechercher des mises à jour", true, None::<&str>)?;
            let quit = MenuItem::with_id(app, "quit", "Quitter", true, None::<&str>)?;

            let menu = Menu::with_items(app, &[&open, &update, &quit])?;

            let mut tray = TrayIconBuilder::with_id("main")
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
                            let _ = window.emit_to("main", "menu://update");
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

            // Masquer dans la barre des tâches quand la fenêtre est
            // fermée : l'application continue de recevoir les
            // notifications.
            tray.set_icon_as_template(true);

            Ok(())
        })
        .on_window_event(|window, event| {
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
