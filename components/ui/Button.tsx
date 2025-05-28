
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  asLink?: boolean; // If true, renders as an anchor styled as a button
  href?: string; // Required if asLink is true
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  asLink = false,
  href,
  ...props
}) => {
  const baseStyles = "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-colors duration-200 ease-in-out inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500 dark:bg-sky-500 dark:hover:bg-sky-600 dark:focus:ring-sky-400",
    secondary: "bg-slate-700 text-white hover:bg-slate-800 focus:ring-slate-600 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-500",
    outline: "border border-sky-600 text-sky-600 hover:bg-sky-50 focus:ring-sky-500 dark:border-sky-500 dark:text-sky-400 dark:hover:bg-sky-900 dark:hover:text-sky-300 dark:focus:ring-sky-400",
    ghost: "text-sky-600 hover:bg-sky-100 focus:ring-sky-500 dark:text-sky-400 dark:hover:bg-sky-800 dark:focus:ring-sky-400",
    link: "text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 underline focus:ring-sky-500"
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (asLink) {
    // Use 'as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>' for better type safety
    // when props intended for a button are spread onto an anchor.
    return (
      <a href={href} className={combinedClassName} {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={combinedClassName}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
