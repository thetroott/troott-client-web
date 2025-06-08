import type { ICopyright } from "@/utils/interface.util";


export function Copyright(data: ICopyright) {
  
  const {
    year = new Date().getFullYear(),
    company = "Company",
    className = "",
  } = data;

  return (
    <p className={`text-xs text-muted-foreground ${className}`}>
      © {year} {company}.
    </p>
  );
}
