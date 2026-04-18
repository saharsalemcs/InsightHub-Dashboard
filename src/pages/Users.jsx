import { useMemo, useState } from "react";
import Button from "../components/UI/Button";
import Modal from "../components/users/Modal";
import Card from "../components/UI/Card";
import styles from "./Users.module.css";
import AddUserForm from "../components/users/AddUserForm";
import { useUsersApi } from "../hooks/useUsersApi";
import MiniStat from "../components/users/MiniStat";
import Toolbar from "../components/common/Toolbar";
import { useSearch } from "../hooks/useSearch";
import EmptyState from "../components/UI/EmptyState";
import UsersTable from "../components/users/UsersTable";
import ConfirmDeleteUser from "../components/users/ConfirmDeleteUser";
import Spinner from "../components/UI/Spinner";
import Error from "../components/UI/Error";
import Pagination from "../components/common/Pagination";
import { usePagination } from "../hooks/usePagination";

const FILTER_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Pending", value: "pending" },
  { label: "Inactive", value: "inactive" },
];

function Users() {
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [deleteUser, setDeleteUser] = useState(null);
  const { users, loading, error, addUser, removeUser } = useUsersApi();

  const stats = useMemo(() => {
    return [
      { label: "Total", val: users.length, color: "purple" },
      {
        label: "Active",
        val: users.filter((u) => u.status === "active").length,
        color: "green",
      },
      {
        label: "Pending",
        val: users.filter((u) => u.status === "pending").length,
        color: "amber",
      },
      {
        label: "Inactive",
        val: users.filter((u) => u.status === "inactive").length,
        color: "red",
      },
    ];
  }, [users]);
  const { query, setQuery, filter, setFilter, filtered } = useSearch(users);
  const { paginated, current, setCurrent, total, perPage } =
    usePagination(filtered);

  if (loading) {
    return (
      <div className={styles.centered}>
        <Spinner size={40} />
        <p className={styles.loadingText}>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Users</h1>
          <p className={styles.pageDesc}>Manage your users base</p>
        </div>
        <Button onClick={() => setAddUserOpen(true)}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add User
        </Button>
      </div>
      {/* Stats Row */}
      <div className={styles.miniStats}>
        {stats.map((s) => (
          <MiniStat key={s.label} {...s} />
        ))}
      </div>
      {/* TAble  Card*/}
      <Card>
        {/* Toolbar */}
        <Toolbar
          options={FILTER_OPTIONS}
          query={query}
          setQuery={setQuery}
          filter={filter}
          setFilter={setFilter}
          placeholder="Search by name or email..."
        />
        {/* Table */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={<UserIcon />}
            title="No users found"
            description="Try adjusting your search or filter."
          />
        ) : (
          <UsersTable users={paginated} onDelete={setDeleteUser} />
        )}

        {/* Footer count */}
        {filtered.length > 0 && (
          <Pagination
            total={total}
            perPage={perPage}
            current={current}
            onChange={setCurrent}
          />
        )}
      </Card>
      {/* Add User Modal */}
      <Modal
        isOpen={addUserOpen}
        onClose={() => setAddUserOpen(false)}
        title="Add New User"
      >
        <AddUserForm onClose={() => setAddUserOpen(false)} onSubmit={addUser} />
      </Modal>
      {/* Delete User Modal */}

      <Modal
        isOpen={!!deleteUser}
        onClose={() => setDeleteUser(null)}
        title="Delete User"
      >
        <ConfirmDeleteUser
          user={deleteUser}
          onConfirm={() => removeUser(deleteUser.id)}
          onClose={() => setDeleteUser(null)}
        />
      </Modal>
    </div>
  );
}

function UserIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="8" r="5" />
      <path d="M3 21v-2a7 7 0 0114 0v2" />
    </svg>
  );
}
export default Users;
