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
///
/// La macro travaille avec les deux types de fenêtre : la fenêtre de
/// l'application (`WebviewWindow`) et celle que donne l'événement de
/// redimensionnement (`Window`). Elles ont les mêmes méthodes, mais aucun
/// trait commun les réunit : d'où la macro.
macro_rules! ensure_sane_size {
    ($window:expr) => {{
        let window = $window;

        if let Ok(size) = window.outer_size() {
            if size.width < MIN_WIDTH || size.height < MIN_HEIGHT {
                let _ = window.set_size(tauri::LogicalSize::new(DEFAULT_WIDTH, DEFAULT_HEIGHT));
                let _ = window.center();
            }
        }
    }};
}

/// Zone utilisable de l'écran : elle exclut la barre des tâches.
struct WorkArea {
    x: i32,
    y: i32,
    width: u32,
    height: u32,
}

/// La zone utilisable de l'écran (celle qui exclut la barre des tâches).
///
/// Windows ne la donne pas par l'intermédiaire de Tauri : on la demande
/// directement au système.
#[cfg(target_os = "windows")]
fn work_area() -> Option<WorkArea> {
    use windows_sys::Win32::Foundation::RECT;
    use windows_sys::Win32::UI::WindowsAndMessaging::{
        SystemParametersInfoW, SPI_GETWORKAREA
    };

    let mut rect = RECT {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    };

    // SAFETY : `rect` est une variable locale vivante, et le pointeur
    // transmis est celui de cette variable.
    let ok = unsafe {
        SystemParametersInfoW(
            SPI_GETWORKAREA,
            0,
            &mut rect as *mut RECT as *mut std::ffi::c_void,
            0,
        )
    };

    if ok == 0 {
        return None;
    }

    Some(WorkArea {
        x: rect.left,
        y: rect.top,
        width: (rect.right - rect.left).max(0) as u32,
        height: (rect.bottom - rect.top).max(0) as u32,
    })
}

/// Sur les autres systèmes, on ne bride rien.
#[cfg(not(target_os = "windows"))]
fn work_area() -> Option<WorkArea> {
    None
}

/// Empêche la fenêtre de dépasser de la zone utilisable de l'écran.
///
/// Sans cela, une fenêtre mémorisée sur un grand écran s'ouvre sur un
/// plus petit et passe devant la barre des tâches.
macro_rules! constrain_to_work_area {
    ($window:expr) => {{
        let window = $window;

        if !window.is_maximized().unwrap_or(false) {
            if let Some(area) = work_area() {
                if let (Ok(size), Ok(position)) =
                    (window.outer_size(), window.outer_position())
                {
                    let width = size.width.min(area.width).max(MIN_WIDTH);
                    let height = size.height.min(area.height).max(MIN_HEIGHT);

                    let x = position
                        .x
                        .clamp(area.x, area.x + area.width.saturating_sub(width) as i32);
                    let y = position
                        .y
                        .clamp(area.y, area.y + area.height.saturating_sub(height) as i32);

                    if width != size.width || height != size.height {
                        let _ = window.set_size(tauri::PhysicalSize::new(width, height));
                    }

                    if x != position.x || y != position.y {
                        let _ = window.set_position(tauri::PhysicalPosition::new(x, y));
                    }
                }
            }
        }
    }};
}

/// Ramène la fenêtre au premier plan.
///
/// Windows peut démarrer une application derrière la fenêtre active : on
/// la passe brièvement « toujours au premier plan » pour qu'elle passe
/// devant, puis on rend la main.
fn bring_to_front(window: &tauri::WebviewWindow) {
    let _ = window.unminimize();
    let _ = window.show();
    let _ = window.set_always_on_top(true);
    let _ = window.set_focus();
    let _ = window.set_always_on_top(false);
}

/// Le flou du fond de la fenêtre, comme celui de la barre des tâches.
#[cfg(target_os = "windows")]
mod backdrop {
    /// `WCA_ACCENT_POLICY` : l'attribut qui décrit le fond de la fenêtre.
    const WCA_ACCENT_POLICY: i32 = 19;

    /// Le fond est laissé tel quel.
    const ACCENT_ENABLE_DISABLE: u32 = 0;
    /// Le fond est flouté (acrylique de Windows 11).
    const ACCENT_ENABLE_ACRYLIC_BLURBEHIND: u32 = 4;

    #[repr(C)]
    struct AccentPolicy {
        accent_state: u32,
        accent_flags: u32,
        gradient_color: u32,
        animation_id: u32,
    }

    extern "system" {
        /// Fonction de Windows (non documentée, mais stable depuis Vista).
        fn SetWindowCompositionAttribute(
            hwnd: *mut std::ffi::c_void,
            attribute: i32,
            data: *mut std::ffi::c_void
        ) -> i32;
    }

    /// Applique (ou retire) le flou du fond.
    pub fn apply(hwnd: *mut std::ffi::c_void, enabled: bool) {
        let mut policy = AccentPolicy {
            accent_state: if enabled {
                ACCENT_ENABLE_ACRYLIC_BLURBEHIND
            } else {
                ACCENT_ENABLE_DISABLE
            },
            accent_flags: 0,
            gradient_color: 0,
            animation_id: 0,
        };

        // SAFETY : le pointeur transmis est celui de `policy`, qui vit
        // pendant tout l'appel.
        unsafe {
            SetWindowCompositionAttribute(
                hwnd,
                WCA_ACCENT_POLICY,
                &mut policy as *mut AccentPolicy as *mut std::ffi::c_void,
            );
        }
    }
}

/// Rend le fond de la fenêtre transparent et flouté (comme sous Windows).
///
/// L'option n'existe que dans l'application de bureau, sous Windows : la
/// transparence elle-même vient de la feuille de style, le flou de Windows.
#[tauri::command]
fn set_window_transparency(window: tauri::WebviewWindow, enabled: bool) {
    #[cfg(target_os = "windows")]
    {
        if let Ok(handle) = window.hwnd() {
            backdrop::apply(handle.0, enabled);
        }
    }

    #[cfg(not(target_os = "windows"))]
    {
        let _ = (window, enabled);
    }
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
                bring_to_front(&window);
            }
        }));
    }

    builder
        // La commande native qui rend le fond de la fenêtre flouté.
        .invoke_handler(tauri::generate_handler![set_window_transparency])
        // Mémorise la taille et la position de la fenêtre entre deux
        // ouvertures (et le plein écran).
        //
        // La visibilité n'est pas mémorisée : la croix ferme la fenêtre sans
        // quitter l'application (elle reste dans la zone de notification),
        // et l'application doit malgré tout s'ouvrir à la prochaine
        // ouverture.
        .plugin(
            tauri_plugin_window_state::Builder::default()
                .with_state_flags(
                    tauri_plugin_window_state::StateFlags::SIZE
                        | tauri_plugin_window_state::StateFlags::POSITION
                        | tauri_plugin_window_state::StateFlags::MAXIMIZED
                        | tauri_plugin_window_state::StateFlags::FULLSCREEN,
                )
                .build(),
        )
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
                ensure_sane_size!(&window);
                constrain_to_work_area!(&window);
                // L'application doit s'ouvrir devant les autres fenêtres.
                bring_to_front(&window);
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
                            bring_to_front(&window);
                        }
                    }
                    "update" => {
                        // L'interface s'occupe de la vérification et de
                        // l'installation ; on se contente de la réveiller.
                        if let Some(window) = app.get_webview_window("main") {
                            bring_to_front(&window);
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
                            bring_to_front(&window);
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
                ensure_sane_size!(window);
                constrain_to_work_area!(window);
            }

            // La fenêtre ne doit jamais passer devant la barre des tâches.
            if let WindowEvent::Moved(_) = event {
                constrain_to_work_area!(window);
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
