import styles from "./CardHeader.module.css";

function CardHeader({ title, subTitle, action }) {
  return (
    <div className={styles.cardHeader}>
      <div>
        <div className={styles.cardTitle}>{title}</div>
        {subTitle && <div className={styles.cardSubtitle}>{subTitle}</div>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export default CardHeader;
