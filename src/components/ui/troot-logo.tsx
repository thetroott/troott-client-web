import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/app/app.context";

type TroottLogoProps = React.ImgHTMLAttributes<HTMLImageElement>;

export const TroottLogo: React.FC<Omit<TroottLogoProps, "src" | "alt">> = (props) => {
    

    const { state } = useAppContext()

    const [,setResolvedTheme ] = useState<"light" | "dark">("light");

    useEffect(() => {
      const getSystemTheme = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  
      if (state.theme.mode === "system") {
        setResolvedTheme(getSystemTheme());
  
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const listener = (e: MediaQueryListEvent) =>
          setResolvedTheme(e.matches ? "dark" : "light");
  
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
      } else {
        setResolvedTheme(state.theme.mode);
      }
    }, [state.theme.mode]);

    const logoSrc =
    state.theme.mode === "dark"
      ? "/images/assets/troott-icon.svg"
      : "/images/assets/troott-icon-dark.svg"
  
    return (
    <img
      src={logoSrc}
      alt="Troott Logo"
      width={100}
      height={100}
      {...props}
    />
  );
};
