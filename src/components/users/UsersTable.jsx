import UserRow from "./UserRow";
import styles from "./UsersTable.module.css";

function UsersTable({ users, onDelete }) {
  return (
    <div className={styles.tabelWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Status</th>
            <th>Orders</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <UserRow key={u.id} user={u} index={i} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
