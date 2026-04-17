import { useEffect, useMemo, useState } from "react";

export function usePagination(items, perPage = 5) {
  const [current, setCurrent] = useState(1);

  const totalPages = Math.ceil(items.length / perPage);

  /* reset to page 1 whenever items list changes (search/filter) */
  useEffect(
    function () {
      setCurrent(1);
    },
    [items.length],
  );

  const paginated = useMemo(() => {
    const start = (current - 1) * perPage;
    return items.slice(start, start + perPage);
  }, [items, current, perPage]);

  return {
    paginated,
    current,
    setCurrent,
    perPage,
    total: items.length,
    totalPages,
  };
}
