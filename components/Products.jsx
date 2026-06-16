"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { products } from "@/data/siteContent";

export default function Products() {
  const sectionRef = useRef(null);

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
  }, []);

  return (
    <section id="products" className="section products-section" ref={sectionRef}>
      <div className="section-heading">
        <p className="eyebrow">Curated collection</p>
        <h2>Our Products</h2>
        <p>
          Replace these placeholders with your final products, photography, pricing,
          and gifting categories whenever the catalog is ready.
        </p>
      </div>

      <div className="product-grid">
        {products.map((product, index) => (
          <article
            className="product-card"
            style={{ "--reveal-delay": `${index * 70}ms` }}
            key={product.title}
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
            <div className="product-content">
              <h3>{product.title}</h3>
              <p>{product.price}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
