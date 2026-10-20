param(
  [ValidateSet("click", "move", "scroll", "key", "text")]
  [string]$Action = "click",
  [int]$X = 0,
  [int]$Y = 0,
  [int]$Amount = 0,
  [string]$Key = "",
  [string]$Value = "",
  [string]$ProcessName = "inspiration-desktop"
)

Add-Type @"
using System;
using System.Runtime.InteropServices;
public class Inp {
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT r);
  [DllImport("user32.dll")] public static extern bool SetCursorPos(int x, int y);
  [DllImport("user32.dll")] public static extern void mouse_event(uint flags, uint dx, uint dy, int data, UIntPtr extra);
  [DllImport("user32.dll")] public static extern void keybd_event(byte key, byte scan, uint flags, UIntPtr extra);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
  [DllImport("user32.dll")] public static extern bool SetWindowPos(IntPtr hWnd, IntPtr after, int x, int y, int cx, int cy, uint flags);
  [StructLayout(LayoutKind.Sequential)] public struct RECT { public int Left, Top, Right, Bottom; }
}
"@

$process = Get-Process -Name $ProcessName -ErrorAction SilentlyContinue |
  Where-Object { $_.MainWindowHandle -ne 0 } | Select-Object -First 1

if (-not $process) { Write-Error "Aucune fenetre pour $ProcessName"; exit 1 }

$handle = $process.MainWindowHandle
[void][Inp]::ShowWindow($handle, 9)   # restaurer si masquée
[void][Inp]::SetWindowPos($handle, [IntPtr](-1), 0, 0, 0, 0, 0x0043)
[void][Inp]::SetForegroundWindow($handle)
Start-Sleep -Milliseconds 500

$rect = New-Object Inp+RECT
[void][Inp]::GetWindowRect($handle, [ref]$rect)

switch ($Action) {
  "click" {
    [void][Inp]::SetCursorPos($X, $Y)
    Start-Sleep -Milliseconds 150
    [Inp]::mouse_event(0x0002, 0, 0, 0, [UIntPtr]::Zero)   # clic gauche
    Start-Sleep -Milliseconds 60
    [Inp]::mouse_event(0x0004, 0, 0, 0, [UIntPtr]::Zero)   # relâchement
  }
  "move" {
    [void][Inp]::SetCursorPos($X, $Y)
  }
  "scroll" {
    [void][Inp]::SetCursorPos($X, $Y)
    Start-Sleep -Milliseconds 100
    $direction = if ($Amount -lt 0) { 0x0800 } else { 0x0008 }  # haut / bas
    $delta = if ($Amount -lt 0) { [Math]::Abs($Amount) * 120 } else { -$Amount * 120 }
    [Inp]::mouse_event($direction, 0, 0, $delta, [UIntPtr]::Zero)
  }
  "key" {
    $codes = @{
      "enter" = 13; "escape" = 27; "tab" = 9; "down" = 40; "up" = 38;
      "left" = 37; "right" = 39; "backspace" = 8; "delete" = 46
    }
    $code = $codes[$Key.ToLower()]
    if (-not $code) { Write-Error "Touche inconnue : $Key"; exit 1 }
    [Inp]::keybd_event([byte]$code, 0, 0, [UIntPtr]::Zero)
    Start-Sleep -Milliseconds 40
    [Inp]::keybd_event([byte]$code, 0, 2, [UIntPtr]::Zero)
  }
  "text" {
    foreach ($char in $Value.ToCharArray()) {
      $code = [System.Windows.Forms.SendKeys]::SendWait("")  # placeholder
      break
    }
  }
}

Write-Output ("$Action -> fenetre en " + $rect.Left + "," + $rect.Top + " (" + ($rect.Right - $rect.Left) + "x" + ($rect.Bottom - $rect.Top) + "), clic en " + $X + "," + $Y)
