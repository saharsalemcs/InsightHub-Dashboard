// const BASE_URL = "http://localhost:8000";
import db from "../../data/db.json";

/* ── Users ── */
export const getUsers = async () => db.users;

export const createUser = async (user) => {
  const newUser = { ...user, id: Date.now().toString() };
  db.users.push(newUser);
  return newUser;
};

export const deleteUser = async (id) => {
  const index = db.users.findIndex((u) => u.id === id);
  db.users.splice(index, 1);
  return { id };
};

/* ── Orders ── */
export const getOrders = async () => db.orders;

/* ── Users ── */

// export const getUsers = async function () {
//   const res = await fetch(`../../data/db.json`);
//   if (!res.ok) throw new Error("failed to fetch users");
//   return res.json();
// };

// export const createUser = async function (user) {
//   const res = await fetch(`${BASE_URL}/users`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(user),
//   });
//   if (!res.ok) throw new Error("failed to create user");
//   return res.json();
// };

// export const deleteUser = async function (id) {
//   const res = await fetch(`${BASE_URL}/users/${id}`, {
//     method: "DELETE",
//   });
//   if (!res.ok) throw new Error("failed to delete user");
//   return res.json();
// };

// /* ── Orders ── */
// export const getOrders = async function () {
//   const res = await fetch(`${BASE_URL}/orders`);
//   if (!res.ok) throw new Error("failed to fetch orders");
//   return res.json();
// };
