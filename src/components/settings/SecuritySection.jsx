import { useState } from "react";
import Button from "../UI/Button";
import styles from "./SectionsStyle.module.css";
import SettingToggleRow from "./SettingToggleRow";
import { Save } from "lucide-react";

function SecuritySection() {
  const [security, setSecurity] = useState({ twofa: true, timeout: true });
  const [pw, setPw] = useState({ newPw: "", confirm: "" });
  const [pwError, setPwError] = useState("");
  const [pwSaved, setPwSaved] = useState(false);

  const set = (key, val) => setSecurity((p) => ({ ...p, [key]: val }));

  const handleUpdatePw = () => {
    if (!pw.newPw) return setPwError("Enter a new password");
    if (pw.newPw !== pw.confirm) return setPwError("Passwords do not match");
    setPwError("");
    setPwSaved(true);
    setPw({ newPw: "", confirm: "" });
    setTimeout(() => setPwSaved(false), 2500);
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Security</h2>
        <p className={styles.sectionDesc}>
          Keep your workspace safe and secure
        </p>
      </div>

      <div className={styles.toggleList}>
        <SettingToggleRow
          label="Two-Factor Authentication"
          desc="Add an extra layer of security to your account"
          checked={security.twofa}
          onChange={(v) => set("twofa", v)}
        />
        <SettingToggleRow
          label="Auto Session Timeout"
          desc="Automatically log out after 30 minutes of inactivity"
          checked={security.timeout}
          onChange={(v) => set("timeout", v)}
        />
      </div>

      <div className={styles.fieldGroup} style={{ marginTop: 24 }}>
        <label className={styles.fieldLabel}>Change Password</label>
        <input
          className={styles.input}
          type="password"
          placeholder="New password..."
          value={pw.newPw}
          onChange={(e) => {
            setPw((p) => ({ ...p, newPw: e.target.value }));
            setPwError("");
          }}
        />
        <input
          className={`${styles.input} ${styles.inputSpaced}`}
          type="password"
          placeholder="Confirm password..."
          value={pw.confirm}
          onChange={(e) => {
            setPw((p) => ({ ...p, confirm: e.target.value }));
            setPwError("");
          }}
        />
        {pwError && <span className={styles.errorMsg}>{pwError}</span>}
      </div>

      <div className={styles.sectionActions}>
        <Button variant="primary" onClick={handleUpdatePw}>
          {pwSaved ? (
            "✓ Updated!"
          ) : (
            <>
              <Save /> Update Password
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
export default SecuritySection;
