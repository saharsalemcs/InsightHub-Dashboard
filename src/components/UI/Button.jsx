import styles from "./Button.module.css";

function Button({
  children,
  onClick,
  disabled,
  size = "md",
  variant = "primary",
  ...props
}) {
  return (
    <button
      className={`${styles.btn} ${styles[`btn_${size}`]} ${styles[`btn_${variant}`]}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
