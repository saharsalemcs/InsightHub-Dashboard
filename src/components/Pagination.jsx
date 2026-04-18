import styles from "./Pagination.module.css";
import Button from "./UI/Button";

function Pagination({ total, perPage, current, onChange }) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  const from = (current - 1) * perPage + 1;
  const to = Math.min(current * perPage, total);

  /* build page numbers with ellipsis */
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= current - 1 && i <= current + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className={styles.wrap}>
      <span className={styles.info}>
        Showing <strong>{from}</strong> to <strong>{to}</strong> of{" "}
        <strong>{total}</strong>
      </span>

      <div className={styles.controls}>
        {/* Prev */}
        <Button
          className={styles.btn}
          onClick={() => onChange(current - 1)}
          disabled={current === 1}
          aria-label="Previous page"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Button>

        {/* Pages */}
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`dot-${i}`} className={styles.dots}>
              ···
            </span>
          ) : (
            <Button
              key={p}
              className={`${styles.btn} ${p === current ? styles.active : ""}`}
              onClick={() => onChange(p)}
            >
              {p}
            </Button>
          ),
        )}

        {/* Next */}
        <Button
          className={styles.btn}
          onClick={() => onChange(current + 1)}
          disabled={current === totalPages}
          aria-label="Next page"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
