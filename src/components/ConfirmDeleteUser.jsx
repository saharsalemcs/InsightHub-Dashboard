import { useState } from "react";
import Button from "./UI/Button";
import styles from "./ConfirmDeleteUser.module.css";
import Spinner from "./UI/Spinner";

function ConfirmDeleteUser({ user, onConfirm, onClose }) {
  const [loading, setLoading] = useState(false);
  const handleDelete = async function () {
    setLoading(true);
    await onConfirm();
    setLoading(false);
    onClose();
  };

  return (
    <div className={styles.confirmWrap}>
      <div className={styles.confirmIcon}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14H6L5 6" />
          <path d="M10 11v6M14 11v6" />
          <path d="M9 6V4h6v2" />
        </svg>
      </div>
      <p className={styles.confirmText}>
        Are you sure you want to delete <strong>{user?.name}</strong> ? This
        action cannot be undone.
      </p>
      <div className={styles.formActions}>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={loading}>
          {loading ? (
            <>
              <Spinner size={14} /> Deleting...
            </>
          ) : (
            "Delete User"
          )}
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDeleteUser;
