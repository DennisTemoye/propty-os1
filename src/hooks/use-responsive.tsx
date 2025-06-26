
import * as React from "react"
import { useBreakpoints } from "./use-breakpoints"

const BREAKPOINTS = {
  mobile: 767,
  tablet: 1023,
  desktop: 1439,
  largeDesktop: 1440
}

export function useResponsive() {
  const { width, height, breakpoint, isMobile, isTablet, isDesktop } = useBreakpoints();
  
  const [screenData, setScreenData] = React.useState({
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop: breakpoint === '2xl',
    isSmallScreen: isMobile || isTablet,
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
      isSmallScreen: isMobile || isTablet,
      isTouchDevice
    });
  }, [width, height, breakpoint, isMobile, isTablet, isDesktop]);

  return screenData;
}
