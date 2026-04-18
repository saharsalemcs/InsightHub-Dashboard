import { useState } from "react";
import styles from "./SectionsStyle.module.css";
import SettingToggleRow from "./SettingToggleRow";

function NotificationsSection() {
  const [notifs, setNotifs] = useState({
    email: true,
    push: true,
    weekly: false,
  });

  const set = (key, val) => setNotifs((p) => ({ ...p, [key]: val }));

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Notifications</h2>
        <p className={styles.sectionDesc}>
          Manage how and when you receive alerts
        </p>
      </div>

      <div className={styles.toggleList}>
        <SettingToggleRow
          label="Email Notifications"
          desc="Receive updates via email for important events"
          checked={notifs.email}
          onChange={(v) => set("email", v)}
        />
        <SettingToggleRow
          label="Push Notifications"
          desc="Browser push notifications for real-time alerts"
          checked={notifs.push}
          onChange={(v) => set("push", v)}
        />
        <SettingToggleRow
          label="Weekly Analytics Report"
          desc="Get a summary of your dashboard weekly"
          checked={notifs.weekly}
          onChange={(v) => set("weekly", v)}
        />
      </div>
    </div>
  );
}

export default NotificationsSection;
