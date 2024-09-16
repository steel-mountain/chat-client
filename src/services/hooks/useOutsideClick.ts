import { useEffect } from "react";

interface IUseClickOutside {
  ref: React.RefObject<HTMLDivElement | HTMLSpanElement>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useClickOutside = ({ ref, setOpen }: IUseClickOutside) => {
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
