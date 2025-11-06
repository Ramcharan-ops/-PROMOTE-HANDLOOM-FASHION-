import React, { useState, useEffect } from 'react'

export default function Slideshow({ images = [] }) {
  const placeholder = 'https://via.placeholder.com/800x300?text=Slide'
  const safeImages = (images && images.length) ? images : [placeholder]

  const [index, setIndex] = useState(0)
  const next = () => setIndex((i) => (i + 1) % safeImages.length)
  const prev = () => setIndex((i) => (i - 1 + safeImages.length) % safeImages.length)

  useEffect(() => {
    // Reset index when image list changes
    setIndex(0)
  }, [images])

  useEffect(() => {
    // Single interval controlled by images length
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [safeImages.length])

  const handleError = (e) => {
    e.target.onerror = null
    e.target.src = placeholder
  }

  return (
    <div className="slideshow">
      <img src={safeImages[index]} alt={`Slide ${index + 1}`} className="slide" onError={handleError} />
      <button className="prev" onClick={prev}>&#10094;</button>
      <button className="next" onClick={next}>&#10095;</button>
    </div>
  )
}