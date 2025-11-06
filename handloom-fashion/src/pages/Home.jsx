import React from 'react'
export default function Home() {
  return (
    <section
      className="home"
      style={{
        textAlign: 'center',
        padding: '60px 20px',
        minHeight: '100vh',
        backgroundImage: `url('https://images.unsplash.com/photo-1624378439575-d8705ad97368?auto=format&fit=crop&w=1400&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: '#fff',
        position: 'relative'
      }}
    >
      {/* 🔳 Dark overlay for readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 0
        }}
      ></div>
      {/* 🌸 Main content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px', fontWeight: 'bold' }}>
          Welcome to <span style={{ color: '#f4c430' }}>Handloom Fashion</span>
        </h1>
        <p
          style={{
            fontSize: '1.2rem',
            maxWidth: '700px',
            margin: '0 auto 50px',
            lineHeight: '1.6'
          }}
        >
          Discover the beauty of handcrafted fabrics woven with passion and precision.  
          We connect skilled artisans with global buyers to promote sustainable, ethical fashion.
        </p>
        {/* 🧵 Product Image Grid */}
        <div
          className="image-gallery"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '25px',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 20px'
          }}
        >
          {/* Product 1 */}
          <div className="image-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 6px 12px rgba(0,0,0,0.2)', backgroundColor: '#fff', color: '#000' }}>
            <img src="https://yuvavik.com/wp-content/uploads/2024/10/chettinad-cotton-green-dark-green-1-scaled.jpg" alt="Cotton Saree" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block', background: '#eee' }} />
            <h3 style={{ margin: '12px 0', color: '#2f4f4f' }}>Elegant Cotton Saree</h3>
          </div>
          {/* Product 2 */}
          <div className="image-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 6px 12px rgba(0,0,0,0.2)', backgroundColor: '#fff', color: '#000' }}>
            <img src="https://images.squarespace-cdn.com/content/v1/621d33b027d0fd103c981dd3/22ea4bf4-44c7-4fe7-b7f3-f020b57b34c8/Handwoven+and+Hand+Dyed+Silk+Scarf%2C+Neal+Howard%2C+Waynesville+NC-19.JPG?format=1500w" alt="Silk Scarf" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block', background: '#eee' }} />
            <h3 style={{ margin: '12px 0', color: '#2f4f4f' }}>Handwoven Silk Scarf</h3>
          </div>
          {/* Product 3 */}
          <div className="image-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 6px 12px rgba(0,0,0,0.2)', backgroundColor: '#fff', color: '#000' }}>
            <img src="https://5.imimg.com/data5/SELLER/Default/2025/8/534771519/ZP/OT/DR/235777230/ladies-woolen-shawl.jpg" alt="Woolen Shawl" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block', background: '#eee' }} />
            <h3 style={{ margin: '12px 0', color: '#2f4f4f' }}>Woolen Shawl Collection</h3>
          </div>
          {/* Product 4 */}
          <div className="image-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 6px 12px rgba(0,0,0,0.2)', backgroundColor: '#fff', color: '#000' }}>
            <img src="https://clothsvilla.com/cdn/shop/articles/blue-polyester-viscose-chanderi-saree-with-kalamkari-print-zari-weaving_1_885x610.jpg?v=1756979168" alt="Handloom Craft" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block', background: '#eee' }} />
            <h3 style={{ margin: '12px 0', color: '#2f4f4f' }}>Traditional Handloom Craft</h3>
          </div>
         {/* Product 5 */}
          <div className="image-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 6px 12px rgba(0,0,0,0.2)', backgroundColor: '#fff', color: '#000' }}>
            <img src="https://anyaonline.in/cdn/shop/collections/Bridal-Kanchi-Silk-Sarees_1400x.jpg" alt="Weeding Collections" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block', background: '#eee' }} />
            <h3 style={{ margin: '12px 0', color: '#2f4f4f' }}>Wedding Collections</h3>
          </div>
 {/* Product 6 */}
          <div className="image-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 6px 12px rgba(0,0,0,0.2)', backgroundColor: '#fff', color: '#000' }}>
            <img src="https://m.media-amazon.com/images/I/517rGluWMuL._AC_UY1100_.jpg" alt="Weeding Collections" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block', background: '#eee' }} />
            <h3 style={{ margin: '12px 0', color: '#2f4f4f' }}>Pattu Saree</h3>
          </div>
          {/* Product 7 */}
          <div className="image-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 6px 12px rgba(0,0,0,0.2)', backgroundColor: '#fff', color: '#000' }}>
            <img src="https://www.karagiri.com/cdn/shop/files/KINKHAB-1205-1.jpg?v=1711452218" alt="Weeding Collections" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block', background: '#eee' }} />
            <h3 style={{ margin: '12px 0', color: '#2f4f4f' }}>Banarasi Silk Saree</h3>
          </div>
          {/* Product 8 */}
          <div className="image-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 6px 12px rgba(0,0,0,0.2)', backgroundColor: '#fff', color: '#000' }}>
            <img src="https://5.imimg.com/data5/SELLER/Default/2022/7/UP/VD/LE/153122262/whatsapp-image-2022-07-06-at-11-54-49-am-1-.jpeg" alt="Weeding Collections" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block', background: '#eee' }} />
            <h3 style={{ margin: '12px 0', color: '#2f4f4f' }}>Wedding Kanjivaram Saree</h3>
          </div>
          {/* Product 9 */}
          <div className="image-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 6px 12px rgba(0,0,0,0.2)', backgroundColor: '#fff', color: '#000' }}>
            <img src="https://hanfihandicraft.com/cdn/shop/files/393549925_287834970880575_7422002219366973030_n_600x800.jpg?v=1717524122" alt="Weeding Collections" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block', background: '#eee' }} />
            <h3 style={{ margin: '12px 0', color: '#2f4f4f' }}>Tissue Saree</h3>
          </div>
          {/* Product 10 */}
          <div className="image-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 6px 12px rgba(0,0,0,0.2)', backgroundColor: '#fff', color: '#000' }}>
            <img src="https://chhavi.eoontech.com/wp-content/uploads/2023/08/01-06-2023-BNY_750-scaled.jpg" alt="Weeding Collections" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block', background: '#eee' }} />
            <h3 style={{ margin: '12px 0', color: '#2f4f4f' }}>Indo Western Saree</h3>
          </div>
        </div>
        <p style={{ marginTop: '50px', fontSize: '1.1rem', fontWeight: '500' }}>
          🌍 Empowering artisans and promoting heritage — one weave at a time.
        </p>
      </div>
    </section>
  )
}