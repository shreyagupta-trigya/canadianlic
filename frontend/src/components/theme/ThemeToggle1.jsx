// src/components/ThemeToggle.jsx
import { useTheme } from "@/context/ThemeProvider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const handleToggle = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="dark-mode-toggle"> Mode</Label>
      <Switch
        id="dark-mode-toggle"
        checked={isDark}
        onCheckedChange={handleToggle}
      />
    </div>
  );
}
