import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import AdminTool from './pages/AdminTool'
function App() {
  const [cart, setCart] = useState([])
  const addToCart = (product) => {
    setCart([...cart, product])
    alert(`${product.name} added to cart!`)
  }
  const removeFromCart = (i) => setCart(cart.filter((_, idx) => idx !== i))
  const clearCart = () => setCart([])
  return (
    <>
      <Navbar cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminTool />} />
      </Routes>
    </>
  )
}
export default App