import { cn } from "../../utils/cn";

export default function Button({
  children,
  variant = "default",
  size = "md",
  className = "",
  icon: Icon,
  disabled,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50";

  const variants = {
    default: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    primary: "bg-purple-600 text-white hover:bg-purple-700 shadow",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    tag: "border rounded bg-white shadow-sm text-sm font-mono hover:bg-gray-100",
    ghost: "text-gray-600 hover:bg-gray-100",
    toggle: "px-4 py-2 rounded bg-gray-100 text-gray-600",
  };

  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}
