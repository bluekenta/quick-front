import { BREAKPOINTS } from "../../breakpoints";

// breakpoints
import { useCallback, useEffect, useState } from "react";

const navbarHeight = {
  desktop: 44,
  mobile: 48,
};

const useNavbarHeight = (): number => {
  const [sNavbarHeight, setNavbarHeight] = useState<number>(
    navbarHeight.desktop
  );

  const cbSetNavbarHeight = useCallback(() => {
    if (window.innerWidth > BREAKPOINTS.MD) {
      setNavbarHeight(navbarHeight.desktop);
    } else {
      setNavbarHeight(navbarHeight.mobile);
    }
  }, []);

  useEffect(() => {
    cbSetNavbarHeight();
    window.addEventListener("resize", () => {
      cbSetNavbarHeight();
    });
    return window.removeEventListener("resize", () => {
      cbSetNavbarHeight();
    });
  }, [cbSetNavbarHeight]);

  return sNavbarHeight;
};

export default useNavbarHeight;
