"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductDetails({ product }) {
  const images = product.images && product.images.length ? product.images : [product.coverImage];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (activeIndex >= images.length) {
      setActiveIndex(0);
    }
  }, [images.length, activeIndex]);

  const showImage = (index) => {
    if (index === activeIndex || isTransitioning) return;
    setIsTransitioning(true);
    window.setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 180);
  };

  const handlePrevious = () => {
    const nextIndex = (activeIndex - 1 + images.length) % images.length;
    showImage(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % images.length;
    showImage(nextIndex);
  };

  return (
    <>
     <div className="product-detail-header">
        <button type="button" className="back-button" onClick={() => router.back()}>
          <ArrowLeft size={18} /> Back
        </button>
      </div>
    <section className="section product-detail-section">
     
      <div className="product-detail-grid">
        <div className="product-detail-left">
          <div className={`product-main-image ${isTransitioning ? "is-transitioning" : ""}`}>
            <Image
              src={images[activeIndex]}
              alt={product.alt}
              width={800}
              height={800}
              className="product-image"
            />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="image-nav-button image-nav-button--left"
                  onClick={handlePrevious}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  className="image-nav-button image-nav-button--right"
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </div>

          <div className="product-thumbnails">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                className={`thumb-button ${i === activeIndex ? "active" : ""}`}
                onClick={() => showImage(i)}
                aria-label={`View image ${i + 1}`}
              >
                <Image src={img} alt={`${product.title} ${i + 1}`} width={75} height={75} className="thumb-image" />
              </button>
            ))}
          </div>
        </div>

        <div className="product-detail-right">
          <div className="product-detail-copy">
            <p className="eyebrow">Product details</p>
            <h1>{product.title}</h1>
            <div className="product-detail-meta-row">
              <span className="product-price">{product.price}</span>
              <span className="product-rating">{(product.rating ?? 0).toFixed(1)}★</span>
            </div>
            <p className="product-category">Category: {product.category}</p>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description || "No description available."}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
