import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  to?: string
  children: ReactNode
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-clay disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-ink text-paper hover:bg-clay hover:shadow-soft active:scale-[0.98]',
  secondary: 'bg-clay text-paper hover:bg-clay-dark hover:shadow-soft active:scale-[0.98]',
  ghost: 'bg-transparent text-ink hover:bg-paper-deep',
  outline: 'border border-ink/25 text-ink hover:border-clay hover:text-clay active:scale-[0.98]',
}

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'text-xs px-4 py-2',
  md: 'text-sm px-6 py-3',
  lg: 'text-base px-8 py-4',
}

export function Button({ variant = 'primary', size = 'md', to, className = '', children, ...rest }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}