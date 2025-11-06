import React, { useState } from 'react'
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = e => {
    e.preventDefault()
    alert(`Thank you, ${form.name}! We'll reach out at ${form.email} soon.`)
    setForm({ name: '', email: '', message: '' })
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
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          width: '100%',
          maxWidth: '400px',
          margin: '0 auto',
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}
      >
        <label style={{ alignSelf: 'flex-start', fontWeight: '500', color: '#2f4f4f' }}>
          Name
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
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
          rows="5"
          value={form.message}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            resize: 'none'
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#2f4f4f',
            color: '#f4c430',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Send
        </button>
      </form>
    </section>
  )
}