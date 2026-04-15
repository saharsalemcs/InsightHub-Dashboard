import Button from "./Button";
import EmptyState from "./EmptyState";
import styles from "./Error.module.css";

function Error({ error }) {
  return (
    <div className={styles.centered}>
      <EmptyState
        icon={<ErrorIcon />}
        title="Could not load users"
        description={`Make sure json-server is running on port 3001.\n${error}`}
        action={<Button onClick={() => window.location.reload()}>Retry</Button>}
      />
    </div>
  );
}

function ErrorIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export default Error;
