import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { ShoppingCart, LayoutDashboard, Users, Settings } from "lucide-react";

const NAV = [
  {
    label: "Main",
    items: [
      { to: "/", icon: <LayoutDashboard />, label: "Dashboard" },
      { to: "/users", icon: <Users />, label: "Users", badge: null },
      { to: "/orders", icon: <ShoppingCart />, label: "Orders", badge: null },
    ],
  },
  {
    label: "System",
    items: [{ to: "/settings", icon: <Settings />, label: "Settings" }],
  },
];

function Sidebar({ isOpen }) {
  return (
    <aside
      className={`${styles.sidebar} ${isOpen ? styles.open : styles.collapsed}`}
    >
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z" />
          </svg>
        </div>
        {isOpen && (
          <div className={styles.logoTextWrap}>
            <div className={styles.logoName}>
              <span className={styles.logoWhite}>Nova</span>
              <span className={styles.logoPurple}>Dash</span>
            </div>
            <div className={styles.logoSub}>ADMIN PANEL</div>
          </div>
        )}
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

export default Sidebar;
