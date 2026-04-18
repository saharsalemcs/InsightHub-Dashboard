import { useEffect, useState } from "react";
import styles from "./AppLayout.module.css";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";

function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // تابع تغيير حجم الشاشة
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // لو الشاشة اتكبرت، إقفل الـ overlay تلقائي
      if (!mobile) setSidebarOpen(true);
      if (mobile) setSidebarOpen(false);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // شغّله مرة أول ما يفتح
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className={styles.wrapper}>
      {/* ── Overlay ورا الـ sidebar في الموبايل ── */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 49,
          }}
        />
      )}

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
