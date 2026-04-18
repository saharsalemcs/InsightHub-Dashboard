import styles from "./LeftNav.module.css";

import { Globe, Bell, Shield, Palette } from "lucide-react";

const TABS = [
  { key: "general", label: "General", icon: <Globe /> },
  { key: "notifications", label: "Notifications", icon: <Bell /> },
  { key: "security", label: "Security", icon: <Shield /> },
  { key: "appearance", label: "Appearance", icon: <Palette /> },
];

function LeftNav({ active, setActive }) {
  return (
    <aside className={styles.nav}>
      <div className={styles.navLabel}>PREFERENCES</div>
      {TABS.map((tab) => (
        <button
          key={tab.key}
          className={`${styles.navItem} ${active === tab.key ? styles.navActive : ""}`}
          onClick={() => setActive(tab.key)}
        >
          <span className={styles.navIcon}>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </aside>
  );
}

export default LeftNav;
