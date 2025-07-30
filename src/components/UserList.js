import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/AxiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/style.css';
import CustomPagination from './CustomPagination';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get(`/users/?page=${page}`);
        setUsers(res.data.results);
        setCount(res.data.count);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  if (loading) return <p className="text-gray-500">Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  const totalPages = Math.ceil(count / 15);
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4" style={{ color: '#003366' }}>All Users</h2>
      <table className="table custom-table text-center align-middle">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Username</th>
            <th className="border px-4 py-2 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.email || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <CustomPagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default UserList;
