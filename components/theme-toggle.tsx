"use client";

import { type ComponentType, useEffect, useState } from "react";
import { Check, LaptopMinimal, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { landingCopy } from "@/content/copy";

type ThemeToggleProps = {
  menuLabel: string;
  optionLight: string;
  optionDark: string;
  optionSystem: string;
};

type ThemeName = "light" | "dark" | "system";

const themeIcons: Record<ThemeName, ComponentType<{ className?: string }>> = {
  light: Sun,
  dark: Moon,
  system: LaptopMinimal
};

export function ThemeToggle({ menuLabel, optionLight, optionDark, optionSystem }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const rawTheme = mounted ? theme : "dark";
  const activeTheme: ThemeName =
    rawTheme === "light" || rawTheme === "dark" || rawTheme === "system" ? rawTheme : "dark";
  const ActiveIcon = themeIcons[activeTheme] ?? Moon;
  const safeMenuLabel = menuLabel.trim() || landingCopy.nav.themeMenuLabel.trim();
  const safeOptionLight = optionLight.trim() || landingCopy.nav.themeOptionLight.trim();
  const safeOptionDark = optionDark.trim() || landingCopy.nav.themeOptionDark.trim();
  const safeOptionSystem = optionSystem.trim() || landingCopy.nav.themeOptionSystem.trim();

  useEffect(() => {
    setMounted(true);
  }, []);

  function renderThemeItem(themeName: ThemeName, label: string) {
    return (
      <DropdownMenuItem onSelect={() => setTheme(themeName)} className="flex items-center justify-between gap-3">
        <span>{label}</span>
        {activeTheme === themeName ? <Check className="h-4 w-4 text-primary" aria-hidden /> : null}
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="ghost" size="icon" aria-label={safeMenuLabel} className="h-9 w-9 shrink-0">
          <ActiveIcon className="h-4 w-4" aria-hidden />
          <span className="sr-only">{safeMenuLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{safeMenuLabel}</DropdownMenuLabel>
        {renderThemeItem("light", safeOptionLight)}
        {renderThemeItem("dark", safeOptionDark)}
        {renderThemeItem("system", safeOptionSystem)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
