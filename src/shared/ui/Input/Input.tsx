import { forwardRef, InputHTMLAttributes, memo } from "react"

type HTMLInputProps = InputHTMLAttributes<HTMLInputElement>

interface InputProps extends HTMLInputProps {}

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { ...otherProps } = props

    return <input ref={ref} {...otherProps} />
  }),
)
