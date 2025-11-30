import { ButtonHTMLAttributes, memo } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

export const Button = memo<ButtonProps>((props) => {
  const { children, ...otherProps } = props

  return <button {...otherProps}>{children}</button>
})
