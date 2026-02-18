type Props = {
children?: React.ReactNode;
onClick?: () => void;
className?: string;
disabled?: boolean;
}

export const Button = ({children, onClick, className, disabled}: Props) => {
    return (
        <button onClick={onClick} className={className} disabled={disabled}>{children}</button>
    )
}
