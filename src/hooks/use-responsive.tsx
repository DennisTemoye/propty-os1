
import * as React from "react"
import { useBreakpoints } from "./use-breakpoints"

export function useResponsive() {
  const { width, height, breakpoint, isMobile, isTablet, isDesktop } = useBreakpoints();
  
  const [screenData, setScreenData] = React.useState({
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop: breakpoint === '2xl',
    isSmallScreen: isMobile,
    isTouchDevice: false
  });

  React.useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    setScreenData({
      width,
      height,
      isMobile,
      isTablet,
      isDesktop,
      isLargeDesktop: breakpoint === '2xl',
      isSmallScreen: isMobile,
      isTouchDevice
    });
  }, [width, height, breakpoint, isMobile, isTablet, isDesktop]);

  return screenData;
}
