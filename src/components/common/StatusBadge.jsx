import styles from "./StatusBadge.module.css";

function StatusBadge({ status }) {
  const map = {
    active: "active",
    pending: "pending",
    inactive: "inactive",
    completed: "active",
    cancelled: "inactive",
  };

  const cls = map[status] || "pending";

  return (
    <span className={`${styles.statusBadge} ${styles[cls]}`}>
      <span className={styles.statusDot}></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default StatusBadge;
