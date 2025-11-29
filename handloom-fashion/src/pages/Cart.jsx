import React, { useState } from 'react'

export default function Cart({ cart, removeFromCart, clearCart }) {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })

  const [errors, setErrors] = useState({})

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Card number must be 16 digits'
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required'
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required'
    if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'CVV must be 3-4 digits'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePayment = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentSuccess(true)
      
      // Show success message and close modal after 2 seconds
      setTimeout(() => {
        setPaymentSuccess(false)
        setShowPaymentModal(false)
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          address: '',
          cardNumber: '',
          expiryDate: '',
          cvv: ''
        })
        clearCart()
      }, 2000)
    }, 2500)
  }

  const handleCloseModal = () => {
    if (!isProcessing) {
      setShowPaymentModal(false)
      setPaymentSuccess(false)
    }
  }

  const checkout = () => {
    setShowPaymentModal(true)
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
      {showPaymentModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '40px',
              maxWidth: '500px',
              width: '90%',
              boxShadow: '0 15px 50px rgba(0, 0, 0, 0.3)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            {paymentSuccess ? (
              <div style={{ textAlign: 'center', padding: '30px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>✓</div>
                <h2 style={{ color: '#27ae60', marginBottom: '15px' }}>Payment Successful!</h2>
                <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '10px' }}>
                  Thank you, {formData.fullName}!
                </p>
                <p style={{ fontSize: '1rem', color: '#777' }}>
                  Order confirmation has been sent to {formData.email}
                </p>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2f4f4f', marginTop: '20px' }}>
                  Total Amount: ${total.toFixed(2)}
                </p>
              </div>
            ) : (
              <>
                <h2 style={{ marginBottom: '10px', color: '#2f4f4f', textAlign: 'center' }}>
                  Complete Payment
                </h2>
                <p style={{ textAlign: 'center', marginBottom: '25px', color: '#777' }}>
                  Amount Due: <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#d4af37' }}>
                    ${total.toFixed(2)}
                  </span>
                </p>

                <form onSubmit={handlePayment}>
                  {/* Billing Information */}
                  <fieldset style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
                    <legend style={{ fontWeight: 'bold', color: '#2f4f4f', padding: '0 10px' }}>
                      Billing Information
                    </legend>

                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', fontWeight: '500', marginBottom: '5px', color: '#333' }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: errors.fullName ? '2px solid #e74c3c' : '1px solid #ddd',
                          borderRadius: '5px',
                          boxSizing: 'border-box',
                          fontSize: '1rem'
                        }}
                      />
                      {errors.fullName && <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '3px' }}>{errors.fullName}</p>}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', fontWeight: '500', marginBottom: '5px', color: '#333' }}>
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: errors.email ? '2px solid #e74c3c' : '1px solid #ddd',
                          borderRadius: '5px',
                          boxSizing: 'border-box',
                          fontSize: '1rem'
                        }}
                      />
                      {errors.email && <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '3px' }}>{errors.email}</p>}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', fontWeight: '500', marginBottom: '5px', color: '#333' }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: errors.phone ? '2px solid #e74c3c' : '1px solid #ddd',
                          borderRadius: '5px',
                          boxSizing: 'border-box',
                          fontSize: '1rem'
                        }}
                      />
                      {errors.phone && <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '3px' }}>{errors.phone}</p>}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', fontWeight: '500', marginBottom: '5px', color: '#333' }}>
                        Shipping Address
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your complete shipping address"
                        rows="3"
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: errors.address ? '2px solid #e74c3c' : '1px solid #ddd',
                          borderRadius: '5px',
                          boxSizing: 'border-box',
                          fontSize: '1rem',
                          fontFamily: 'Arial, sans-serif'
                        }}
                      />
                      {errors.address && <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '3px' }}>{errors.address}</p>}
                    </div>
                  </fieldset>

                  {/* Card Information */}
                  <fieldset style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
                    <legend style={{ fontWeight: 'bold', color: '#2f4f4f', padding: '0 10px' }}>
                      Card Details
                    </legend>

                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', fontWeight: '500', marginBottom: '5px', color: '#333' }}>
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: errors.cardNumber ? '2px solid #e74c3c' : '1px solid #ddd',
                          borderRadius: '5px',
                          boxSizing: 'border-box',
                          fontSize: '1rem',
                          fontFamily: 'monospace',
                          letterSpacing: '2px'
                        }}
                      />
                      {errors.cardNumber && <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '3px' }}>{errors.cardNumber}</p>}
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                      <div style={{ flex: 1, marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontWeight: '500', marginBottom: '5px', color: '#333' }}>
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: errors.expiryDate ? '2px solid #e74c3c' : '1px solid #ddd',
                            borderRadius: '5px',
                            boxSizing: 'border-box',
                            fontSize: '1rem'
                          }}
                        />
                        {errors.expiryDate && <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '3px' }}>{errors.expiryDate}</p>}
                      </div>
                      <div style={{ flex: 1, marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontWeight: '500', marginBottom: '5px', color: '#333' }}>
                          CVV
                        </label>
                        <input
                          type="password"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength="4"
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: errors.cvv ? '2px solid #e74c3c' : '1px solid #ddd',
                            borderRadius: '5px',
                            boxSizing: 'border-box',
                            fontSize: '1rem'
                          }}
                        />
                        {errors.cvv && <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '3px' }}>{errors.cvv}</p>}
                      </div>
                    </div>
                  </fieldset>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      disabled={isProcessing}
                      style={{
                        flex: 1,
                        padding: '12px 20px',
                        backgroundColor: '#95a5a6',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: isProcessing ? 'not-allowed' : 'pointer',
                        fontSize: '1rem',
                        fontWeight: '500',
                        opacity: isProcessing ? 0.6 : 1,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      style={{
                        flex: 1,
                        padding: '12px 20px',
                        backgroundColor: isProcessing ? '#bdc3c7' : '#27ae60',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: isProcessing ? 'not-allowed' : 'pointer',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        opacity: isProcessing ? 0.7 : 1,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}