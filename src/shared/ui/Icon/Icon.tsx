import { memo, SVGProps } from "react"
import { iconsObject } from "../../assets"

const SvgIcons = { ...iconsObject }

export type ReactIconTypes = keyof typeof SvgIcons

interface IconProps extends SVGProps<SVGSVGElement> {
  name: ReactIconTypes
  className?: string
}

export const Icon = memo((props: IconProps) => {
  const { className, name, ...otherProps } = props

  const Svg = SvgIcons[name]

  return <Svg className={className} {...otherProps} />
})
