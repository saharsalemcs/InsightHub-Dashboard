import styles from "./FilterTabs.module.css";

function FilterTabs({ options, value, onChange }) {
  return (
    <div className={styles.filterTabs}>
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`${styles.filterTab} ${opt.value === value ? styles.filterTabActive : ""}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;
