import { useState } from "react";
import styles from "./Settings.module.css";
import LeftNav from "../components/settings/LeftNav";
import GeneralSection from "../components/settings/GeneralSection";
import NotificationsSection from "../components/settings/NotificationsSection";
import SecuritySection from "../components/settings/SecuritySection";
import AppearanceSection from "../components/settings/AppearanceSection";

const SECTION_MAP = {
  general: <GeneralSection />,
  notifications: <NotificationsSection />,
  security: <SecuritySection />,
  appearance: <AppearanceSection />,
};

function Settings() {
  const [active, setActive] = useState("general");

  return (
    <div className={styles.page}>
      {/* Left nav */}
      <LeftNav active={active} setActive={setActive} />

      {/* Right panel */}
      <div className={styles.panel}>{SECTION_MAP[active]}</div>
    </div>
  );
}

export default Settings;
