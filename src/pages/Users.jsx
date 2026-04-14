import { useMemo, useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Card from "../components/Card";
import styles from "./Users.module.css";
import AddUserForm from "../components/AddUserForm";
import { useUsersApi } from "../hooks/useUsersApi";
import MiniStat from "../components/MiniStat";
import Toolbar from "../components/Toolbar";
import { useSearch } from "../hooks/useSearch";

const FILTER_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Pending", value: "pending" },
  { label: "Inactive", value: "inactive" },
];

function Users() {
  const [addUserOpen, setAddUserOpen] = useState(false);
  const { users, loading, error } = useUsersApi();

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

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Users</h1>
          <p className={styles.pageDesc}>{users.length} total members</p>
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
        />
        {/* Table */}
      </Card>
      {/* Add User Modal */}
      <Modal
        isOpen={addUserOpen}
        onClose={() => setAddUserOpen(false)}
        title="Add New User"
      >
        <AddUserForm onClose={() => setAddUserOpen(false)} />
      </Modal>
    </div>
  );
}

export default Users;
