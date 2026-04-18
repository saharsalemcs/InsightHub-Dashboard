import styles from "./IconButton.module.css";

function IconButton({ children, title, onClick, danger }) {
  return (
    <button
      className={`${styles.iconBtn} ${danger ? styles.iconBtnDanger : ""}`}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
}

export default IconButton;
