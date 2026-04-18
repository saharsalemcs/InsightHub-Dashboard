import styles from "./AddUserForm.module.css";
import { useState } from "react";
import Button from "../UI/Button";
import Spinner from "../UI/Spinner";

const ROLES = ["Admin", "Editor", "Viewer"];
const STATUSES = ["active", "pending", "inactive"];

function AddUserForm({ onSubmit, onClose }) {
  // controlled form object instead of creating state for each input
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Viewer",
    status: "active",
  });
  // clear errors
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // global setter function with [computed property name]
  const set = function (field, val) {
    setForm((prev) => ({ ...prev, [field]: val }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = function () {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    return errs;
  };

  const handleSubmit = async function (e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(form);
      onClose();
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Full Name</label>
        <input
          className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
          type="text"
          placeholder="e.g. Ahmed Mostafa"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
        />
        {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Email Address</label>
        <input
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          type="email"
          placeholder="e.g. ahmed@mail.com"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
        />
        {errors.email && (
          <span className={styles.errorMsg}>{errors.email}</span>
        )}
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Role</label>
          <select
            className={styles.input}
            value={form.role}
            onChange={(e) => set("role", e.target.value)}
          >
            {ROLES.map((r) => (
              <option value={r} key={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Status</label>
          <select
            className={styles.input}
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
          >
            {STATUSES.map((s) => (
              <option value={s} key={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.formActions}>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button>
          {submitting ? (
            <>
              <Spinner size={14} /> Adding...
            </>
          ) : (
            "+ Add User"
          )}
        </Button>
      </div>
    </form>
  );
}

export default AddUserForm;
