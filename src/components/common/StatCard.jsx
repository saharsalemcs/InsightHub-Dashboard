import styles from "./statCard.module.css";

function StatCard({
  label,
  icon,
  value,
  badge,
  badgeType = "up",
  color = "purple",
  sub,
  delay = 0,
  variant = "vertical",
}) {
  if (variant === "horizontal") {
    return (
      <div
        className={`${styles.statCardH} animate-fadeInUp`}
        style={{ animationDelay: `${delay}s` }}
      >
        <div className={`${styles.statIconH} ${styles[`icon_${color}`]}`}>
          {icon}
        </div>
        <div className={styles.statBodyH}>
          <div className={styles.statLabelH}>{label}</div>
          <div className={styles.statValueH}>
            {Number(value).toLocaleString()}
          </div>
          {badge && (
            <div className={`${styles.statBadgeH} ${styles[badgeType]}`}>
              {badgeType === "up" ? "+" : "-"}
              {badge} vs last month
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ── default: vertical ── */
  return (
    <div
      className={`${styles.statCard} ${styles[`color_${color}`]} animate-fadeInUp`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={styles.statHeader}>
        <div className={`${styles.statIcon}  ${styles[`icon_${color}`]}`}>
          {icon}
        </div>
        {badge && (
          <span className={`${styles.badge} ${styles[badgeType]}`}>
            {badgeType === "up" ? "▲" : "▼"}
            {badge}
          </span>
        )}
      </div>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>{value}</div>
      {sub && <div className={styles.statSub}>{sub}</div>}
    </div>
  );
}

export default StatCard;
