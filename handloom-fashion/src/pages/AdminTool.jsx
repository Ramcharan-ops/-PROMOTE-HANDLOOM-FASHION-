import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminTool = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [registerMode, setRegisterMode] = useState(false);
  const [registerData, setRegisterData] = useState({ username: '', password: '', confirm: '' });
  const navigate = useNavigate();

  // Mock admin credentials (In real app, use proper authentication)
  const adminCredentials = {
    username: 'admin',
    password: 'admin123'
  };

  const [storedAdmin, setStoredAdmin] = useState(null)

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const creds = storedAdmin || adminCredentials
    if (loginData.username === creds.username && loginData.password === creds.password) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault()
    const { username, password, confirm } = registerData
    if (!username || !password) return alert('Please provide username and password')
    if (password !== confirm) return alert('Passwords do not match')
    const creds = { username, password }
    try {
      localStorage.setItem('hf_admin', JSON.stringify(creds))
      setStoredAdmin(creds)
      setIsAuthenticated(true)
      localStorage.setItem('adminAuth', 'true')
      setRegisterMode(false)
      setRegisterData({ username: '', password: '', confirm: '' })
    } catch (err) {
      console.warn('Failed to save admin credentials', err)
      alert('Could not save credentials')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    navigate('/');
  };

  // Product Management
  const [newProduct, setNewProduct] = useState({
    name: '',
    desc: '',
    image: '',
    price: ''
  });

  // Load saved products from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('hf_products')
      if (raw) setProducts(JSON.parse(raw))
    } catch (err) {
      console.warn('Failed to load products from localStorage', err)
    }
    try {
      const a = localStorage.getItem('hf_admin')
      if (a) setStoredAdmin(JSON.parse(a))
    } catch (err) {
      console.warn('Failed to load admin creds', err)
    }
  }, [])

  // Persist products to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('hf_products', JSON.stringify(products))
    } catch (err) {
      console.warn('Failed to save products to localStorage', err)
    }
  }, [products])

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      setProducts(prev => [...prev, { ...newProduct, id: Date.now() }]);
      setNewProduct({ name: '', desc: '', image: '', price: '' });
    }
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    if (selectedProduct) {
      setProducts(prev => prev.map(p => (p.id === selectedProduct.id ? selectedProduct : p)));
      setSelectedProduct(null);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setSelectedProduct(prev => ({ ...prev, [name]: value }))
  }

  const handleCancelEdit = () => setSelectedProduct(null)

  // Check authentication on load
  useEffect(() => {
    const isAdmin = localStorage.getItem('adminAuth');
    if (isAdmin) {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="admin-login" style={styles.container}>
        <h2>Admin Login</h2>
        {!registerMode ? (
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={loginData.username}
            onChange={(e) => setLoginData({...loginData, username: e.target.value})}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        ) : (
          <form onSubmit={handleRegister} style={styles.form}>
            <input
              type="text"
              placeholder="Choose username"
              value={registerData.username}
              onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Choose password"
              value={registerData.password}
              onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={registerData.confirm}
              onChange={(e) => setRegisterData({...registerData, confirm: e.target.value})}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Register</button>
            <button type="button" onClick={() => setRegisterMode(false)} style={{ ...styles.button, backgroundColor: '#6c757d' }}>Back</button>
          </form>
        )}
        <div style={{ marginTop: 10 }}>
          {!registerMode ? (
            <button onClick={() => setRegisterMode(true)} style={{ ...styles.button, backgroundColor: '#17a2b8' }}>Register Admin</button>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard" style={styles.container}>
      <div style={styles.header}>
        <h2>Admin Dashboard</h2>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          <button onClick={() => {
            // remove stored admin credentials
            localStorage.removeItem('hf_admin')
            setStoredAdmin(null)
            alert('Stored admin credentials removed')
          }} style={{ ...styles.logoutButton, backgroundColor: '#6c757d' }}>Remove Stored Credentials</button>
        </div>
      </div>

      {/* Product Management Section */}
      <div style={styles.section}>
        <h3>Product Management</h3>
        
        {/* Add Product Form */}
        <form onSubmit={handleAddProduct} style={styles.form}>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.desc}
            onChange={(e) => setNewProduct({...newProduct, desc: e.target.value})}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Add Product</button>
        </form>

        {/* Edit Product Form (shown when editing) */}
        {selectedProduct && (
          <form onSubmit={handleUpdateProduct} style={{ ...styles.form, backgroundColor: '#f7f9fb', padding: '15px', borderRadius: '6px' }}>
            <h4>Edit Product</h4>
            <input
              type="text"
              name="name"
              value={selectedProduct.name}
              onChange={handleEditChange}
              placeholder="Product Name"
              style={styles.input}
            />
            <input
              type="text"
              name="desc"
              value={selectedProduct.desc}
              onChange={handleEditChange}
              placeholder="Description"
              style={styles.input}
            />
            <input
              type="text"
              name="image"
              value={selectedProduct.image}
              onChange={handleEditChange}
              placeholder="Image URL"
              style={styles.input}
            />
            <input
              type="number"
              name="price"
              value={selectedProduct.price}
              onChange={handleEditChange}
              placeholder="Price"
              style={styles.input}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" style={styles.button}>Save</button>
              <button type="button" onClick={handleCancelEdit} style={{ ...styles.button, backgroundColor: '#6c757d' }}>Cancel</button>
            </div>
          </form>
        )}

        {/* Product List */}
        <div style={styles.productList}>
          <h4>Current Products</h4>
          {products.map(product => (
            <div key={product.id} style={styles.productItem}>
              <img 
                src={product.image} 
                alt={product.name} 
                style={styles.productImage}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/100x100?text=Product';
                }}
              />
              <div style={styles.productInfo}>
                <h5>{product.name}</h5>
                <p>{product.desc}</p>
                <p>₹{product.price}</p>
              </div>
              <div style={styles.productActions}>
                <button 
                  onClick={() => setSelectedProduct(product)}
                  style={styles.editButton}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteProduct(product.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  section: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '400px',
    margin: '20px 0'
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  logoutButton: {
    padding: '8px 16px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  productList: {
    marginTop: '20px'
  },
  productItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '10px'
  },
  productImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '4px'
  },
  productInfo: {
    flex: 1,
    marginLeft: '20px'
  },
  productActions: {
    display: 'flex',
    gap: '10px'
  },
  editButton: {
    padding: '6px 12px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default AdminTool;