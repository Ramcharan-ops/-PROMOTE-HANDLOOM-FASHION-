import React, { useEffect } from 'react'

export default function ProductCard({ product, addToCart, imageStyle, onError }) {
  const placeholder = `https://via.placeholder.com/300x200?text=${encodeURIComponent(product.name)}`

  useEffect(() => {
    // Debug: log which image URL the card is attempting to load
    // Check the browser console for these messages when the Products page is open
    // (This helps diagnose remote image loading issues.)
    console.debug('ProductCard load:', product.name, product.image)
  }, [product.name, product.image])

  const handleError = (e) => {
    if (onError) return onError(e)
    e.target.onerror = null
    e.target.src = placeholder
  }

  return (
    <div className="product-card">
      <img
        src={product.image || placeholder}
        alt={product.name}
        style={imageStyle || { width: '100%', height: '200px', objectFit: 'cover', display: 'block', background: '#eee' }}
        onError={handleError}
      />
      <h3>{product.name}</h3>
      <p>{product.desc}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  )
}