import { Clipboard, Folder, History, type LucideIcon, Settings, Star } from "lucide-react";

export type NavItem = {
  icon: LucideIcon;
  label: string;
  path: string;
};

export type NavGroup = {
  group: string;
  items: NavItem[];
};

export type ActiveNavInfo = {
  category: string;
  page: string;
  item: NavItem | null;
};

export const navigationConfig: NavGroup[] = [
  {
    group: "Main",
    items: [
      { icon: Clipboard, label: "Recents", path: "/" },
      { icon: Star, label: "Favorites", path: "/favorites" },
      { icon: History, label: "History", path: "/history" },
      { icon: Folder, label: "Collections", path: "/collections" },
    ],
  },
  {
    group: "System",
    items: [{ icon: Settings, label: "Settings", path: "/settings" }],
  },
];

export const isRouteActive = (pathname: string, path: string): boolean => {
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
};

export function getActiveNavInfo(pathname: string): ActiveNavInfo {
  for (const group of navigationConfig) {
    const activeItem = group.items.find((item) => {
      return isRouteActive(pathname, item.path);
    });

    if (activeItem) {
      return {
        category: group.group,
        page: activeItem.label,
        item: activeItem,
      };
    }
  }

  const defaultGroup = navigationConfig[0];
  const defaultItem = defaultGroup.items[0];

  return {
    category: defaultGroup.group,
    page: defaultItem.label,
    item: defaultItem,
  };
}
