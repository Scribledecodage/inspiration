param(
  [string]$ProcessName = "inspiration-desktop",
  [string]$Output = "$env:TEMP\inspiration-shot.png",
  [string]$WindowTitle = ""
)

Add-Type -AssemblyName System.Drawing
Add-Type @"
using System;
using System.Runtime.InteropServices;
public class Win {
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT r);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
  [DllImport("user32.dll")] public static extern bool MoveWindow(IntPtr hWnd, int x, int y, int w, int h, bool repaint);
  [DllImport("user32.dll")] public static extern bool SetWindowPos(IntPtr hWnd, IntPtr after, int x, int y, int cx, int cy, uint flags);
  [StructLayout(LayoutKind.Sequential)] public struct RECT { public int Left, Top, Right, Bottom; }
}
"@

$process = Get-Process -Name $ProcessName -ErrorAction SilentlyContinue |
  Where-Object { $_.MainWindowHandle -ne 0 } | Select-Object -First 1

if (-not $process) { Write-Error "Aucune fenetre trouvee pour $ProcessName"; exit 1 }

$handle = $process.MainWindowHandle
[void][Win]::ShowWindow($handle, 9)   # restaurer

# Passe au-dessus des autres fenêtres (SWP_NOMOVE|SWP_NOSIZE|SWP_SHOWWINDOW).
[void][Win]::SetWindowPos($handle, [IntPtr](-1), 0, 0, 0, 0, 0x0043)
Start-Sleep -Milliseconds 400
[void][Win]::SetForegroundWindow($handle)
Start-Sleep -Milliseconds 900

$rect = New-Object Win+RECT
[void][Win]::GetWindowRect($handle, [ref]$rect)

$width = $rect.Right - $rect.Left
$height = $rect.Bottom - $rect.Top

$bitmap = New-Object System.Drawing.Bitmap $width, $height
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.CopyFromScreen($rect.Left, $rect.Top, 0, 0, $bitmap.Size)
$bitmap.Save($Output, [System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose()
$bitmap.Dispose()

Write-Output "Capture : $Output ($width x $height)"
