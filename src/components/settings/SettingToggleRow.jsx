import styles from "./SectionsStyle.module.css";
import Toggle from "./Toggle";

function SettingToggleRow({ label, desc, checked, onChange }) {
  return (
    <div className={styles.toggleRow}>
      <div>
        <div className={styles.toggleLabel}>{label}</div>
        <div className={styles.toggleDesc}>{desc}</div>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

export default SettingToggleRow;
