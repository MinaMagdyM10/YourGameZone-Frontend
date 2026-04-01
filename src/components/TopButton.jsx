import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

function TopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <button className="top-btn" onClick={scrollToTop} title="Back to top">
          <FaArrowUp />
        </button>
      )}
    </>
  );
}

export default TopButton;