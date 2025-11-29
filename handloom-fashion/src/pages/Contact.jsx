import React, { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', 'bot-field': '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const encode = data =>
    Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')

    // Honeypot check
    if (form['bot-field']) return

    // Basic validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in all required fields.')
      return
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Please enter a valid email address.')
      return
    }

    setSubmitting(true)

    try {
      // Submit to Netlify Forms (works on Netlify-hosted site)
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...form })
      })

      if (response.ok) {
        setSuccess(true)
        setForm({ name: '', email: '', message: '', 'bot-field': '' })
      } else {
        setError('Submission failed — please try again later.')
      }
    } catch (err) {
      setError('Submission failed — please check your connection and try again.')
    }

    setSubmitting(false)
  }

  return (
    <section
      className="contact"
      style={{
        textAlign: 'center',
        padding: '60px 20px',
        backgroundColor: '#fafafa',
        minHeight: '80vh'
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '30px', color: '#2f4f4f' }}>
        Contact Us
      </h1>

      <form
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          width: '100%',
          maxWidth: '480px',
          margin: '0 auto',
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}
      >
        {/* Netlify required hidden input */}
        <input type="hidden" name="form-name" value="contact" />

        {/* Honeypot field (invisible to users) */}
        <input
          type="text"
          name="bot-field"
          value={form['bot-field']}
          onChange={handleChange}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />

        {success ? (
          <div style={{ padding: '20px' }}>
            <h2 style={{ color: '#27ae60' }}>Thanks — we received your message!</h2>
            <p style={{ color: '#555' }}>We'll reach out to you at the email address you provided.</p>
          </div>
        ) : (
          <>
            <label style={{ alignSelf: 'flex-start', fontWeight: '500', color: '#2f4f4f' }}>
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc'
              }}
            />

            <label style={{ alignSelf: 'flex-start', fontWeight: '500', color: '#2f4f4f' }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc'
              }}
            />

            <label style={{ alignSelf: 'flex-start', fontWeight: '500', color: '#2f4f4f' }}>
              Message
            </label>
            <textarea
              name="message"
              rows="6"
              value={form.message}
              onChange={handleChange}
              required
              placeholder="Write your message here"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                resize: 'vertical'
              }}
            />

            {error && <p style={{ color: '#e74c3c', margin: 0 }}>{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              style={{
                backgroundColor: submitting ? '#9aa5a6' : '#2f4f4f',
                color: '#f4c430',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                fontWeight: 'bold',
                cursor: submitting ? 'not-allowed' : 'pointer',
                marginTop: '10px'
              }}
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </>
        )}
      </form>
    </section>
  )
}