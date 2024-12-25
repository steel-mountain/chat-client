import { useEffect } from "react";

interface UseClickOutsideType {
  ref: React.RefObject<HTMLDivElement | HTMLSpanElement>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useClickOutside = ({ ref, setOpen }: UseClickOutsideType) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setOpen]);
};
