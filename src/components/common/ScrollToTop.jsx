import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component automatically scrolls the window to the very top (0, 0)
 * whenever the user changes routes/tabs (e.g. clicking Home, Services, AI Assistant, etc.).
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
};
export default ScrollToTop;
