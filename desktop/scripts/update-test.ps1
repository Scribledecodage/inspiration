# Lance l'application et attend la vérification de mise à jour.
#
# L'application cherche une mise à jour 15 secondes après son démarrage :
# on attend 35 secondes pour être sûr, puis on capture la fenêtre.
#
# Usage : powershell -ExecutionPolicy Bypass -File scripts/update-test.ps1

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$exe = Join-Path $PSScriptRoot '..\src-tauri\target\release\inspiration-desktop.exe'

Get-Process -Name 'inspiration-desktop' -ErrorAction SilentlyContinue |
  Stop-Process -Force -ErrorAction SilentlyContinue

Start-Sleep -Seconds 2

Write-Output '[test] Lancement...'

$process = Start-Process -FilePath $exe -PassThru

Write-Output '[test] Attente de la verification de mise a jour (35 s)...'
Start-Sleep -Seconds 35

if ($process.HasExited) {
  Write-Output "[test] L'application a quitte (code $($process.ExitCode))."
  exit 1
}

$process.Refresh()
Write-Output ("[test] En vie - memoire : " + [math]::Round($process.WorkingSet64 / 1MB) + " Mo")

$signature = @'
using System;
using System.Runtime.InteropServices;

public class Cap {
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT rect);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

  [StructLayout(LayoutKind.Sequential)]
  public struct RECT { public int Left, Top, Right, Bottom; }
}
'@

Add-Type -TypeDefinition $signature -ErrorAction SilentlyContinue

$handle = $process.MainWindowHandle

if ($handle -ne [IntPtr]::Zero) {
  [void][Cap]::ShowWindow($handle, 3)
  [void][Cap]::SetForegroundWindow($handle)
  Start-Sleep -Seconds 3

  $rect = New-Object Cap+RECT
  [void][Cap]::GetWindowRect($handle, [ref]$rect)

  $width = $rect.Right - $rect.Left
  $height = $rect.Bottom - $rect.Top

  $bitmap = New-Object System.Drawing.Bitmap $width, $height
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.CopyFromScreen($rect.Left, $rect.Top, 0, 0, $bitmap.Size)

  $output = Join-Path $env:TEMP 'inspiration-update.png'
  $bitmap.Save($output, [System.Drawing.Imaging.ImageFormat]::Png)
  $graphics.Dispose()
  $bitmap.Dispose()

  Write-Output "[test] Capture : $output"
}

Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
Write-Output '[test] Application fermee.'
