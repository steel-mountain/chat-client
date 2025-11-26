import { Dispatch, RefObject, SetStateAction, useEffect } from "react"

interface UseClickOutsideType {
  ref: RefObject<HTMLDivElement | HTMLSpanElement>
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const useClickOutside = ({ ref, setOpen }: UseClickOutsideType) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, setOpen])
}
