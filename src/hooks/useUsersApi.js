import { useUsers } from "../context/UsersContext";
import { getUsers } from "../api/api";
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

  useEffect(
    function () {
      fetchUsers();
    },
    [fetchUsers],
  );

  return { users, loading, error, fetchUsers };
}
