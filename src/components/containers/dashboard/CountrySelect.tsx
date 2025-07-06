import { useId, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { readCountries, getCountry } from "@/utils/helpers.util";
import type { ICountry } from "@/utils/interfaces.util";
import { getUserLocation } from "@/lib/useLocation";
import { Search } from "lucide-react";

export default function CountrySelect() {
  const id = useId();
  const allCountries: ICountry[] = readCountries();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = allCountries.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const detect = async () => {
      const response = await getUserLocation();
      const code = response?.data?.country_code;
      if (code) {
        const found = getCountry(code.toUpperCase());
        if (found) setSelectedCountry(found.code2);
      }
      setIsReady(true);
    };
    detect();
  }, []);

  if (!isReady) return null;

  return (
    <div className="space-y-2 max-w-full">
      <Label htmlFor={id}>Residence</Label>

      <Select value={selectedCountry} onValueChange={setSelectedCountry}>
        <SelectTrigger
          id={id}
          className="h-auto ps-2 text-left [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0 cursor-pointer w-full"
        >
          <SelectValue />
        </SelectTrigger>

        <SelectContent className="max-h-[320px] overflow-y-auto bg-popover w-full">
          
          <div className="sticky top-0 z-10 bg-popoverborder-b">
            <div className="relative bg-popover">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Search country"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 bg-popover text-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          {/* Scrollable country list */}
          <div className="">
            {filtered.map((country) => (
              <SelectItem key={country.code2} value={country.code2}>
                <span className="flex items-center gap-2">
                  <img
                    src={country.flag}
                    alt={country.name}
                    width={24}
                    height={24}
                    className="rounded-full object-cover"
                  />
                  <span className="block font-medium">{country.name}</span>
                </span>
              </SelectItem>
            ))}
          </div>
        </SelectContent>

        {/* <SelectContent className="max-h-[320px] overflow-y-auto px-0  bg-popover ">
          <div className="sticky top-0 z-10 bg-popover border-b">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Search country"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-8 pl-8 text-sm bg-muted border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          {filtered.map((country) => (
            <SelectItem key={country.code2} value={country.code2}>
              <span className="flex items-center gap-2">
                <img
                  src={country.flag}
                  alt={country.name}
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                />
                <span className="block font-medium">{country.name}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent> */}
      </Select>
    </div>
  );
}
