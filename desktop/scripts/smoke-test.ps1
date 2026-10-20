# Lance l'application de bureau et capture sa fenetre ( meme si elle est
# derriere une autre fenetre : le rendu est fait par la fenetre elle-meme ).
#
# Usage : powershell -ExecutionPolicy Bypass -File scripts/smoke-test.ps1

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$exe = Join-Path $PSScriptRoot '..\src-tauri\target\release\inspiration-desktop.exe'

if (-not (Test-Path $exe)) {
  Write-Output "[test] Binaire introuvable : $exe"
  exit 1
}

# Une instance deja lancee est fermee : le plugin « instance unique » ferait
# sortir le nouveau processus sans rien afficher.
Get-Process -Name 'inspiration-desktop' -ErrorAction SilentlyContinue |
  Stop-Process -Force -ErrorAction SilentlyContinue

Start-Sleep -Seconds 2

Write-Output '[test] Lancement de l''application...'

$process = Start-Process -FilePath $exe -PassThru

Start-Sleep -Seconds 12

if ($process.HasExited) {
  Write-Output "[test] L'application a quitte (code $($process.ExitCode))."
  exit 1
}

$process.Refresh()

Write-Output ("[test] En vie - memoire : " + [math]::Round($process.WorkingSet64 / 1MB) + " Mo")

$signature = @'
using System;
using System.Runtime.InteropServices;

public class Capture {
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT rect);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
  [DllImport("user32.dll")] public static extern bool PrintWindow(IntPtr hwnd, IntPtr hdcBlt, uint nFlags);

  [StructLayout(LayoutKind.Sequential)]
  public struct RECT { public int Left, Top, Right, Bottom; }
}
'@

Add-Type -TypeDefinition $signature -ErrorAction SilentlyContinue

$handle = $process.MainWindowHandle

if ($handle -eq [IntPtr]::Zero) {
  Write-Output '[test] Aucune fenetre detectee.'
  Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
  exit 1
}

[void][Capture]::ShowWindow($handle, 3)
[void][Capture]::SetForegroundWindow($handle)
Start-Sleep -Seconds 4

$rect = New-Object Capture+RECT
[void][Capture]::GetWindowRect($handle, [ref]$rect)

$width = $rect.Right - $rect.Left
$height = $rect.Bottom - $rect.Top

Write-Output "[test] Fenetre : ${width}x${height}"

# Le contenu du WebView2 n'est pas rendu par PrintWindow : on capture
# l'ecran, l'application etant au premier plan et en plein ecran.
$bitmap = New-Object System.Drawing.Bitmap $width, $height
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.CopyFromScreen($rect.Left, $rect.Top, 0, 0, $bitmap.Size)

$output = Join-Path $env:TEMP 'inspiration-app.png'
$bitmap.Save($output, [System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose()
$bitmap.Dispose()

Write-Output "[test] Capture : $output"

Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
Write-Output '[test] Application fermee.'
