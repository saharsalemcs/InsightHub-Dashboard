import { memo } from "react";
import UserAvatar from "./UserAvatar";
import styles from "./UserRow.module.css";
import StatusBadge from "./StatusBadge";
import IconButton from "./IconButton";

const UserRow = memo(function UserRow({ user: u, index, onDelete }) {
  return (
    <tr
      key={u.id}
      className={`${styles.row} animate-fadeInUp`}
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      <td className={styles.cell}>
        <div className={styles.userCell}>
          <UserAvatar initials={u.avatar} color={u.color} size={36} />
          <div>
            <div className={styles.userName}>{u.name}</div>
            <div className={styles.userEmail}>{u.email}</div>
          </div>
        </div>
      </td>
      <td className={styles.cell}>
        <span
          className={`${styles.roleTag} ${styles[`role_${u.role.toLowerCase()}`]}`}
        >
          {u.role}
        </span>
      </td>
      <td className={styles.cell}>
        <StatusBadge status={u.status} />
      </td>
      <td className={`${styles.mono} ${styles.cell}`}>{u.orders}</td>
      <td className={`${styles.cell} ${styles.dateCell}`}>{u.joinedAt}</td>
      <td className={styles.cell}>
        <div className={styles.actions}>
          <IconButton title="Delete user" danger onClick={() => onDelete(u)}>
            <svg
              width="14"
              height="14"
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
          </IconButton>
        </div>
      </td>
    </tr>
  );
});

export default UserRow;
