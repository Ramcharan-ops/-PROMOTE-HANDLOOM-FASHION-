import React from 'react'
import Slideshow from '../Components/Slideshow'
import ProductCard from '../Components/ProductCard'
const productsData = [
  { name: "Cotton Saree", desc: "Soft, breathable eco-friendly fabric.", image: "https://images.unsplash.com/photo-1605522330980-06f6a9dc8224?auto=format&fit=crop&w=800&q=80", price: 50 },
  { name: "Silk Scarf", desc: "Elegant handwoven silk scarf.", image: "https://images.unsplash.com/photo-1610282971730-2b33a4f4f0d4?auto=format&fit=crop&w=800&q=80", price: 30 },
  { name: "Woolen Shawl", desc: "Warm, stylish & handcrafted.", image: "https://images.unsplash.com/photo-1596464716121-8b457972d1e5?auto=format&fit=crop&w=800&q=80", price: 40 },
  { name: "Handloom Craft", desc: "Traditional handloom craft.", image: "https://images.unsplash.com/photo-1624378439575-d8705ad97368?auto=format&fit=crop&w=800&q=80", price: 60 }
]
export default function Products({ addToCart }) {
  return (
    <section 
      className="products" 
      style={{ 
        textAlign: 'center',
        padding: '50px 20px',
        backgroundColor: '#fafafa'
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#2f4f4f' }}>
        Featured Products
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
        <Slideshow images={productsData.map(p => p.image)} />
      </div>
      <div 
        className="product-grid"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '30px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}
      >
        {productsData.map((p, i) => (
          <ProductCard
            key={i}
            product={p}
            addToCart={addToCart}
            imageStyle={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block', background: '#eee' }}
            onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found'; }}
          />
        ))}
        
      </div>
    </section>
  )
}