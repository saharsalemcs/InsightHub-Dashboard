import { useState } from "react";
import styles from "./AppLayout.module.css";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";

function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={styles.wrapper}>
      <Sidebar isOpen={sidebarOpen} />

      <div className={styles.main}>
        <Topbar onMenuClick={() => setSidebarOpen((p) => !p)} />
        <main className={styles.content}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}

export default AppLayout;
