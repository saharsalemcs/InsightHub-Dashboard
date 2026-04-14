import styles from "./Footer.module.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <span className={styles.copy}>
        <span>&copy;</span> {year} InsightHub Pro. All rights reserved.
      </span>
      <div className={styles.links}>
        <a href="#privacy" className={styles.link}>
          privacy Policy
        </a>
        <span className={styles.sep}></span>
        <a href="#services" className={styles.link}>
          Terms of Services
        </a>
        <span className={styles.sep}></span>
        <a href="#support" className={styles.link}>
          Support
        </a>
      </div>
    </footer>
  );
}

export default Footer;
