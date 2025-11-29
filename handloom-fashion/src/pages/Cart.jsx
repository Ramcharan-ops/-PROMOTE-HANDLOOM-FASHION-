import React, { useState } from 'react'

export default function Cart({ cart, removeFromCart, clearCart }) {
  const [showPayment, setShowPayment] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  })
  const [paymentStatus, setPaymentStatus] = useState('')

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  const handleCustomerChange = (e) => {
    const { name, value } = e.target
    setCustomerInfo({ ...customerInfo, [name]: value })
  }

  const handleCardChange = (e) => {
    const { name, value } = e.target
    setCardInfo({ ...cardInfo, [name]: value })
  }

  const processPayment = (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
      alert('Please fill in all customer details.')
      return
    }
    if (!cardInfo.cardNumber || !cardInfo.expiry || !cardInfo.cvv) {
      alert('Please fill in all card details.')
      return
    }
    
    // Simulate payment processing
    setPaymentStatus('processing')
    setTimeout(() => {
      setPaymentStatus('success')
      setTimeout(() => {
        alert(`Payment Successful!\nAmount: $${total}\nThank you, ${customerInfo.name}!`)
        clearCart()
        setShowPayment(false)
        setCustomerInfo({ name: '', email: '', phone: '', address: '' })
        setCardInfo({ cardNumber: '', expiry: '', cvv: '' })
        setPaymentStatus('')
      }, 1500)
    }, 2000)
  }

  const checkout = () => {
    setShowPayment(true)
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

      {/* Payment Modal */}
      {showPayment && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '10px',
              padding: '30px',
              maxWidth: '500px',
              width: '90%',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
          >
            <h2 style={{ marginBottom: '20px', color: '#2f4f4f' }}>Complete Your Payment</h2>
            <p style={{ marginBottom: '20px', fontSize: '1.1rem', fontWeight: 'bold' }}>
              Total Amount: <span style={{ color: '#d4af37' }}>${total.toFixed(2)}</span>
            </p>

            {paymentStatus === 'success' && (
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#d4edda', borderRadius: '8px', marginBottom: '20px' }}>
                <p style={{ color: '#155724', fontWeight: 'bold' }}>✓ Payment Successful!</p>
              </div>
            )}

            {paymentStatus !== 'success' && (
              <form onSubmit={processPayment}>
                {/* Customer Details Section */}
                <fieldset style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                  <legend style={{ fontWeight: 'bold', color: '#2f4f4f' }}>Shipping Details</legend>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleCustomerChange}
                      placeholder="Enter your full name"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleCustomerChange}
                      placeholder="Enter your email"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleCustomerChange}
                      placeholder="Enter your phone number"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleCustomerChange}
                      placeholder="Enter your shipping address"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </fieldset>

                {/* Payment Details Section */}
                <fieldset style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                  <legend style={{ fontWeight: 'bold', color: '#2f4f4f' }}>Payment Details</legend>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={cardInfo.cardNumber}
                      onChange={handleCardChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        boxSizing: 'border-box',
                        fontFamily: 'monospace'
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Expiry Date</label>
                      <input
                        type="text"
                        name="expiry"
                        value={cardInfo.expiry}
                        onChange={handleCardChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>CVV</label>
                      <input
                        type="password"
                        name="cvv"
                        value={cardInfo.cvv}
                        onChange={handleCardChange}
                        placeholder="123"
                        maxLength="4"
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>
                </fieldset>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setShowPayment(false)}
                    disabled={paymentStatus === 'processing'}
                    style={{
                      backgroundColor: '#999',
                      color: '#fff',
                      border: 'none',
                      padding: '12px 20px',
                      borderRadius: '5px',
                      cursor: paymentStatus === 'processing' ? 'not-allowed' : 'pointer',
                      opacity: paymentStatus === 'processing' ? 0.6 : 1
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={paymentStatus === 'processing'}
                    style={{
                      backgroundColor: paymentStatus === 'processing' ? '#ccc' : '#2f4f4f',
                      color: '#f4c430',
                      border: 'none',
                      padding: '12px 30px',
                      borderRadius: '5px',
                      cursor: paymentStatus === 'processing' ? 'not-allowed' : 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    {paymentStatus === 'processing' ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  )
}