import styles from "./Dashboard.module.css";
import { useUsersApi } from "../hooks/useUsersApi";
import { useEffect, useState } from "react";
import { getOrders } from "../api/api";
import StatCard from "../components/StatCard";
import Card from "../components/Card";
import CardHeader from "../components/CardHeader";
import {
  UsersIcon,
  ActiveIcon,
  ClockIconDash,
  OrderIcon,
} from "../components/Icons";

function Dashboard() {
  const { users } = useUsersApi();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        alert(err.message);
      }
    }

    fetchOrders();
  }, []);

  const activeUsers = users.filter((u) => u.status === "active").length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;

  return (
    <div className={styles.page}>
      {/* ── Stat Cards ── */}
      <div className={styles.statsGrid}>
        <StatCard
          color="purple"
          delay={0.05}
          icon={<UsersIcon />}
          label="Total Users"
          value={users.length || 15}
          badge="+12.5%"
          badgeType="up"
          sub="vs last month"
        />
        <StatCard
          color="green"
          delay={0.1}
          icon={<ActiveIcon />}
          label="Active Users"
          value={activeUsers || 13}
          badge="+8.2%"
          badgeType="up"
          sub="online now"
        />
        <StatCard
          color="blue"
          delay={0.15}
          icon={<OrderIcon />}
          label="Total Orders"
          value={totalOrders || 12}
          badge="+23.1%"
          badgeType="up"
          sub="this month"
        />
        <StatCard
          color="amber"
          delay={0.2}
          icon={<ClockIconDash />}
          label="Pending Orders"
          value={pendingOrders || 2}
          badge="-4.3%"
          badgeType="down"
          sub="awaiting action"
        />
      </div>

      {/* Charts */}
      <Card className={`${styles.chartCard} animate-fadeInUp delay-3`}>
        <CardHeader
          title="Orders per Day"
          subTitle="Daily order volume — last 7 days"
        />
      </Card>
    </div>
  );
}

export default Dashboard;
