import { useEffect, useRef } from "react";

export const useOutsideClick = (fn, listenCapturing = true) => {
  const ref = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        fn();
      }
    };
    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [fn, listenCapturing]);

  return { ref };
};
