import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [mode, setMode] = useState('user') // 'user' or 'admin'
  const [action, setAction] = useState('login') // 'login' or 'register'
  const [form, setForm] = useState({ username: '', password: '', confirm: '', name: '', email: '' })
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    const { username, password } = form
    if (mode === 'admin') {
      try {
        const raw = localStorage.getItem('hf_admin')
        const stored = raw ? JSON.parse(raw) : null
        const creds = stored || { username: 'admin', password: 'admin123' }
        if (username === creds.username && password === creds.password) {
          localStorage.setItem('adminAuth', 'true')
          navigate('/admin')
        } else {
          alert('Invalid admin credentials')
        }
      } catch (err) {
        console.warn('Admin login error', err)
        alert('Login failed')
      }
    } else {
      try {
        const raw = localStorage.getItem('hf_user')
        if (!raw) return alert('No user account found. Please register first.')
        const stored = JSON.parse(raw)
        if (username === stored.username && password === stored.password) {
          navigate('/user')
        } else {
          alert('Invalid user credentials')
        }
      } catch (err) {
        console.warn('User login error', err)
        alert('Login failed')
      }
    }
  }

  const handleRegister = (e) => {
    e.preventDefault()
    const { username, password, confirm, name, email } = form
    if (!username || !password) return alert('Provide username and password')
    if (password !== confirm) return alert('Passwords do not match')

    if (mode === 'admin') {
      const creds = { username, password }
      try {
        localStorage.setItem('hf_admin', JSON.stringify(creds))
        localStorage.setItem('adminAuth', 'true')
        alert('Admin registered and logged in')
        navigate('/admin')
      } catch (err) {
        console.warn('Failed to save admin', err)
        alert('Could not register admin')
      }
    } else {
      const u = { username, password, name: name || '', email: email || '' }
      try {
        localStorage.setItem('hf_user', JSON.stringify(u))
        alert('User registered. Redirecting to user portal...')
        navigate('/user')
      } catch (err) {
        console.warn('Failed to save user', err)
        alert('Could not register user')
      }
    }
  }

  return (
    <div style={styles.container}>
      <h2>{action === 'login' ? 'Login' : 'Register'}</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={() => setMode('user')} style={{ ...styles.tab, backgroundColor: mode === 'user' ? '#007bff' : '#f0f0f0', color: mode === 'user' ? '#fff' : '#000' }}>User</button>
        <button onClick={() => setMode('admin')} style={{ ...styles.tab, backgroundColor: mode === 'admin' ? '#007bff' : '#f0f0f0', color: mode === 'admin' ? '#fff' : '#000' }}>Admin</button>
      </div>

      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setAction('login')} style={{ ...styles.small, backgroundColor: action === 'login' ? '#28a745' : '#f0f0f0', color: action === 'login' ? '#fff' : '#000' }}>Login</button>
        <button onClick={() => setAction('register')} style={{ ...styles.small, marginLeft: 8, backgroundColor: action === 'register' ? '#17a2b8' : '#f0f0f0', color: action === 'register' ? '#fff' : '#000' }}>Register</button>
      </div>

      {action === 'login' ? (
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
      ) : (
        <form onSubmit={handleRegister} style={styles.form}>
          <input style={styles.input} placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
          <input style={styles.input} type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <input style={styles.input} type="password" placeholder="Confirm Password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
          {mode === 'user' && (
            <>
              <input style={styles.input} placeholder="Full name (optional)" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input style={styles.input} placeholder="Email (optional)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </>
          )}
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit" style={styles.button}>Create Account</button>
            <button type="button" style={{ ...styles.button, backgroundColor: '#6c757d' }} onClick={() => setAction('login')}>Back</button>
          </div>
        </form>
      )}
    </div>
  )
}

const styles = {
  container: { padding: 20, maxWidth: 640, margin: '0 auto' },
  tab: { padding: '8px 12px', border: 'none', borderRadius: 4, cursor: 'pointer' },
  form: { display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 420 },
  input: { padding: '8px 10px', border: '1px solid #ddd', borderRadius: 4 },
  button: { padding: '8px 12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }
}

export default Login
