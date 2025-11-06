import React from 'react'
export default function Cart({ cart, removeFromCart, clearCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0)
  const checkout = () => {
    alert(`Thank you for your purchase! Total: $${total}`)
    clearCart()
  }
  return (
    <section
      className="cart"
      style={{
        textAlign: 'center',
        padding: '50px 20px',
        backgroundColor: '#fafafa',
        minHeight: '80vh'
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#2f4f4f' }}>
        Your Cart
      </h1>
      {cart.length === 0 ? (
        <p style={{ fontSize: '1.2rem', color: '#555' }}>Cart is empty.</p>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '15px',
              marginBottom: '30px'
            }}
          >
            {cart.map((item, i) => (
              <div
                key={i}
                className="cart-item"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '300px',
                  backgroundColor: '#fff',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}
              >
                <p style={{ margin: 0, fontWeight: '500' }}>
                  {item.name} - ${item.price}
                </p>
                <button
                  onClick={() => removeFromCart(i)}
                  style={{
                    backgroundColor: '#ff6b6b',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '5px 10px',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <h2 style={{ marginBottom: '20px', color: '#2f4f4f' }}>
            Total: ${total}
          </h2>
          <div
            className="cart-buttons"
            style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}
          >
            <button
              onClick={clearCart}
              style={{
                backgroundColor: '#999',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Clear Cart
            </button>
            <button
              onClick={checkout}
              className="checkout-btn"
              style={{
                backgroundColor: '#2f4f4f',
                color: '#f4c430',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </section>
  )
}