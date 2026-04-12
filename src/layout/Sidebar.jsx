import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const NAV = [
  {
    label: "Main",
    items: [
      { to: "/", icon: <DashIcon />, label: "Dashboard" },
      { to: "/users", icon: <UsersIcon />, label: "Users", badge: null },
      { to: "/orders", icon: <OrderIcon />, label: "Orders", badge: null },
    ],
  },
  {
    label: "System",
    items: [{ to: "/settings", icon: <SettingsIcon />, label: "Settings" }],
  },
];

function Sidebar({ isOpen }) {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? "" : styles.collapsed}`}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <svg viewBox="0 0 24 24" fill="white">
            <path d="M4 4h7v7H4zm9 0h7v7h-7zm-9 9h7v7H4zm9 3h2v-2h2v2h2v2h-2v2h-2v-2h-2z" />
          </svg>
        </div>
        {isOpen && <span className={styles.logoText}>InsightHub</span>}
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        {NAV.map((group) => (
          <div className={styles.navGroup} key={group.label}>
            {isOpen && <span className={styles.navLabel}>{group.label}</span>}
            {group.items.map((item) => (
              <NavLink
                to={item.to}
                key={item.to}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.active : ""}`
                }
              >
                <span className={styles.navIcon}>{item.icon}</span>
                {isOpen && <span className={styles.navText}>{item.label}</span>}
                {isOpen && item.badge && (
                  <span className={styles.badge}>{item.badge}</span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      {isOpen && (
        <div className={styles.footer}>
          <div className={styles.proCard}>
            <div className={styles.proTitle}>✦ Pro Version</div>
            <div className={styles.proDesc}>
              Unlock advanced analytics, unlimited users & more.
            </div>
            <button className={styles.proBtn}>Upgrade Now</button>
          </div>
        </div>
      )}
    </aside>
  );
}

/* ── Icons ── */
function DashIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
      <path d="M16 3.13a4 4 0 010 7.75" />
      <path d="M21 21v-2a4 4 0 00-3-3.85" />
    </svg>
  );
}

function OrderIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 2h12l3 6H3z" />
      <path d="M3 8h18v13a1 1 0 01-1 1H4a1 1 0 01-1-1z" />
      <line x1="9" y1="13" x2="15" y2="13" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}

export default Sidebar;
