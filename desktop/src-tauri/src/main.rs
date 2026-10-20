// Empêche une fenêtre console de s'ouvrir à côté de l'application en mode
// « debug » sur Windows.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    inspiration_desktop_lib::run()
}
