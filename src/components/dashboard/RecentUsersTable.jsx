import styles from "./RecentUsersTable.module.css";
import StatusBadge from "../common/StatusBadge";

function RecentUsersTable({ users }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Status</th>
            <th>Orders</th>
          </tr>
        </thead>
        <tbody>
          {users.slice(0, 5).map((u) => (
            <tr key={u.id}>
              <td>
                <div className={styles.userCell}>
                  <div
                    className={`${styles.avatar} ${styles[`av_${u.color}`]}`}
                  >
                    {u.avatar}
                  </div>
                  <div>
                    <div className={styles.userName}>{u.name}</div>
                    <div className={styles.userEmail}>{u.email}</div>
                  </div>
                </div>
              </td>
              <td className={styles.role}>{u.role}</td>
              <td>{<StatusBadge status={u.status} />}</td>
              <td className={styles.mono}>{u.orders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentUsersTable;
