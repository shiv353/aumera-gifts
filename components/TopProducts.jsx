"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function TopProducts() {
  const sectionRef = useRef(null);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/products?topRated=true&limit=8");
        if (!response.ok) throw new Error("Unable to load top products");
        const data = await response.json();
        setTopProducts(data.products);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  // Intersection observer for reveal animations (same behavior as Products.jsx)
  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".product-card");
    if (!cards?.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [topProducts]);

  return (
    <section className="section top-products-section" ref={sectionRef}>
      <div className="section-heading">
        <p className="eyebrow">Top rated selection</p>
        <h2>Highlighted gifts</h2>
        <p>
          Discover the highest-rated products from our collection, showcased here for quick inspiration and effortless gifting.
        </p>
      </div>

      {loading && (
        <div className="loader-shell">
          <div className="loader-ring" aria-label="Loading top rated products"></div>
        </div>
      )}

      {error && (
        <div className="loader-shell" style={{ color: "var(--rosy-brown)" }}>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="product-grid">
          {topProducts.map((product, index) => (
            <article
              className="product-card"
              style={{ "--reveal-delay": `${index * 70}ms` }}
              key={product._id}
            >
              <div className="product-image-wrap">
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  sizes="(max-width: 680px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="product-image"
                />
              </div>
              <div className="product-content product-content--spread">
                <div>
                  <h3>{product.title}</h3>
                  <p>{product.price}</p>
                </div>
                <span className="product-rating">{(product.rating ?? 0).toFixed(1)}★</span>
              </div>
            </article>
          ))}
          
        </div>
      )}
    </section>
  );
}
