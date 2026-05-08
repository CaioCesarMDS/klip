import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SidebarInput } from "@/components/ui/sidebar";

interface AppSearchProps extends Omit<React.ComponentProps<"input">, "type"> {
  pageName?: string;
  onSearch?: (value: string) => void;
}

export const AppSearch = ({ pageName, onSearch, className, ...props }: AppSearchProps) => {
  const dynamicPlaceholder = pageName
    ? `Search in ${pageName.toLowerCase()}...`
    : "Search clips...";

  return (
    <form
      className={`relative flex items-center ${className || ""}`}
      onChange={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = String(formData.get("search") || "");
        onSearch?.(query);
      }}
    >
      <Label htmlFor="search" className="sr-only">
        {dynamicPlaceholder}
      </Label>
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
      <SidebarInput
        id="search"
        name="search"
        type="search"
        placeholder={dynamicPlaceholder}
        className="w-full bg-secondary/50 pl-9"
        {...props}
      />
    </form>
  );
};
