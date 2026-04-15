import { createContext, useContext, useReducer } from "react";

const UsersContext = createContext();

const initialState = {
  users: [],
  loading: false,
  error: null,
};
function usersReducer(state, action) {
  switch (action.type) {
    case "setUsers":
      return {
        ...state,
        users: [...action.payload].sort((a, b) => b.createdAt - a.createdAt),
        loading: false,
      };
    case "addUser":
      return { ...state, users: [action.payload, ...state.users] };
    case "deleteUser":
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
      };
    case "setLoading":
      return { ...state, loading: action.payload };
    case "setError":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

function UsersProvider({ children }) {
  const [{ users, loading, error }, dispatch] = useReducer(
    usersReducer,
    initialState,
  );

  return (
    <UsersContext.Provider
      value={{
        users,
        loading,
        error,
        dispatch,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

function useUsers() {
  const context = useContext(UsersContext);
  if (!context)
    throw new Error("UsersContext must be used within UsesProdiver");
  return context;
}

export { UsersProvider, useUsers };
