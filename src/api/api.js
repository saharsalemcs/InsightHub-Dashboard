const BASE_URL = "http://localhost:8000";

/* ── Users ── */
export const getUsers = async function () {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error("failed to fetch users");
  return res.json();
};

export const createUser = async function (user) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("failed to create user");
  return res.json();
};

export const deleteUser = async function (id) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("failed to delete user");
  return res.json();
};
