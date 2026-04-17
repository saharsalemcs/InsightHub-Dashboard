import styles from "./OrdersTable.module.css";
import StatusBadge from "./StatusBadge";

function OrdersTable({ orders }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>order id</th>
            <th>Product</th>
            <th>User ID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr
              key={o.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <td className={`${styles.mono} ${styles.idCell}`}>#{o.id}</td>
              <td className={styles.product}>{o.product}</td>
              <td className={styles.mono}>{o.userId}</td>
              <td className={styles.amount}>{o.amount}</td>
              <td className={styles.date}>{o.date}</td>
              <td className={styles.date}>
                {<StatusBadge status={o.status} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersTable;
