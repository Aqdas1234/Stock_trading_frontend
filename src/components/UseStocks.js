import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../api/AxiosInstance';

const UseStocks = (page = 1) => {
  const [stocks, setStocks] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStocks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/stocks/?page=${page}`);
      setStocks(res.data.results);
      setCount(res.data.count);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchStocks();
  }, [fetchStocks]);

  return { stocks, count, loading, error, refetch: fetchStocks };
};

export default UseStocks;
