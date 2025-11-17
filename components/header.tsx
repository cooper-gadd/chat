import { Thread } from "@/db/schema";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { ThreadHistory } from "@/actions/get-thread-history";

export function Header({
  thread,
  threadHistory,
}: {
  thread: Thread;
  threadHistory: ThreadHistory[] | undefined;
}) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <HistoryBreadcrumbs threadHistory={threadHistory} />
            <BreadcrumbItem>
              <BreadcrumbPage>{thread.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}

function HistoryBreadcrumbs({
  threadHistory,
}: {
  threadHistory: ThreadHistory[] | undefined;
}) {
  if (!threadHistory) return null;

  return (
    <>
      {threadHistory.map((thread) => {
        const { id, title } = thread;

        return (
          <>
            <BreadcrumbItem key={id} className="hidden md:block">
              <BreadcrumbLink href={`/${id}`}>{title}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
          </>
        );
      })}
    </>
  );
}
