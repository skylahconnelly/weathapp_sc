import Link from "next/link";

/**
 * NewButton Component
 *
 * A reusable button that routes to the all cities weather page
 * Similar to Button component but specifically for navigating to /all-weather/allcities
 *
 * Can be used as a button or a link (if href is provided)
 */

interface NewButtonProps {
  variant?: "default" | "ghost";
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}

export function NewButton({
  variant = "default",
  href = "/all-weather/allcities",
  children,
  className = "",
  ...props
}: NewButtonProps) {
  // Base styles that apply to all buttons
  const baseStyles =
    "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors";

  // Variant-specific styles
  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    ghost:
      "text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20",
    dark: "bg-zinc-900 text-white hover:bg-zinc-800",
  };

  // Combine all styles
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  // If href is provided, render as a Link
  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  // Otherwise, render as a button
  return (
    <button className={combinedStyles} {...props}>
      {children}
    </button>
  );
}
