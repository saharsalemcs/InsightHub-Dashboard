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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import RecentUsersTable from "../components/RecentUsersTable";

/* ── Static chart data ── */
const ordersPerDay = [
  { day: "Mon", orders: 12 },
  { day: "Tue", orders: 19 },
  { day: "Wed", orders: 15 },
  { day: "Thu", orders: 22 },
  { day: "Fri", orders: 18 },
  { day: "Sat", orders: 26 },
  { day: "Sun", orders: 28 },
];

const revenuePerMonth = [
  { month: "Jun", revenue: 44000 },
  { month: "Jul", revenue: 52000 },
  { month: "Aug", revenue: 46000 },
  { month: "Sep", revenue: 61000 },
  { month: "Oct", revenue: 55000 },
  { month: "Nov", revenue: 67000 },
  { month: "Dec", revenue: 72000 },
];

const ACTIVITY = [
  {
    id: 1,
    text: "Ahmed created order",
    sub: "#1012",
    time: "2 min ago",
    color: "green",
  },
  {
    id: 2,
    text: "Sara registered",
    sub: "new user",
    time: "15 min ago",
    color: "blue",
  },
  {
    id: 3,
    text: "Order #1010",
    sub: "set to pending",
    time: "1 hr ago",
    color: "amber",
  },
  {
    id: 4,
    text: "Layla account",
    sub: "set inactive",
    time: "3 hr ago",
    color: "red",
  },
];

/* ── Custom Tooltip ── */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipLabel}>{label}</div>
      <div className={styles.tooltipValue}>
        {payload[0].name === "revenue"
          ? `$${payload[0].value.toLocaleString()}`
          : payload[0].value}
      </div>
    </div>
  );
}

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
        <ResponsiveContainer width="100%" height={210}>
          <AreaChart
            data={ordersPerDay}
            margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c5cfc" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#7c5cfc" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{
                fill: "var(--text-muted)",
                fontSize: 11,
                fontFamily: "var(--font-mono)",
              }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{
                fill: "var(--text-muted)",
                fontSize: 11,
                fontFamily: "var(--font-mono)",
              }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#7c5cfc"
              strokeWidth={2.5}
              fill="url(#ordersGrad)"
              dot={{
                r: 4,
                fill: "#7c5cfc",
                strokeWidth: 2,
                stroke: "var(--bg-card)",
              }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Bar chart */}
      <Card className={`${styles.chartCard} animate-fadeInUp delay-4`}>
        <CardHeader title="Revenue / Month" subtitle="Monthly revenue in USD" />
        <ResponsiveContainer width="100%" height={210}>
          <BarChart
            data={revenuePerMonth}
            margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{
                fill: "var(--text-muted)",
                fontSize: 11,
                fontFamily: "var(--font-mono)",
              }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{
                fill: "var(--text-muted)",
                fontSize: 11,
                fontFamily: "var(--font-mono)",
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="revenue"
              fill="#7c5cfc"
              radius={[6, 6, 0, 0]}
              opacity={0.85}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Users */}
      <Card className="animate-fadeInUp delay-5">
        <CardHeader title="Recent Users" subTitle="Latest registered members" />
        <RecentUsersTable users={users} />
      </Card>

      {/* Recent Activity */}
      <Card className="animate-fadeInUp delay-6">
        <CardHeader title="Recent Activity" subTitle="Latest system events" />

        <div className={styles.activityList}>
          {ACTIVITY.map((a, i) => (
            <div key={a.id} className={styles.activityItem}>
              <div className={styles.activityDotCol}>
                <div
                  className={`${styles.activityDot} ${styles[`dot_${a.color}`]}`}
                />
                {i < ACTIVITY.length - 1 && (
                  <div className={styles.activityLine} />
                )}
              </div>
              <div className={styles.activityContent}>
                <div className={styles.activityText}>
                  <strong>{a.text}</strong> {a.sub}
                </div>
                <div className={styles.activityTime}>{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;
