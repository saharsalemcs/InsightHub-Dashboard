import FilterTabs from "./FilterTabs";
import SearchInput from "./SearchInput";
import styles from "./Toolbar.module.css";

function Toolbar({ query, setQuery, options, filter, setFilter, placeholder }) {
  return (
    <div className={styles.toolbar}>
      <SearchInput
        placeholder={placeholder}
        value={query}
        onChange={setQuery}
      />
      <FilterTabs options={options} value={filter} onChange={setFilter} />
    </div>
  );
}

export default Toolbar;
