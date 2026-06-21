"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const DEFAULT_PAGE_SIZE = 12;
const SMALL_SCREEN_PAGE_SIZE = 6;
const SMALL_SCREEN_BREAKPOINT = 760; // px

export default function Products() {
  const sectionRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async (pageNumber, limit = pageSize) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/products?page=${pageNumber}&limit=${limit}`);
      if (!response.ok) throw new Error("Failed to load products");
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  // set page size based on viewport width and re-fetch when it changes
  useEffect(() => {
    const setSize = () => {
      const isSmall = window.innerWidth <= SMALL_SCREEN_BREAKPOINT;
      setPageSize(isSmall ? SMALL_SCREEN_PAGE_SIZE : DEFAULT_PAGE_SIZE);
    };

    setSize();
    const onResize = () => {
      const isSmall = window.innerWidth <= SMALL_SCREEN_BREAKPOINT;
      const newSize = isSmall ? SMALL_SCREEN_PAGE_SIZE : DEFAULT_PAGE_SIZE;
      setPageSize((current) => {
        if (current === newSize) return current;
        // reset to first page when page size changes
        setPage(1);
        // fetch new page with updated limit
        fetchProducts(1, newSize);
        return newSize;
      });
    };

    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

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
  }, [products]);

  const handlePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <section id="products" className="section products-section" ref={sectionRef}>
      <div className="section-heading">
        <p className="eyebrow">Curated collection</p>
        <h2>All Products</h2>
        <p>Browse our full range of premium gifts with thoughtful curation, refined packaging, and top-rated selections.</p>
      </div>

      {loading && (
        <div className="loader-shell">
          <div className="loader-ring" aria-label="Loading products"></div>
        </div>
      )}

      {error && (
        <div className="loader-shell" style={{ color: "var(--rosy-brown)" }}>
          <p>Error: {error}</p>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="loader-shell">
          <p>No products available.</p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <>
          <div className="product-grid">
            {products.map((product, index) => (
              <article
                className="product-card"
                style={{ "--reveal-delay": `${index * 70}ms` }}
                key={product._id}
              >
                <Link href={`/products/${product._id}`} className="product-link">
                  <div className="product-image-wrap">
                    <Image
                      src={product.coverImage}
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
                </Link>
              </article>
            ))}
          </div>

          <div className="pagination-bar">
            <button type="button" className="pagination-button" onClick={() => handlePage(page - 1)} disabled={page <= 1}>
              Previous
            </button>
            <span className="pagination-info">
              Page {page} of {totalPages}
            </span>
            <button type="button" className="pagination-button" onClick={() => handlePage(page + 1)} disabled={page >= totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}
