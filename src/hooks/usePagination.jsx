"use client"
import React, { useEffect, useState } from 'react'

const usePagination = (fetchFunction, initialPage = 1, initialpageSize = 5) => {
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [pageSize, setpageSize] = useState(initialpageSize);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchFunction(page, pageSize);
        setData(response.data);
        setTotalPages(response.meta.pagination.pageCount);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize, fetchFunction]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return { data, loading, error, page, pageSize, totalPages, handlePageChange };
};

export default usePagination;
