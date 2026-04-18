import styles from "./Spinner.module.css";

function Spinner({ size = 24 }) {
  return (
    <div
      className={styles.spinner}
      style={{ width: size, height: size, borderWidth: size / 8 }}
    ></div>
  );
}

export default Spinner;
