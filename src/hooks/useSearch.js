import { useMemo, useState } from "react";

export function useSearch(items, searchFields = ["name", "email"]) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    let result = [...items];

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter((item) =>
        searchFields.some((field) =>
          String(item[field] || "")
            .toLowerCase()
            .includes(q),
        ),
      );
    }

    if (filter !== "all") {
      result.filter((item) => item.status === filter);
    }

    return result;
  }, [query, filter, items, searchFields]);

  return { query, setQuery, filter, setFilter, filtered };
}
