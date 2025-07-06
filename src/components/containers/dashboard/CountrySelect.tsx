import { useEffect, useState } from "react";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandGroup,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown } from "lucide-react";
import { readCountries, getCountry } from "@/utils/helpers.util";
import { getUserLocation } from "@/lib/useLocation";
import type { ICountry } from "@/utils/interfaces.util";

export default function CountryCombobox() {
  const allCountries: ICountry[] = readCountries();
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);

  useEffect(() => {
    const detect = async () => {
      const res = await getUserLocation();
      const code = res?.data?.country_code;
      if (code) {
        const found = getCountry(code.toUpperCase());
        if (found) setSelectedCountry(found);
      }
    };
    detect();
  }, []);

  return (
    <div className="space-y-2">
      <Label>Residence</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className=" w-full justify-between"
          >
            {selectedCountry ? (
              <span className="flex items-center gap-2">
                <img
                  src={selectedCountry.flag}
                  alt={selectedCountry.name}
                  className="w-5 h-5 rounded-md"
                />
                {selectedCountry.name}
              </span>
            ) : (
              "Select country"
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="min-w-1 w-full p-0">
          <Command>
            <div className="max-h-[350px] min-w-[400px] overflow-y-auto scrollbar-none">
              <div className="sticky top-0 z-10 bg-popover border-b">
                <CommandInput placeholder="Search country" className="h-9m w-full" />
              </div>

              <CommandGroup>
                {allCountries.map((country) => (
                  <CommandItem
                    key={country.code2}
                    value={country.name}
                    onSelect={() => {
                      setSelectedCountry(country);
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={country.flag}
                        alt={country.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="flex-1 truncate">{country.name}</span>
                      {selectedCountry?.code2 === country.code2 ? (
                        <Check className="ml-auto h-4 w-4 text-primary" />
                      ) : null}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
