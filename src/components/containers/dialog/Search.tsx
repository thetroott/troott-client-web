import * as React from "react";
import { useId } from "react";
import { SidebarInput } from "@/components/ui/sidebar";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import {
  ArrowUpRightIcon,
  CircleFadingPlusIcon,
  FileInputIcon,
  FolderPlusIcon,
  Search,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  const id = useId();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <form {...props}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <div className="relative">
            <SidebarInput id={id} className="ps-9 pe-9" aria-label="Search" onClick={() => setOpen(true)}/>
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/60 peer-disabled:opacity-50">
              <Search size={20} aria-hidden="true" />
            </div>
            <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2 text-muted-foreground">
              <kbd className="inline-flex size-5 max-h-full items-center justify-center rounded bg-input px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                ⌘K
              </kbd>
            </div>
          </div>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Quick start">
                <CommandItem>
                  <FolderPlusIcon
                    size={16}
                    className="opacity-60"
                    aria-hidden="true"
                  />
                  <span>New folder</span>
                  <CommandShortcut className="justify-center">
                    ⌘N
                  </CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <FileInputIcon
                    size={16}
                    className="opacity-60"
                    aria-hidden="true"
                  />
                  <span>Import document</span>
                  <CommandShortcut className="justify-center">
                    ⌘I
                  </CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CircleFadingPlusIcon
                    size={16}
                    className="opacity-60"
                    aria-hidden="true"
                  />
                  <span>Add block</span>
                  <CommandShortcut className="justify-center">
                    ⌘B
                  </CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Navigation">
                <CommandItem>
                  <ArrowUpRightIcon
                    size={16}
                    className="opacity-60"
                    aria-hidden="true"
                  />
                  <span>Go to dashboard</span>
                </CommandItem>
                <CommandItem>
                  <ArrowUpRightIcon
                    size={16}
                    className="opacity-60"
                    aria-hidden="true"
                  />
                  <span>Go to apps</span>
                </CommandItem>
                <CommandItem>
                  <ArrowUpRightIcon
                    size={16}
                    className="opacity-60"
                    aria-hidden="true"
                  />
                  <span>Go to connections</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
