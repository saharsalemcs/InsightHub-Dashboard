import { useUsers } from "../context/UsersContext";
import { createUser, deleteUser, getUsers } from "../api/api";
import { useCallback, useEffect } from "react";

export function useUsersApi() {
  const { users, loading, error, dispatch } = useUsers();

  // Fetch all users
  const fetchUsers = useCallback(
    async function () {
      dispatch({ type: "setLoading", payload: true });
      try {
        const data = await getUsers();
        dispatch({ type: "setUsers", payload: data });
      } catch (err) {
        dispatch({ type: "setError", payload: err.message });
      }
    },
    [dispatch],
  );

  // Add user
  const addUser = useCallback(
    async function (userData) {
      try {
        const avatarColors = [
          "purple",
          "blue",
          "green",
          "amber",
          "coral",
          "pink",
        ];
        const color =
          avatarColors[Math.floor(Math.random() * avatarColors.length)];
        const initials = userData.name
          .split(" ")
          .map((w) => w[0].toUpperCase())
          .slice(0, 2)
          .join("");

        const newUser = {
          id: Date.now(),
          ...userData,
          avatar: initials,
          color,
          orders: 0,
          joinedAt: new Date().toISOString().split("T")[0],
          createdAt: Date.now(),
        };

        const created = await createUser(newUser);
        dispatch({ type: "addUser", payload: created });
        return created;
      } catch (err) {
        dispatch({ type: "setError", payload: err.message });
        throw err;
      }
    },
    [dispatch],
  );

  // Delete user
  const removeUser = useCallback(
    async function (id) {
      try {
        await deleteUser(id);
        dispatch({ type: "deleteUser", payload: id });
      } catch (err) {
        dispatch({ type: "setError", payload: err.message });
        throw err;
      }
    },
    [dispatch],
  );

  useEffect(
    function () {
      fetchUsers();
    },
    [fetchUsers],
  );

  return { users, loading, error, fetchUsers, addUser, removeUser };
}
