export default function Button({
    children,
    variant = "primary",
    size = "md",
    className = "",
    fullWidth = false,
    ...props
}) {
    const baseClass = "btn";
    const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-outline';
    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <button
            className={`${baseClass} ${variantClass} ${widthClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
