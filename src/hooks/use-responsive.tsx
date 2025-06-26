
import * as React from "react"

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
  largeDesktop: 1920
}

export function useResponsive() {
  const [screenSize, setScreenSize] = React.useState<{
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isLargeDesktop: boolean;
    isSmallScreen: boolean;
    isTouchDevice: boolean;
  }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
    isSmallScreen: false,
    isTouchDevice: false
  })

  React.useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      
      setScreenSize({
        width,
        height,
        isMobile: width <= BREAKPOINTS.mobile,
        isTablet: width > BREAKPOINTS.mobile && width <= BREAKPOINTS.tablet,
        isDesktop: width > BREAKPOINTS.tablet && width <= BREAKPOINTS.desktop,
        isLargeDesktop: width > BREAKPOINTS.desktop,
        isSmallScreen: width <= BREAKPOINTS.tablet,
        isTouchDevice
      })
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    window.addEventListener('orientationchange', updateScreenSize)
    
    return () => {
      window.removeEventListener('resize', updateScreenSize)
      window.removeEventListener('orientationchange', updateScreenSize)
    }
  }, [])

  return screenSize
}
