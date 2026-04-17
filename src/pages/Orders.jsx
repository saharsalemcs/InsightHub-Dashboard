import { useEffect, useState } from "react";
import Card from "../components/Card";
import Toolbar from "../components/Toolbar";
import { useSearch } from "../hooks/useSearch";
import styles from "./Orders.module.css";
import EmptyState from "../components/EmptyState";
import { getOrders } from "../api/api";
import OrdersTable from "../components/OrdersTable";
import { usePagination } from "../hooks/usePagination";
import Pagination from "../components/Pagination";
import StatCard from "../components/StatCard";
import { CartIcon, CheckIcon, ClockIcon, XIcon } from "../components/Icons";

const FILTERS = [
  { label: "All", valueue: "all" },
  { label: "Completed", valueue: "completed" },
  { label: "Pending", valueue: "pending" },
  { label: "Cancelled", valueue: "cancelled" },
];

function Orders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const { query, setQuery, filter, setFilter, filtered } = useSearch(orders, [
    "product",
  ]);
  const { paginated, current, setCurrent, total, perPage } =
    usePagination(filtered);

  useEffect(function () {
    getOrders()
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className={styles.page}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Orders</h1>
          <p className={styles.pageDesc}>Track and manage all orders</p>
        </div>
      </div>
      {/* Orders Stat Cards */}
      <div className={styles.statsGrid}>
        <StatCard
          variant="horizontal"
          label="Total Order"
          value={40}
          badge="12%"
          badgeUp={true}
          color="blue"
          icon={<CartIcon />}
        />

        <StatCard
          variant="horizontal"
          label="Completed"
          value={40}
          badge="8%"
          badgeUp={true}
          color="green"
          icon={<CheckIcon />}
        />

        <StatCard
          variant="horizontal"
          label="Pending"
          value={40}
          badge="3%"
          badgeUp={true}
          color="amber"
          icon={<ClockIcon />}
        />

        <StatCard
          variant="horizontal"
          label="Cancelled"
          value={40}
          badge="5%"
          badgeUp={false}
          color="red"
          icon={<XIcon />}
        />
      </div>

      {/* table Card */}
      <Card>
        {/* Toolbar */}
        <Toolbar
          query={query}
          setQuery={setQuery}
          filter={filter}
          setFilter={setFilter}
          options={FILTERS}
          placeholder="Search by product name..."
        />
        {/* Table */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={<CartIcon />}
            title="No products found"
            description="Try adjusting your search or filter."
          />
        ) : (
          <OrdersTable orders={paginated} />
        )}

        {/* Footer count */}
        {filtered.length > 0 && (
          <Pagination
            total={total}
            current={current}
            onChange={setCurrent}
            perPage={perPage}
          />
        )}
      </Card>
    </div>
  );
}

export default Orders;
