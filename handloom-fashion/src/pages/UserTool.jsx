import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserTool = () => {
  const [user, setUser] = useState(null);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', password: '', confirm: '', name: '', email: '' });
  const [registerMode, setRegisterMode] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // Load stored user and orders
  useEffect(() => {
    try {
      const u = localStorage.getItem('hf_user');
      if (u) setUser(JSON.parse(u));
    } catch (err) {
      console.warn('Failed to load user', err);
    }
    try {
      const o = localStorage.getItem('hf_orders');
      if (o) setOrders(JSON.parse(o));
    } catch (err) {
      console.warn('Failed to load orders', err);
    }
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    const { username, password, confirm, name, email } = registerData;
    if (!username || !password) return alert('Provide username and password');
    if (password !== confirm) return alert('Passwords do not match');
    const u = { username, password, name: name || '', email: email || '' };
    try {
      localStorage.setItem('hf_user', JSON.stringify(u));
      setUser(u);
      setRegisterMode(false);
      setRegisterData({ username: '', password: '', confirm: '', name: '', email: '' });
    } catch (err) {
      console.warn('Failed to save user', err);
      alert('Could not save user');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      const raw = localStorage.getItem('hf_user');
      if (!raw) return alert('No user registered. Please register first.');
      const stored = JSON.parse(raw);
      if (loginData.username === stored.username && loginData.password === stored.password) {
        setUser(stored);
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.warn('Login error', err);
      alert('Login failed');
    }
  };

  const handleLogout = () => {
    setUser(null);
    // do not remove stored user on logout; keep account available
  };

  const updateProfile = (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      const updated = { ...user };
      localStorage.setItem('hf_user', JSON.stringify(updated));
      setUser(updated);
      alert('Profile updated');
    } catch (err) {
      console.warn('Failed to update profile', err);
      alert('Could not update profile');
    }
  };

  const handleDeleteAccount = () => {
    if (!confirm('Remove stored user account from this browser?')) return;
    localStorage.removeItem('hf_user');
    setUser(null);
    alert('Account removed');
  };

  if (!user) {
    return (
      <div style={styles.container}>
        <h2>User Portal</h2>
        {!registerMode ? (
          <form onSubmit={handleLogin} style={styles.form}>
            <input
              style={styles.input}
              placeholder="Username"
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            />
            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <button style={styles.button} type="submit">Login</button>
          </form>
        ) : (
          <form onSubmit={handleRegister} style={styles.form}>
            <input style={styles.input} placeholder="Username" value={registerData.username} onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })} />
            <input style={styles.input} type="password" placeholder="Password" value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} />
            <input style={styles.input} type="password" placeholder="Confirm Password" value={registerData.confirm} onChange={(e) => setRegisterData({ ...registerData, confirm: e.target.value })} />
            <input style={styles.input} placeholder="Full name (optional)" value={registerData.name} onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })} />
            <input style={styles.input} placeholder="Email (optional)" value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={styles.button} type="submit">Create Account</button>
              <button type="button" style={{ ...styles.button, backgroundColor: '#6c757d' }} onClick={() => setRegisterMode(false)}>Back</button>
            </div>
          </form>
        )}

        <div style={{ marginTop: 12 }}>
          {!registerMode && <button style={{ ...styles.button, backgroundColor: '#17a2b8' }} onClick={() => setRegisterMode(true)}>Register</button>}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Welcome, {user.name || user.username}</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={styles.button} onClick={() => navigate('/')}>Home</button>
          <button style={{ ...styles.button, backgroundColor: '#6c757d' }} onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div style={styles.section}>
        <h3>Profile</h3>
        <form onSubmit={updateProfile} style={styles.form}>
          <input style={styles.input} value={user.name || ''} onChange={(e) => setUser({ ...user, name: e.target.value })} placeholder="Full name" />
          <input style={styles.input} value={user.email || ''} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="Email" />
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={styles.button} type="submit">Save Profile</button>
            <button type="button" style={{ ...styles.button, backgroundColor: '#dc3545' }} onClick={handleDeleteAccount}>Delete Account</button>
          </div>
        </form>
      </div>

      <div style={styles.section}>
        <h3>Your Orders</h3>
        {orders && orders.length > 0 ? (
          <div>
            {orders.map((o, idx) => (
              <div key={idx} style={{ padding: 10, border: '1px solid #eee', marginBottom: 8 }}>
                <div><strong>Order:</strong> {o.id || `#${idx + 1}`}</div>
                <div><strong>Date:</strong> {o.date || '—'}</div>
                <div><strong>Total:</strong> ₹{o.total || '—'}</div>
              </div>
            ))}
          </div>
        ) : (
          <p>No orders yet.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: 20, maxWidth: 900, margin: '0 auto' },
  form: { display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 420 },
  input: { padding: '8px 10px', border: '1px solid #ddd', borderRadius: 4 },
  button: { padding: '8px 12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  section: { background: '#fff', padding: 12, borderRadius: 6, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: 12 }
};

export default UserTool;
