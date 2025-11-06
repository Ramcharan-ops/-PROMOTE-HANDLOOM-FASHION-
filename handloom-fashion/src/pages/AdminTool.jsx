import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminTool = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  // Mock admin credentials (In real app, use proper authentication)
  const adminCredentials = {
    username: 'admin',
    password: 'admin123'
  };

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username === adminCredentials.username && 
        loginData.password === adminCredentials.password) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
    } else {
      alert('Invalid credentials');
    }
  };

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

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      setProducts([...products, { ...newProduct, id: Date.now() }]);
      setNewProduct({ name: '', desc: '', image: '', price: '' });
    }
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    if (selectedProduct) {
      setProducts(products.map(p => 
        p.id === selectedProduct.id ? selectedProduct : p
      ));
      setSelectedProduct(null);
    }
  };

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
      </div>
    );
  }

  return (
    <div className="admin-dashboard" style={styles.container}>
      <div style={styles.header}>
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
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