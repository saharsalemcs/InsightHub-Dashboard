import styles from "./UserAvatar.module.css";

function UserAvatar({ initials, color = "purple", size = 32 }) {
  return (
    <div
      className={`${styles.userAvatar} ${styles[`av_${color}`]}`}
      style={{ width: size, height: size, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  );
}

export default UserAvatar;
