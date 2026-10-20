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
  [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
  [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint processId);
  [DllImport("user32.dll")] public static extern bool AttachThreadInput(uint from, uint to, bool attach);
  [DllImport("user32.dll")] public static extern bool PrintWindow(IntPtr hWnd, IntPtr hdc, uint flags);
  [DllImport("user32.dll")] public static extern bool EnumWindows(EnumWindowsProc proc, IntPtr param);
  [DllImport("user32.dll")] public static extern int GetWindowText(IntPtr hWnd, System.Text.StringBuilder text, int max);
  public delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr param);
  [StructLayout(LayoutKind.Sequential)] public struct RECT { public int Left, Top, Right, Bottom; }

  /* Ramene la fenetre au premier plan : Windows refuse parfois de changer
     de fenetre active tant que l'autre programme n'a pas rendu la main. */
  public static void BringToFront(IntPtr hWnd) {
    uint pid;
    uint target = GetWindowThreadProcessId(hWnd, out pid);
    uint current = GetWindowThreadProcessId(GetForegroundWindow(), out pid);
    AttachThreadInput(target, current, true);
    ShowWindow(hWnd, 9);
    SetForegroundWindow(hWnd);
    AttachThreadInput(target, current, false);
    SetWindowPos(hWnd, new IntPtr(-1), 0, 0, 0, 0, 0x0043);
  }

  /* Retrouve la fenetre reelle de l'application : la plus grande (le
     plugin et le WebView creent aussi de petites fenetres auxiliaires). */
  public static IntPtr FindWindowByTitle(uint processId, string title) {
    IntPtr found = IntPtr.Zero;
    int best = 0;
    EnumWindows((h, l) => {
      uint pid;
      GetWindowThreadProcessId(h, out pid);
      if (pid != processId) return true;
      var sb = new System.Text.StringBuilder(256);
      GetWindowText(h, sb, 256);
      string name = sb.ToString();
      RECT r;
      GetWindowRect(h, out r);
      int area = (r.Right - r.Left) * (r.Bottom - r.Top);
      bool named = title.Length == 0 ? name.Length > 0 : name == title;
      if (named && area > best) { best = area; found = h; }
      return true;
    }, IntPtr.Zero);
    return found;
  }
}
"@

$process = Get-Process -Name $ProcessName -ErrorAction SilentlyContinue |
  Where-Object { $_.MainWindowHandle -ne 0 } | Select-Object -First 1

if (-not $process) { Write-Error "Aucune fenetre trouvee pour $ProcessName"; exit 1 }

# L'application possede aussi une petite fenetre auxiliaire (14 x 14) : on
# cible la fenetre reelle, celle qui porte le titre.
$handle = [Win]::FindWindowByTitle($process.Id, $WindowTitle)
if ($handle -eq [IntPtr]::Zero) { $handle = $process.MainWindowHandle }

# Passe au-dessus des autres fenêtres.
[Win]::BringToFront($handle)
Start-Sleep -Milliseconds 900

$rect = New-Object Win+RECT
[void][Win]::GetWindowRect($handle, [ref]$rect)

$width = $rect.Right - $rect.Left
$height = $rect.Bottom - $rect.Top

$bitmap = New-Object System.Drawing.Bitmap $width, $height
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)

# La fenetre est capturee telle qu'elle est (sans passer devant les autres
# fenetres) : la capture ne depend donc plus de ce qui est a l'ecran.
$hdc = $graphics.GetHdc()
[void][Win]::PrintWindow($handle, $hdc, 2)
$graphics.ReleaseHdc($hdc)

$bitmap.Save($Output, [System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose()
$bitmap.Dispose()

Write-Output "Capture : $Output ($width x $height)"
