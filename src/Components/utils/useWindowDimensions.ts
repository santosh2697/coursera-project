const useWindowDimensions = () => {
  return {
    isMobile: window?.innerWidth <= 1199,
    isDesktop: window?.innerWidth > 1200,
  };
};

export default useWindowDimensions;
