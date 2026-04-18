import Spinner from "../UI/Spinner";
import Button from "../UI/Button";
import styles from "./SectionsStyle.module.css";
import { useState } from "react";
import { Save } from "lucide-react";

function GeneralSection() {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>General Settings</h2>
        <p className={styles.sectionDesc}>Update your workspace information</p>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Workspace Name</label>
          <input className={styles.input} defaultValue="NovaDash" />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Admin Email</label>
          <input
            className={styles.input}
            defaultValue="admin@novadash.io"
            type="email"
          />
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Timezone</label>
        <select className={styles.input}>
          <option>UTC (Coordinated Universal Time)</option>
          <option>GMT+2 (Cairo)</option>
          <option>GMT-5 (New York)</option>
          <option>GMT+1 (London)</option>
          <option>GMT+8 (Dubai)</option>
        </select>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Description</label>
        <textarea
          className={`${styles.input} ${styles.textarea}`}
          defaultValue="NovaDash admin workspace for managing users and orders."
        />
      </div>

      <div className={styles.sectionActions}>
        <Button variant="primary" onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <Spinner size={14} /> Saving...
            </>
          ) : saved ? (
            "✓ Saved!"
          ) : (
            <>
              <Save /> Save Changes
            </>
          )}
        </Button>
        <Button variant="ghost">Discard</Button>
      </div>
    </div>
  );
}

export default GeneralSection;
