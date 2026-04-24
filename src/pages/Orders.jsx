import { useEffect, useState } from "react";
import Card from "../components/UI/Card";
import Toolbar from "../components/common/Toolbar";
import { useSearch } from "../hooks/useSearch";
import styles from "./Orders.module.css";
import EmptyState from "../components/UI/EmptyState";
import { getOrders } from "../api/api";
import OrdersTable from "../components/orders/OrdersTable";
import { usePagination } from "../hooks/usePagination";
import Pagination from "../components/common/Pagination";
import StatCard from "../components/common/StatCard";
import { ShoppingCart, CircleCheck, CircleX, Clock } from "lucide-react";
import Spinner from "../components/UI/Spinner";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
  { label: "Cancelled", value: "cancelled" },
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

  const completed = orders.filter((o) => o.status === "completed").length;
  const pending = orders.filter((o) => o.status === "pending").length;
  const cancelled = orders.filter((o) => o.status === "cancelled").length;

  if (loading) {
    return (
      <div className={styles.centered}>
        <Spinner size={40} />
        <p className={styles.loadingText}>Loading Orders...</p>
      </div>
    );
  }

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
          value={total || 30}
          badge="12%"
          badgeType="up"
          color="blue"
          icon={<ShoppingCart />}
        />

        <StatCard
          variant="horizontal"
          label="Completed"
          value={completed || 12}
          badge="8%"
          badgeType="up"
          color="green"
          icon={<CircleCheck />}
        />

        <StatCard
          variant="horizontal"
          label="Pending"
          value={pending || 6}
          badge="3%"
          badgeType="up"
          color="amber"
          icon={<Clock />}
        />

        <StatCard
          variant="horizontal"
          label="Cancelled"
          value={cancelled || 3}
          badge="5%"
          badgeType="down"
          color="red"
          icon={<CircleX />}
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
            icon={<ShoppingCart />}
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
            perPage={perPage}
            current={current}
            onChange={setCurrent}
          />
        )}
      </Card>
    </div>
  );
}

export default Orders;
