import React, { useState } from 'react'

export default function Cart({ cart, removeFromCart, clearCart }) {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentStep, setPaymentStep] = useState('form') // 'form', 'processing', 'success'
  const [orderId, setOrderId] = useState(null)
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })

  const [errors, setErrors] = useState({})

  const total = cart.reduce((sum, item) => sum + item.price, 0)
  const tax = (total * 0.1).toFixed(2)
  const shipping = total > 50 ? 0 : 5
  const grandTotal = (parseFloat(total) + parseFloat(tax) + shipping).toFixed(2)

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
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Card must be 16 digits'
    if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required'
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required'
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required'
    if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'CVV must be 3-4 digits'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePayment = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setPaymentStep('processing')
    
    // Simulate payment processing with random order ID
    setTimeout(() => {
      const newOrderId = 'ORD-' + Date.now()
      setOrderId(newOrderId)
      setPaymentStep('success')
    }, 3000)
  }

  const handleCloseModal = () => {
    if (paymentStep !== 'processing') {
      if (paymentStep === 'success') {
        clearCart()
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          zipCode: '',
          cardNumber: '',
          cardName: '',
          expiryDate: '',
          cvv: ''
        })
        setPaymentStep('form')
      }
      setShowPaymentModal(false)
    }
  }

  const checkout = () => {
    setShowPaymentModal(true)
    setPaymentStep('form')
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
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '40px', maxWidth: '600px', width: '95%', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)', maxHeight: '90vh', overflowY: 'auto' }}>
            
            {paymentStep === 'success' ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '4rem', marginBottom: '20px', color: '#27ae60' }}>✓</div>
                <h2 style={{ color: '#27ae60', marginBottom: '15px' }}>Payment Successful!</h2>
                <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '20px' }}>Thank you, {formData.fullName}!</p>
                <div style={{ backgroundColor: '#ecf0f1', padding: '20px', borderRadius: '8px', marginBottom: '20px', textAlign: 'left' }}>
                  <p style={{ margin: '8px 0', color: '#2f4f4f' }}><strong>Order ID:</strong> {orderId}</p>
                  <p style={{ margin: '8px 0', color: '#2f4f4f' }}><strong>Email:</strong> {formData.email}</p>
                  <p style={{ margin: '8px 0', color: '#2f4f4f' }}><strong>Total Paid:</strong> ${grandTotal}</p>
                  <p style={{ margin: '8px 0', color: '#2f4f4f' }}><strong>Delivery Address:</strong> {formData.address}, {formData.city} - {formData.zipCode}</p>
                </div>
                <p style={{ color: '#666', marginBottom: '20px' }}>A confirmation email has been sent to {formData.email}</p>
                <button onClick={handleCloseModal} style={{ backgroundColor: '#27ae60', color: '#fff', border: 'none', padding: '12px 30px', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}>
                  Done
                </button>
              </div>
            ) : (
              <>
                <h2 style={{ marginBottom: '5px', color: '#2f4f4f', textAlign: 'center' }}>Checkout</h2>
                <p style={{ textAlign: 'center', color: '#888', marginBottom: '25px' }}>Complete your order securely</p>

                {/* Order Summary */}
                <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '25px' }}>
                  <h3 style={{ marginTop: 0, marginBottom: '10px', color: '#2f4f4f' }}>Order Summary</h3>
                  <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '10px' }}>
                    {cart.map((item, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', color: '#555' }}>
                        <span>{item.name}</span>
                        <span>${item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#666' }}>
                    <span>Subtotal:</span>
                    <span>${total}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#666' }}>
                    <span>Tax (10%):</span>
                    <span>${tax}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#666' }}>
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? 'FREE' : '$' + shipping}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #2f4f4f', paddingTop: '10px', fontSize: '1.1rem', fontWeight: 'bold', color: '#2f4f4f' }}>
                    <span>Total:</span>
                    <span>${grandTotal}</span>
                  </div>
                </div>

                <form onSubmit={handlePayment}>
                  {/* Shipping Information */}
                  <fieldset style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
                    <legend style={{ fontWeight: 'bold', color: '#2f4f4f', padding: '0 10px' }}>Shipping Address</legend>
                    
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px', color: '#333' }}>Full Name *</label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="John Doe" style={{ width: '100%', padding: '10px', border: errors.fullName ? '2px solid #e74c3c' : '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }} />
                      {errors.fullName && <p style={{ color: '#e74c3c', fontSize: '0.85rem', margin: '3px 0 0' }}>{errors.fullName}</p>}
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px', color: '#333' }}>Email *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" style={{ width: '100%', padding: '10px', border: errors.email ? '2px solid #e74c3c' : '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }} />
                      {errors.email && <p style={{ color: '#e74c3c', fontSize: '0.85rem', margin: '3px 0 0' }}>{errors.email}</p>}
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px', color: '#333' }}>Phone *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 234 567 8900" style={{ width: '100%', padding: '10px', border: errors.phone ? '2px solid #e74c3c' : '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }} />
                      {errors.phone && <p style={{ color: '#e74c3c', fontSize: '0.85rem', margin: '3px 0 0' }}>{errors.phone}</p>}
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px', color: '#333' }}>Address *</label>
                      <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="123 Main Street" style={{ width: '100%', padding: '10px', border: errors.address ? '2px solid #e74c3c' : '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }} />
                      {errors.address && <p style={{ color: '#e74c3c', fontSize: '0.85rem', margin: '3px 0 0' }}>{errors.address}</p>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px', color: '#333' }}>City *</label>
                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="New York" style={{ width: '100%', padding: '10px', border: errors.city ? '2px solid #e74c3c' : '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }} />
                        {errors.city && <p style={{ color: '#e74c3c', fontSize: '0.85rem', margin: '3px 0 0' }}>{errors.city}</p>}
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px', color: '#333' }}>ZIP Code *</label>
                        <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="10001" style={{ width: '100%', padding: '10px', border: errors.zipCode ? '2px solid #e74c3c' : '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }} />
                        {errors.zipCode && <p style={{ color: '#e74c3c', fontSize: '0.85rem', margin: '3px 0 0' }}>{errors.zipCode}</p>}
                      </div>
                    </div>
                  </fieldset>

                  {/* Payment Information */}
                  <fieldset style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
                    <legend style={{ fontWeight: 'bold', color: '#2f4f4f', padding: '0 10px' }}>Payment Details</legend>
                    
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px', color: '#333' }}>Cardholder Name *</label>
                      <input type="text" name="cardName" value={formData.cardName} onChange={handleInputChange} placeholder="John Doe" style={{ width: '100%', padding: '10px', border: errors.cardName ? '2px solid #e74c3c' : '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }} />
                      {errors.cardName && <p style={{ color: '#e74c3c', fontSize: '0.85rem', margin: '3px 0 0' }}>{errors.cardName}</p>}
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px', color: '#333' }}>Card Number *</label>
                      <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="1234 5678 9012 3456" maxLength="19" style={{ width: '100%', padding: '10px', border: errors.cardNumber ? '2px solid #e74c3c' : '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box', fontFamily: 'monospace' }} />
                      {errors.cardNumber && <p style={{ color: '#e74c3c', fontSize: '0.85rem', margin: '3px 0 0' }}>{errors.cardNumber}</p>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px', color: '#333' }}>Expiry Date (MM/YY) *</label>
                        <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} placeholder="12/25" maxLength="5" style={{ width: '100%', padding: '10px', border: errors.expiryDate ? '2px solid #e74c3c' : '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }} />
                        {errors.expiryDate && <p style={{ color: '#e74c3c', fontSize: '0.85rem', margin: '3px 0 0' }}>{errors.expiryDate}</p>}
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px', color: '#333' }}>CVV *</label>
                        <input type="password" name="cvv" value={formData.cvv} onChange={handleInputChange} placeholder="123" maxLength="4" style={{ width: '100%', padding: '10px', border: errors.cvv ? '2px solid #e74c3c' : '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }} />
                        {errors.cvv && <p style={{ color: '#e74c3c', fontSize: '0.85rem', margin: '3px 0 0' }}>{errors.cvv}</p>}
                      </div>
                    </div>
                  </fieldset>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="button" onClick={handleCloseModal} disabled={paymentStep === 'processing'} style={{ flex: 1, padding: '12px', backgroundColor: '#95a5a6', color: '#fff', border: 'none', borderRadius: '6px', cursor: paymentStep === 'processing' ? 'not-allowed' : 'pointer', fontWeight: 'bold', opacity: paymentStep === 'processing' ? 0.6 : 1 }}>
                      Cancel
                    </button>
                    <button type="submit" disabled={paymentStep === 'processing'} style={{ flex: 1, padding: '12px', backgroundColor: paymentStep === 'processing' ? '#bdc3c7' : '#27ae60', color: '#fff', border: 'none', borderRadius: '6px', cursor: paymentStep === 'processing' ? 'not-allowed' : 'pointer', fontWeight: 'bold', opacity: paymentStep === 'processing' ? 0.7 : 1 }}>
                      {paymentStep === 'processing' ? 'Processing...' : `Pay $${grandTotal}`}
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