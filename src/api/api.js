const BASE_URL = "http://localhost:8000";

/* ── Users ── */
export const getUsers = async function () {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error("failed to fetch users");
  return res.json();
};
