import styles from "./MiniStat.module.css";

function MiniStat({ label, val, color }) {
  return (
    <div className={`${styles.miniStat} ${styles[`mini_${color}`]}`}>
      <div className={styles.miniVal}>{val}</div>
      <div className={styles.miniLabel}>{label}</div>
    </div>
  );
}

export default MiniStat;
