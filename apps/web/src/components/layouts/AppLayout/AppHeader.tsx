import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSearch } from "./AppSearch";

interface AppHeaderProps {
  category: string;
  page: string;
  onSearch?: (value: string) => void;
}

export const AppHeader = ({ category, page, onSearch }: AppHeaderProps) => {
  return (
    <header className="flex h-16 items-center gap-3 px-4 transition-[width,height] ease-linear">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 mt-0.5 h-6" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink className="text-muted-foreground/60">{category}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-purple-700/80">{page}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="ml-auto w-2/3 md:w-2/4 lg:w-1/3">
        <AppSearch pageName={page} onSearch={onSearch} />
      </div>
    </header>
  );
};
