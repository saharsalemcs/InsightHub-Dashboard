import { useTheme } from "../../context/ThemeContext";
import styles from "./SectionsStyle.module.css";
import SettingToggleRow from "./SettingToggleRow";

function AppearanceSection() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Appearance</h2>
        <p className={styles.sectionDesc}>
          Customize the look and feel of your dashboard
        </p>
      </div>

      <div className={styles.toggleList}>
        <SettingToggleRow
          label="Dark Mode"
          desc="Use dark theme across the dashboard"
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
      </div>
    </div>
  );
}

export default AppearanceSection;
