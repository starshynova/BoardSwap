import { useEffect, useState } from "react";

function useFooterVisibility() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 10
      ) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    const handleScrollWithRAF = () => {
      window.requestAnimationFrame(handleScroll);
    };

    const handleResize = () => {
      handleScroll();
    };

    window.addEventListener("scroll", handleScrollWithRAF);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScrollWithRAF);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return showFooter;
}

export default useFooterVisibility;
