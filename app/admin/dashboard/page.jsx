"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(null);
  const [savingId, setSavingId] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    document.body.classList.add("admin-page");
    return () => document.body.classList.remove("admin-page");
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [products.length]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch("/api/products?limit=100");
        if (!response.ok) throw new Error("Failed to load products");
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    if (!normalizedQuery) {
      return products;
    }

    return products.filter((product) => {
      const values = [
        product.title,
        product.price,
        product.category,
        product.alt,
        product.description,
        product.coverImage,
        (product.images || []).join(" ")
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return values.includes(normalizedQuery);
    });
  }, [products, searchTerm]);

  const totalPages = Math.max(Math.ceil(filteredProducts.length / itemsPerPage), 1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setDraft({
      title: product.title || "",
      price: product.price || "",
      coverImage: product.coverImage || "",
      images: (product.images || []).join(", "),
      alt: product.alt || "",
      description: product.description || "",
      category: product.category || "",
      rating: product.rating ?? 4.5
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft(null);
  };

  const updateDraft = (field, value) => {
    setDraft((current) => (current ? { ...current, [field]: value } : current));
  };

  const saveProduct = async (productId) => {
    if (!draft) return;

    try {
      setSavingId(productId);
      const response = await fetch(`/api/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...draft,
          images: draft.images
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean)
        })
      });

      if (!response.ok) throw new Error("Failed to save product");

      const updatedProduct = await response.json();
      setProducts((current) => current.map((item) => (item._id === productId ? updatedProduct : item)));
      setEditingId(null);
      setDraft(null);
    } catch (err) {
      setError(err.message || "Could not save product");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="admin-dashboard-shell">
      <header className="site-header admin-site-header">
        <nav className="navbar" aria-label="Admin navigation">
          <Link className="brand-lockup" href="/admin/dashboard">
            <span className="brand-mark" aria-hidden="true">
              AG
            </span>
            <span className="brand-text">Aumera Admin</span>
          </Link>

          <div className="nav-links">
            <Link className="nav-link nav-link--active" href="/admin/dashboard">
              Products
            </Link>
            <Link className="nav-link" href="#">
              Orders
            </Link>
            <Link className="nav-link" href="#">
              Customers
            </Link>
          </div>
        </nav>
      </header>


      <main className="admin-content">
        <header className="admin-content__header">
          <div className="admin-content__title">
            <p className="eyebrow">Management</p>
            <h1>Products</h1>
          </div>

          <label className="admin-content__search">
            {/* <span className="sr-only">Search products</span> */}
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Search products"
            />
          </label>

          <div className="admin-content__meta">{products.length} items</div>
        </header>

        {loading && (
          <div className="admin-state">
            <div className="loader-ring" aria-label="Loading products"></div>
          </div>
        )}

        {!loading && error && <div className="admin-state admin-state--error">{error}</div>}

        {!loading && !error && products.length === 0 && (
          <div className="admin-state">No products available yet.</div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Actions</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Cover Image</th>
                  <th>Images</th>
                  <th>Alt</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {visibleProducts.map((product) => {
                  const isEditing = editingId === product._id;

                  return (
                    <tr key={product._id}>
                      <td>
                        {isEditing ? (
                          <div className="admin-table__actions">
                            <button type="button" className="admin-table__action admin-table__action--save" onClick={() => saveProduct(product._id)} disabled={savingId === product._id}>
                              {savingId === product._id ? "Saving..." : "Save"}
                            </button>
                            <button type="button" className="admin-table__action" onClick={cancelEdit}>
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button type="button" className="admin-table__action" onClick={() => startEdit(product)}>
                            Edit
                          </button>
                        )}
                      </td>
                      <td>
                        <div className="admin-table__thumb">
                          <Image src={product.coverImage} alt={product.alt} fill sizes="48px" />
                        </div>
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            className="admin-table__input"
                            value={draft?.title || ""}
                            onChange={(event) => updateDraft("title", event.target.value)}
                          />
                        ) : (
                          product.title
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            className="admin-table__input"
                            value={draft?.price || ""}
                            onChange={(event) => updateDraft("price", event.target.value)}
                          />
                        ) : (
                          product.price
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            className="admin-table__input"
                            value={draft?.coverImage || ""}
                            onChange={(event) => updateDraft("coverImage", event.target.value)}
                          />
                        ) : (
                          <span className="admin-table__url">{product.coverImage}</span>
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <textarea
                            className="admin-table__textarea"
                            value={draft?.images || ""}
                            onChange={(event) => updateDraft("images", event.target.value)}
                          />
                        ) : (
                          <span className="admin-table__stack">
                            {(product.images || []).map((image, index) => (
                              <span key={`${product._id}-${index}`} className="admin-table__pill">
                                {image}
                              </span>
                            ))}
                          </span>
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            className="admin-table__input"
                            value={draft?.alt || ""}
                            onChange={(event) => updateDraft("alt", event.target.value)}
                          />
                        ) : (
                          product.alt
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <textarea
                            className="admin-table__textarea"
                            value={draft?.description || ""}
                            onChange={(event) => updateDraft("description", event.target.value)}
                          />
                        ) : (
                          <span className="admin-table__description">{product.description || "No description added yet."}</span>
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            className="admin-table__input"
                            value={draft?.category || ""}
                            onChange={(event) => updateDraft("category", event.target.value)}
                          />
                        ) : (
                          product.category || "Gift Sets"
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            className="admin-table__input"
                            type="number"
                            step="0.1"
                            value={draft?.rating || ""}
                            onChange={(event) => updateDraft("rating", event.target.value)}
                          />
                        ) : (
                          `${(product.rating ?? 0).toFixed(1)}★`
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="admin-pagination">
            <button type="button" className="admin-pagination__button" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            <span className="admin-pagination__info">
              Page {currentPage} of {totalPages}
            </span>
            <button type="button" className="admin-pagination__button" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
