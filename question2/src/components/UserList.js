import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const dummyToken = 'QpwL5tke4Pnpja7X4';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('https://reqres.in/api/users', {
          headers: {
            Authorization: `Bearer ${dummyToken}`
          }
        });
        setUsers(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="user-grid">
      {users.map(user => (
        <div key={user.id} className="card">
          <img src={user.avatar} alt={user.first_name} />
          <h3>{user.first_name} {user.last_name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default UserList;
