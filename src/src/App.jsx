import { useState, useEffect, useContext, createContext, useReducer, useCallback } from "react";

// ── THEME CONTEXT ──────────────────────────────────────────────────────────
const ThemeContext = createContext();
const CartContext = createContext();

// ── MOCK DATA ──────────────────────────────────────────────────────────────
const PRODUCTS = {
  Electronics: [
    { id: "e1", name: "ProAir Wireless Earbuds", price: 79.99, rating: 4.7, reviews: 2341, badge: "Best Seller", emoji: "🎧", desc: "32hr battery · ANC · IPX5" },
    { id: "e2", name: "UltraSlim Laptop 14\"", price: 999.99, rating: 4.5, reviews: 891, badge: "Top Rated", emoji: "💻", desc: "M-class chip · 16GB · 512GB SSD" },
    { id: "e3", name: "SmartWatch Series X", price: 249.99, rating: 4.6, reviews: 3102, badge: "New", emoji: "⌚", desc: "Health tracking · GPS · 7-day battery" },
    { id: "e4", name: "4K Action Camera", price: 199.99, rating: 4.4, reviews: 567, badge: null, emoji: "📷", desc: "4K60fps · Waterproof · Wide-angle" },
    { id: "e5", name: "Mechanical Keyboard TKL", price: 129.99, rating: 4.8, reviews: 1230, badge: "Staff Pick", emoji: "⌨️", desc: "RGB · Tactile switches · PBT caps" },
    { id: "e6", name: "Portable SSD 2TB", price: 89.99, rating: 4.9, reviews: 4521, badge: "Deal", emoji: "💾", desc: "1050MB/s · USB-C · Shock resistant" },
  ],
  Fashion: [
    { id: "f1", name: "Merino Wool Crewneck", price: 89.99, rating: 4.6, reviews: 1102, badge: "Eco", emoji: "🧥", desc: "100% Merino · 12 colors · Slim fit" },
    { id: "f2", name: "Leather Derby Shoes", price: 159.99, rating: 4.5, reviews: 443, badge: null, emoji: "👞", desc: "Full-grain leather · Goodyear welt" },
    { id: "f3", name: "Canvas Tote Bag", price: 34.99, rating: 4.7, reviews: 2891, badge: "Trending", emoji: "👜", desc: "Organic cotton · 15\" laptop fits" },
    { id: "f4", name: "Slim Chino Pants", price: 59.99, rating: 4.4, reviews: 782, badge: null, emoji: "👖", desc: "Stretch fabric · 6 colors" },
    { id: "f5", name: "Minimalist Watch", price: 129.99, rating: 4.8, reviews: 1567, badge: "Editor's Choice", emoji: "🕐", desc: "36mm · Sapphire crystal · 5ATM" },
    { id: "f6", name: "Running Sneakers", price: 119.99, rating: 4.6, reviews: 3210, badge: "Best Seller", emoji: "👟", desc: "React foam · Breathable mesh" },
  ],
  Gaming: [
    { id: "g1", name: "Pro Gaming Headset", price: 99.99, rating: 4.7, reviews: 5432, badge: "Best Seller", emoji: "🎮", desc: "7.1 surround · RGB · Noise-cancelling mic" },
    { id: "g2", name: "Gaming Chair Omega", price: 349.99, rating: 4.5, reviews: 1023, badge: null, emoji: "🪑", desc: "Lumbar support · 4D armrests · PU leather" },
    { id: "g3", name: "Mechanical Gaming KB", price: 149.99, rating: 4.8, reviews: 2341, badge: "Top Rated", emoji: "⌨️", desc: "Cherry MX Red · Per-key RGB · Macro keys" },
    { id: "g4", name: "FPS Gaming Mouse", price: 69.99, rating: 4.9, reviews: 7823, badge: "Pro Pick", emoji: "🖱️", desc: "25600 DPI · 6 buttons · Ultra-light 59g" },
    { id: "g5", name: "27\" 165Hz Monitor", price: 399.99, rating: 4.6, reviews: 890, badge: "New", emoji: "🖥️", desc: "QHD IPS · G-Sync · 1ms response" },
    { id: "g6", name: "Controller Elite V3", price: 189.99, rating: 4.7, reviews: 3456, badge: null, emoji: "🕹️", desc: "Adjustable triggers · Rubberized grips · 40hr" },
  ],
  Luxury: [
    { id: "l1", name: "Cashmere Scarf", price: 199.99, rating: 4.9, reviews: 312, badge: "Premium", emoji: "🧣", desc: "100% Mongolian cashmere · 180cm" },
    { id: "l2", name: "Leather Wallet Bifold", price: 149.99, rating: 4.8, reviews: 892, badge: "Artisan", emoji: "👛", desc: "Full-grain Horween leather · RFID" },
    { id: "l3", name: "Crystal Whisky Set", price: 299.99, rating: 4.7, reviews: 234, badge: "Gift Ready", emoji: "🥃", desc: "Lead-free crystal · 6 glasses + decanter" },
    { id: "l4", name: "Silk Pillowcase Set", price: 89.99, rating: 4.6, reviews: 1230, badge: null, emoji: "🛏️", desc: "22 momme · 100% Mulberry silk" },
    { id: "l5", name: "Fountain Pen Gold", price: 249.99, rating: 4.9, reviews: 178, badge: "Collector's", emoji: "✒️", desc: "18K gold nib · Rhodium trim · Converter" },
    { id: "l6", name: "Leather Weekender Bag", price: 399.99, rating: 4.8, reviews: 567, badge: "Limited", emoji: "🧳", desc: "Full-grain leather · YKK zippers · Dustbag" },
  ],
  "Fun Items": [
    { id: "fi1", name: "Lego Architecture Set", price: 79.99, rating: 4.9, reviews: 4321, badge: "Fan Fav", emoji: "🏗️", desc: "1500 pieces · NYC skyline · Display base" },
    { id: "fi2", name: "Glow Star Projector", price: 44.99, rating: 4.6, reviews: 2103, badge: "Trending", emoji: "✨", desc: "360° rotation · 8 color modes · Timer" },
    { id: "fi3", name: "Cocktail Making Kit", price: 59.99, rating: 4.7, reviews: 1234, badge: null, emoji: "🍸", desc: "12-piece bar set · Recipe book" },
    { id: "fi4", name: "Neon Sign Customizer", price: 89.99, rating: 4.5, reviews: 678, badge: "Unique", emoji: "💡", desc: "LED neon · USB powered · Wall mount" },
    { id: "fi5", name: "Mini Polaroid Camera", price: 69.99, rating: 4.8, reviews: 3456, badge: "Best Seller", emoji: "📸", desc: "Instant print · 10 shots pack · 5 filters" },
    { id: "fi6", name: "Desk Zen Garden", price: 29.99, rating: 4.7, reviews: 891, badge: null, emoji: "🪨", desc: "Bamboo tray · 5 rakes · Sand & stones" },
  ],
};

const CATEGORIES = ["Electronics", "Fashion", "Gaming", "Luxury", "Fun Items"];
const CATEGORY_ICONS = { Electronics: "⚡", Fashion: "👗", Gaming: "🎮", Luxury: "💎", "Fun Items": "🎉" };

// ── CART REDUCER ───────────────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const ex = state.find(i => i.id === action.item.id);
      if (ex) return state.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...state, { ...action.item, qty: 1 }];
    }
    case "REMOVE": return state.filter(i => i.id !== action.id);
    case "INC": return state.map(i => i.id === action.id ? { ...i, qty: i.qty + 1 } : i);
    case "DEC": return state.map(i => i.id === action.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i);
    case "CLEAR": return [];
    default: return state;
  }
}

// ── SIMULATION BANNER ──────────────────────────────────────────────────────
function SimBanner() {
  return (
    <div style={{
      background: "linear-gradient(90deg, #f59e0b, #ef4444)",
      color: "#fff",
      textAlign: "center",
      padding: "6px 12px",
      fontSize: "11px",
      fontWeight: 700,
      letterSpacing: "0.5px",
    }}>
      ⚠️ SIMULATION ONLY — No real products, payments, or shipping. For entertainment purposes only.
    </div>
  );
}

// ── NAVBAR ─────────────────────────────────────────────────────────────────
function Navbar({ page, setPage, cartCount, dark, setDark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav style={{
      background: dark ? "#0f172a" : "#fff",
      borderBottom: `1px solid ${dark ? "#1e293b" : "#e2e8f0"}`,
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 60,
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    }}>
      <button onClick={() => setPage("home")} style={{
        background: "none", border: "none", cursor: "pointer",
        fontFamily: "'Georgia', serif",
        fontSize: "22px",
        fontWeight: 800,
        color: dark ? "#f8fafc" : "#0f172a",
        letterSpacing: "-0.5px",
      }}>
        <span style={{ color: "#ef4444" }}>Dopamine</span>Shop
      </button>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {["home","terms","privacy"].map(p => (
          <button key={p} onClick={() => setPage(p)} style={{
            background: page === p ? (dark ? "#1e293b" : "#f1f5f9") : "none",
            border: "none", cursor: "pointer",
            padding: "6px 12px", borderRadius: 6,
            color: dark ? "#94a3b8" : "#475569",
            fontSize: "13px", fontWeight: 500,
          }}>
            {p === "home" ? "Shop" : p === "terms" ? "Terms" : "Privacy"}
          </button>
        ))}
        <button onClick={() => setDark(!dark)} style={{
          background: dark ? "#1e293b" : "#f1f5f9",
          border: "none", cursor: "pointer",
          padding: "6px 10px", borderRadius: 6,
          fontSize: "16px",
        }}>{dark ? "☀️" : "🌙"}</button>
        <button onClick={() => setPage("cart")} style={{
          background: "#ef4444",
          border: "none", cursor: "pointer",
          padding: "8px 16px", borderRadius: 8,
          color: "#fff", fontWeight: 700,
          fontSize: "14px", display: "flex", alignItems: "center", gap: 6,
          transition: "all 0.15s",
          boxShadow: cartCount > 0 ? "0 0 0 3px rgba(239,68,68,0.3)" : "none",
        }}>
          🛒 {cartCount > 0 && <span style={{
            background: "#fff", color: "#ef4444",
            borderRadius: "50%", width: 18, height: 18,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontSize: "11px", fontWeight: 800,
          }}>{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
}

// ── PRODUCT CARD ───────────────────────────────────────────────────────────
function ProductCard({ product, onAdd, dark }) {
  const [hover, setHover] = useState(false);
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: dark ? "#1e293b" : "#fff",
        borderRadius: 12,
        overflow: "hidden",
        border: `1px solid ${hover ? "#ef4444" : (dark ? "#334155" : "#e2e8f0")}`,
        transition: "all 0.2s ease",
        transform: hover ? "translateY(-4px) scale(1.01)" : "none",
        boxShadow: hover ? "0 12px 32px rgba(239,68,68,0.15)" : "0 2px 8px rgba(0,0,0,0.06)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{
        background: dark
          ? `linear-gradient(135deg, #0f172a 0%, #1e293b 100%)`
          : `linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)`,
        height: 140,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "56px",
        position: "relative",
        transition: "all 0.2s",
      }}>
        <span style={{ transform: hover ? "scale(1.15)" : "scale(1)", transition: "transform 0.2s", display: "block" }}>
          {product.emoji}
        </span>
        {product.badge && (
          <span style={{
            position: "absolute", top: 10, right: 10,
            background: product.badge === "Deal" ? "#ef4444" : product.badge === "New" ? "#3b82f6" : product.badge === "Premium" ? "#7c3aed" : "#10b981",
            color: "#fff", fontSize: "10px", fontWeight: 700,
            padding: "3px 8px", borderRadius: 20, letterSpacing: "0.3px",
          }}>{product.badge}</span>
        )}
      </div>
      <div style={{ padding: "14px 16px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: "13px", color: dark ? "#64748b" : "#94a3b8", marginBottom: 4 }}>{product.desc}</div>
        <div style={{ fontWeight: 700, fontSize: "15px", color: dark ? "#f8fafc" : "#0f172a", marginBottom: 4, lineHeight: 1.3 }}>
          {product.name}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <span style={{ color: "#f59e0b", fontSize: "12px" }}>{"★".repeat(Math.round(product.rating))}</span>
          <span style={{ fontSize: "11px", color: dark ? "#64748b" : "#94a3b8" }}>({product.reviews.toLocaleString()})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
          <span style={{ fontWeight: 800, fontSize: "18px", color: dark ? "#f8fafc" : "#0f172a" }}>
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAdd}
            style={{
              background: added ? "#10b981" : "#ef4444",
              color: "#fff", border: "none", cursor: "pointer",
              padding: "8px 14px", borderRadius: 8, fontWeight: 700, fontSize: "13px",
              transition: "all 0.2s",
              transform: added ? "scale(0.95)" : hover ? "scale(1.04)" : "scale(1)",
              boxShadow: added ? "0 0 0 3px rgba(16,185,129,0.3)" : "none",
            }}
          >
            {added ? "✓ Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── HOME PAGE ──────────────────────────────────────────────────────────────
function HomePage({ setPage, dark }) {
  const [activeCategory, setActiveCategory] = useState("Electronics");
  const { dispatch } = useContext(CartContext);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #7c3aed 100%)",
        borderRadius: 16,
        padding: "48px 40px",
        marginBottom: 40,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -40, right: -40, fontSize: 180, opacity: 0.08 }}>🛍️</div>
        <div style={{ fontSize: "12px", fontWeight: 700, color: "#ef4444", letterSpacing: "2px", marginBottom: 12 }}>
          SIMULATION ONLY — FOR ENTERTAINMENT
        </div>
        <h1 style={{ color: "#fff", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, margin: "0 0 12px", fontFamily: "Georgia, serif", lineHeight: 1.1 }}>
          Welcome to <span style={{ color: "#ef4444" }}>Dopamine</span>Shop
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "16px", margin: "0 0 24px", maxWidth: 500 }}>
          A hyper-realistic e-commerce simulation. Browse, add to cart, and "checkout" — no real transactions ever happen.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button onClick={() => setActiveCategory("Electronics")} style={{
            background: "#ef4444", color: "#fff", border: "none", cursor: "pointer",
            padding: "12px 28px", borderRadius: 8, fontWeight: 700, fontSize: "15px",
          }}>Shop Now →</button>
          <button onClick={() => setPage("terms")} style={{
            background: "transparent", color: "#94a3b8", border: "1px solid #334155", cursor: "pointer",
            padding: "12px 28px", borderRadius: 8, fontWeight: 600, fontSize: "14px",
          }}>How it works</button>
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 32, overflowX: "auto", paddingBottom: 4 }}>
        {CATEGORIES.map(cat => (
          <button key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              background: activeCategory === cat ? "#ef4444" : (dark ? "#1e293b" : "#fff"),
              color: activeCategory === cat ? "#fff" : (dark ? "#94a3b8" : "#475569"),
              border: `1px solid ${activeCategory === cat ? "#ef4444" : (dark ? "#334155" : "#e2e8f0")}`,
              cursor: "pointer",
              padding: "10px 20px", borderRadius: 50,
              fontWeight: 600, fontSize: "14px",
              whiteSpace: "nowrap",
              transition: "all 0.15s",
            }}
          >
            {CATEGORY_ICONS[cat]} {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 20,
      }}>
        {PRODUCTS[activeCategory].map(p => (
          <ProductCard key={p.id} product={p} dark={dark}
            onAdd={(item) => dispatch({ type: "ADD", item })}
          />
        ))}
      </div>
    </div>
  );
}

// ── CART PAGE ──────────────────────────────────────────────────────────────
function CartPage({ setPage, dark }) {
  const { cart, dispatch } = useContext(CartContext);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  if (cart.length === 0) return (
    <div style={{ maxWidth: 600, margin: "80px auto", textAlign: "center", padding: "0 24px" }}>
      <div style={{ fontSize: 80, marginBottom: 24 }}>🛒</div>
      <h2 style={{ color: dark ? "#f8fafc" : "#0f172a", marginBottom: 12 }}>Your cart is empty</h2>
      <p style={{ color: dark ? "#64748b" : "#94a3b8", marginBottom: 24 }}>Add some simulated items to get started!</p>
      <button onClick={() => setPage("home")} style={{
        background: "#ef4444", color: "#fff", border: "none", cursor: "pointer",
        padding: "12px 32px", borderRadius: 8, fontWeight: 700, fontSize: "15px",
      }}>Start Shopping</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
      <h2 style={{ color: dark ? "#f8fafc" : "#0f172a", marginBottom: 8, fontSize: 28, fontWeight: 800, fontFamily: "Georgia, serif" }}>
        Your Cart
      </h2>
      <p style={{ color: "#ef4444", fontSize: "12px", fontWeight: 600, marginBottom: 28 }}>
        ⚠️ Simulation only — no real purchases will be made
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {cart.map(item => (
            <div key={item.id} style={{
              background: dark ? "#1e293b" : "#fff",
              border: `1px solid ${dark ? "#334155" : "#e2e8f0"}`,
              borderRadius: 12, padding: "16px 20px",
              display: "flex", alignItems: "center", gap: 16,
            }}>
              <span style={{ fontSize: 40 }}>{item.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: dark ? "#f8fafc" : "#0f172a", fontSize: "15px" }}>{item.name}</div>
                <div style={{ color: dark ? "#64748b" : "#94a3b8", fontSize: "13px" }}>${item.price.toFixed(2)} each</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => dispatch({ type: "DEC", id: item.id })} style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: dark ? "#0f172a" : "#f1f5f9",
                  border: "none", cursor: "pointer", fontWeight: 700, fontSize: "16px",
                  color: dark ? "#94a3b8" : "#475569",
                }}>−</button>
                <span style={{ fontWeight: 700, color: dark ? "#f8fafc" : "#0f172a", minWidth: 24, textAlign: "center" }}>{item.qty}</span>
                <button onClick={() => dispatch({ type: "INC", id: item.id })} style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: dark ? "#0f172a" : "#f1f5f9",
                  border: "none", cursor: "pointer", fontWeight: 700, fontSize: "16px",
                  color: dark ? "#94a3b8" : "#475569",
                }}>+</button>
              </div>
              <div style={{ fontWeight: 800, color: dark ? "#f8fafc" : "#0f172a", minWidth: 70, textAlign: "right" }}>
                ${(item.price * item.qty).toFixed(2)}
              </div>
              <button onClick={() => dispatch({ type: "REMOVE", id: item.id })} style={{
                background: "none", border: "none", cursor: "pointer",
                color: "#ef4444", fontSize: "18px",
              }}>×</button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div style={{
          background: dark ? "#1e293b" : "#fff",
          border: `1px solid ${dark ? "#334155" : "#e2e8f0"}`,
          borderRadius: 12, padding: 24, minWidth: 260,
          position: "sticky", top: 80,
        }}>
          <h3 style={{ color: dark ? "#f8fafc" : "#0f172a", margin: "0 0 20px", fontWeight: 800 }}>Order Summary</h3>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, color: dark ? "#94a3b8" : "#475569", fontSize: "14px" }}>
            <span>Subtotal ({cart.reduce((s,i) => s+i.qty, 0)} items)</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, color: dark ? "#94a3b8" : "#475569", fontSize: "14px" }}>
            <span>Simulated Shipping</span>
            <span style={{ color: "#10b981" }}>FREE</span>
          </div>
          <div style={{ borderTop: `1px solid ${dark ? "#334155" : "#e2e8f0"}`, margin: "16px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, color: dark ? "#f8fafc" : "#0f172a", fontWeight: 800, fontSize: "18px" }}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button onClick={() => setPage("checkout")} style={{
            background: "#ef4444", color: "#fff", border: "none", cursor: "pointer",
            width: "100%", padding: "14px", borderRadius: 8, fontWeight: 700, fontSize: "15px",
            transition: "all 0.15s",
          }}>Checkout →</button>
          <p style={{ fontSize: "10px", color: dark ? "#475569" : "#94a3b8", textAlign: "center", marginTop: 12 }}>
            Simulation only — no real payment
          </p>
        </div>
      </div>
    </div>
  );
}

// ── CHECKOUT PAGE ──────────────────────────────────────────────────────────
function CheckoutPage({ setPage, setOrder, dark }) {
  const { cart, dispatch } = useContext(CartContext);
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", zip: "", country: "US", card: "", expiry: "", cvv: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!form.address.trim()) e.address = "Required";
    if (form.card.replace(/\s/g, "").length < 16) e.card = "Enter 16-digit card number";
    if (!form.expiry.match(/\d{2}\/\d{2}/)) e.expiry = "MM/YY format";
    if (form.cvv.length < 3) e.cvv = "3-4 digits";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    await delay(1800);
    const trackId = "SIM-DOPAMINE-" + Math.floor(1000 + Math.random() * 9000);
    setOrder({ trackId, items: [...cart], total, name: form.name, email: form.email });
    dispatch({ type: "CLEAR" });
    setPage("order");
  };

  const inp = (field, label, placeholder, extra = {}) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: "13px", fontWeight: 600, color: dark ? "#94a3b8" : "#475569" }}>{label}</label>
      <input
        value={form[field]}
        onChange={e => {
          let v = e.target.value;
          if (field === "card") v = v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
          if (field === "expiry") v = v.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(\d)/, "$1/$2");
          if (field === "cvv") v = v.replace(/\D/g, "").slice(0, 4);
          setForm(f => ({ ...f, [field]: v }));
          if (errors[field]) setErrors(er => ({ ...er, [field]: null }));
        }}
        placeholder={placeholder}
        style={{
          padding: "10px 14px", borderRadius: 8,
          border: `1px solid ${errors[field] ? "#ef4444" : (dark ? "#334155" : "#e2e8f0")}`,
          background: dark ? "#0f172a" : "#f8fafc",
          color: dark ? "#f8fafc" : "#0f172a",
          fontSize: "14px", outline: "none",
          ...extra,
        }}
        {...(field === "card" ? { maxLength: 19 } : {})}
      />
      {errors[field] && <span style={{ color: "#ef4444", fontSize: "11px" }}>{errors[field]}</span>}
    </div>
  );

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px" }}>
      <div style={{
        background: "#fef3c7", border: "1px solid #f59e0b", borderRadius: 10,
        padding: "12px 16px", marginBottom: 28, fontSize: "13px", fontWeight: 600, color: "#92400e",
      }}>
        ⚠️ This is a simulated checkout. No real payment will be processed. Card details are for demo only.
      </div>

      <h2 style={{ color: dark ? "#f8fafc" : "#0f172a", marginBottom: 28, fontSize: 26, fontWeight: 800, fontFamily: "Georgia, serif" }}>
        Checkout
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Contact */}
          <Section title="Contact Information" dark={dark}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {inp("name", "Full Name", "John Doe")}
              {inp("email", "Email Address", "john@example.com")}
            </div>
          </Section>

          {/* Shipping */}
          <Section title="Shipping Address (Simulated)" dark={dark}>
            {inp("address", "Street Address", "123 Simulation Ave")}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginTop: 14 }}>
              {inp("city", "City", "New York")}
              {inp("zip", "ZIP Code", "10001")}
              {inp("country", "Country", "US")}
            </div>
          </Section>

          {/* Payment */}
          <Section title="Payment Details (Demo Only — Not Real)" dark={dark}>
            <div style={{
              background: "#fef3c7", borderRadius: 8, padding: "8px 12px",
              fontSize: "12px", color: "#92400e", fontWeight: 600, marginBottom: 14,
            }}>
              🔒 Simulation only. Use any fake numbers. No real payment occurs.
            </div>
            {inp("card", "Card Number", "4242 4242 4242 4242")}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 14 }}>
              {inp("expiry", "Expiry (MM/YY)", "12/27")}
              {inp("cvv", "CVV", "123")}
            </div>
          </Section>
        </div>

        {/* Summary sidebar */}
        <div style={{
          background: dark ? "#1e293b" : "#fff",
          border: `1px solid ${dark ? "#334155" : "#e2e8f0"}`,
          borderRadius: 12, padding: 20, minWidth: 220,
          position: "sticky", top: 80,
        }}>
          <div style={{ fontWeight: 700, color: dark ? "#f8fafc" : "#0f172a", marginBottom: 14 }}>
            {cart.reduce((s,i)=>s+i.qty,0)} items
          </div>
          {cart.map(item => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: "13px", color: dark ? "#94a3b8" : "#475569" }}>
              <span>{item.emoji} {item.name} ×{item.qty}</span>
              <span>${(item.price*item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${dark ? "#334155" : "#e2e8f0"}`, margin: "12px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, color: dark ? "#f8fafc" : "#0f172a" }}>
            <span>Total</span><span>${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              background: loading ? "#94a3b8" : "#ef4444",
              color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer",
              width: "100%", padding: "14px", borderRadius: 8, fontWeight: 700, fontSize: "14px",
              marginTop: 16, transition: "all 0.2s",
            }}
          >
            {loading ? "Processing…" : "Place Order (Simulated)"}
          </button>
          <p style={{ fontSize: "10px", color: dark ? "#475569" : "#94a3b8", textAlign: "center", marginTop: 8 }}>
            No real transaction
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children, dark }) {
  return (
    <div style={{
      background: dark ? "#1e293b" : "#fff",
      border: `1px solid ${dark ? "#334155" : "#e2e8f0"}`,
      borderRadius: 12, padding: "20px 24px",
    }}>
      <h3 style={{ color: dark ? "#f8fafc" : "#0f172a", margin: "0 0 16px", fontSize: "15px", fontWeight: 700 }}>{title}</h3>
      {children}
    </div>
  );
}

// ── ORDER STATUS PAGE ──────────────────────────────────────────────────────
const ORDER_STEPS = [
  { label: "Order Confirmed", icon: "✅", note: "Your simulated order is received." },
  { label: "Processing", icon: "⚙️", note: "Preparing your virtual items." },
  { label: "Packaging", icon: "📦", note: "Items packed in digital warehouse." },
  { label: "Shipped", icon: "🚚", note: "In transit to simulated address." },
  { label: "Delivered", icon: "🎉", note: "Your simulation is complete!" },
];

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

function OrderPage({ order, setPage, dark }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const delays = [800, 1800, 3200, 5000, 7000];
    delays.forEach((d, i) => {
      setTimeout(() => setStep(i + 1), d);
    });
    setTimeout(() => setDone(true), 7200);
  }, []);

  const pct = Math.round((step / ORDER_STEPS.length) * 100);

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{
        background: "#fef3c7", border: "1px solid #f59e0b", borderRadius: 10,
        padding: "10px 14px", marginBottom: 28, fontSize: "12px", fontWeight: 600, color: "#92400e",
        textAlign: "center",
      }}>
        ⚠️ Simulation only – no real transaction
      </div>

      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>{done ? "🎉" : "📦"}</div>
        <h2 style={{ color: dark ? "#f8fafc" : "#0f172a", fontSize: 26, fontWeight: 800, fontFamily: "Georgia, serif", marginBottom: 8 }}>
          {done ? "Delivered!" : "Processing Your Order"}
        </h2>
        <p style={{ color: dark ? "#64748b" : "#94a3b8", marginBottom: 4 }}>
          Tracking ID: <strong style={{ color: "#ef4444", fontFamily: "monospace" }}>{order.trackId}</strong>
        </p>
        <p style={{ color: dark ? "#64748b" : "#94a3b8", fontSize: "14px" }}>Placed for: {order.name} · {order.email}</p>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: 36 }}>
        <div style={{
          background: dark ? "#1e293b" : "#e2e8f0",
          borderRadius: 50, height: 8, marginBottom: 24, overflow: "hidden",
        }}>
          <div style={{
            height: "100%", borderRadius: 50,
            background: "linear-gradient(90deg, #ef4444, #f97316)",
            width: `${pct}%`,
            transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
          }} />
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {ORDER_STEPS.map((s, i) => {
            const active = i < step;
            const current = i === step - 1 && !done;
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "14px 18px", borderRadius: 10,
                background: active ? (dark ? "#1e293b" : "#f0fdf4") : (dark ? "#0f172a" : "#f8fafc"),
                border: `1px solid ${current ? "#10b981" : active ? "#bbf7d0" : (dark ? "#1e293b" : "#e2e8f0")}`,
                opacity: i > step ? 0.5 : 1,
                transition: "all 0.4s ease",
                transform: current ? "scale(1.01)" : "scale(1)",
              }}>
                <span style={{ fontSize: 24 }}>{s.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: dark ? "#f8fafc" : "#0f172a", fontSize: "14px" }}>{s.label}</div>
                  {active && <div style={{ fontSize: "12px", color: dark ? "#64748b" : "#94a3b8", marginTop: 2 }}>{s.note}</div>}
                </div>
                {current && (
                  <span style={{
                    background: "#10b981", color: "#fff",
                    borderRadius: 20, padding: "3px 10px",
                    fontSize: "11px", fontWeight: 700,
                    animation: "pulse 1.5s infinite",
                  }}>In Progress</span>
                )}
                {active && i < step - 1 && (
                  <span style={{ color: "#10b981", fontWeight: 700, fontSize: "18px" }}>✓</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {done && (
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={() => setPage("tracking")} style={{
            background: "#ef4444", color: "#fff", border: "none", cursor: "pointer",
            padding: "12px 28px", borderRadius: 8, fontWeight: 700, fontSize: "14px",
          }}>View Tracking →</button>
          <button onClick={() => setPage("home")} style={{
            background: dark ? "#1e293b" : "#fff",
            color: dark ? "#94a3b8" : "#475569",
            border: `1px solid ${dark ? "#334155" : "#e2e8f0"}`,
            cursor: "pointer", padding: "12px 28px", borderRadius: 8, fontWeight: 600, fontSize: "14px",
          }}>Continue Shopping</button>
        </div>
      )}
    </div>
  );
}

// ── TRACKING PAGE ──────────────────────────────────────────────────────────
const TRACK_STEPS = [
  { label: "Order Received", sublabel: "Simulation Warehouse, CA", time: "Just now", icon: "📋" },
  { label: "Sorting Center", sublabel: "Distribution Hub, TX", time: "+2 hours", icon: "🏭" },
  { label: "In Transit", sublabel: "Cross-Country Route", time: "+1 day", icon: "🚛" },
  { label: "Local Facility", sublabel: "Destination City Hub", time: "+2 days", icon: "📍" },
  { label: "Out for Delivery", sublabel: "Your Simulated Address", time: "+3 days", icon: "🏠" },
  { label: "Delivered", sublabel: "Simulation Complete ✓", time: "+3 days, 2pm", icon: "🎉" },
];

function TrackingPage({ order, setPage, dark }) {
  if (!order) return (
    <div style={{ maxWidth: 500, margin: "80px auto", textAlign: "center", padding: "0 24px" }}>
      <div style={{ fontSize: 60, marginBottom: 20 }}>📦</div>
      <h2 style={{ color: dark ? "#f8fafc" : "#0f172a", marginBottom: 12 }}>No order to track</h2>
      <p style={{ color: dark ? "#64748b" : "#94a3b8", marginBottom: 24 }}>Place a simulated order first!</p>
      <button onClick={() => setPage("home")} style={{ background: "#ef4444", color: "#fff", border: "none", cursor: "pointer", padding: "12px 28px", borderRadius: 8, fontWeight: 700 }}>Shop Now</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px" }}>
      {/* Warning */}
      <div style={{
        background: "#fef3c7", border: "2px solid #f59e0b", borderRadius: 10,
        padding: "14px 18px", marginBottom: 28, fontSize: "13px", fontWeight: 700, color: "#92400e",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        ⚠️ This is a simulated tracking system. No real shipping exists.
      </div>

      {/* Header */}
      <div style={{
        background: dark ? "#1e293b" : "#fff",
        border: `1px solid ${dark ? "#334155" : "#e2e8f0"}`,
        borderRadius: 12, padding: "24px", marginBottom: 24,
      }}>
        <div style={{ fontSize: "12px", color: dark ? "#64748b" : "#94a3b8", marginBottom: 8, fontWeight: 600, letterSpacing: "1px" }}>TRACKING NUMBER</div>
        <div style={{ fontFamily: "monospace", fontSize: "22px", fontWeight: 800, color: "#ef4444", marginBottom: 16 }}>
          {order.trackId}
        </div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <Stat label="Recipient" value={order.name} dark={dark} />
          <Stat label="Items" value={order.items.length + " items"} dark={dark} />
          <Stat label="Value" value={"$" + order.total.toFixed(2)} dark={dark} />
          <Stat label="Status" value="Delivered ✓" green dark={dark} />
        </div>
      </div>

      {/* Timeline */}
      <div style={{
        background: dark ? "#1e293b" : "#fff",
        border: `1px solid ${dark ? "#334155" : "#e2e8f0"}`,
        borderRadius: 12, padding: "24px",
      }}>
        <h3 style={{ color: dark ? "#f8fafc" : "#0f172a", margin: "0 0 24px", fontWeight: 700 }}>
          📍 Shipment Timeline
        </h3>
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", left: 20, top: 0, bottom: 0, width: 2,
            background: `linear-gradient(to bottom, #ef4444, #10b981)`,
            borderRadius: 2,
          }} />
          {TRACK_STEPS.map((step, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 20,
              marginBottom: i < TRACK_STEPS.length - 1 ? 28 : 0,
              paddingLeft: 48, position: "relative",
            }}>
              <div style={{
                position: "absolute", left: 10, width: 22, height: 22,
                borderRadius: "50%",
                background: i === TRACK_STEPS.length - 1 ? "#10b981" : "#ef4444",
                border: "2px solid " + (dark ? "#1e293b" : "#fff"),
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "10px",
                boxShadow: "0 0 0 3px " + (i === TRACK_STEPS.length - 1 ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"),
              }}>
                <span style={{ fontSize: 11 }}>✓</span>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 18 }}>{step.icon}</span>
                  <span style={{ fontWeight: 700, color: dark ? "#f8fafc" : "#0f172a", fontSize: "15px" }}>{step.label}</span>
                  <span style={{ fontSize: "11px", color: dark ? "#475569" : "#94a3b8", fontWeight: 600, background: dark ? "#0f172a" : "#f1f5f9", padding: "2px 8px", borderRadius: 20 }}>{step.time}</span>
                </div>
                <div style={{ fontSize: "13px", color: dark ? "#64748b" : "#94a3b8", marginTop: 4 }}>{step.sublabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => setPage("home")} style={{
        background: dark ? "#1e293b" : "#fff",
        color: dark ? "#94a3b8" : "#475569",
        border: `1px solid ${dark ? "#334155" : "#e2e8f0"}`,
        cursor: "pointer", padding: "12px 24px", borderRadius: 8, fontWeight: 600, marginTop: 24,
      }}>← Back to Shop</button>
    </div>
  );
}

function Stat({ label, value, green, dark }) {
  return (
    <div>
      <div style={{ fontSize: "11px", color: dark ? "#475569" : "#94a3b8", fontWeight: 600, marginBottom: 4 }}>{label}</div>
      <div style={{ fontWeight: 700, color: green ? "#10b981" : (dark ? "#f8fafc" : "#0f172a"), fontSize: "14px" }}>{value}</div>
    </div>
  );
}

// ── TERMS PAGE ─────────────────────────────────────────────────────────────
function TermsPage({ dark }) {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{
        background: "#fef3c7", border: "2px solid #f59e0b", borderRadius: 12,
        padding: "20px 24px", marginBottom: 32,
      }}>
        <h2 style={{ color: "#92400e", margin: "0 0 8px", fontSize: 20, fontWeight: 800 }}>⚠️ Important Disclaimer</h2>
        <p style={{ color: "#92400e", margin: 0, fontWeight: 600 }}>
          DopamineShop is entirely a simulation. No real products are sold, no real payments are accepted, and no real shipping or delivery services exist. This platform is for entertainment and educational purposes only.
        </p>
      </div>
      <h1 style={{ color: dark ? "#f8fafc" : "#0f172a", fontFamily: "Georgia, serif", marginBottom: 8 }}>Terms of Service</h1>
      <p style={{ color: dark ? "#64748b" : "#94a3b8", marginBottom: 32, fontSize: "14px" }}>Last updated: June 2024</p>
      {[
        { title: "1. Simulation Only", body: "DopamineShop is a demonstration and simulation platform. It is not a real e-commerce store. No actual goods or services are offered for sale. All product listings, prices, cart functionality, checkout forms, and order/tracking systems are purely simulated for entertainment and demonstration purposes." },
        { title: "2. No Real Payments", body: "No actual payment processing occurs on this platform. Any credit card or financial information entered is not stored, transmitted to any payment processor, or used for any real transaction. Users are advised not to enter real financial information, though none will be stored or processed regardless." },
        { title: "3. No Real Products", body: "All products displayed on DopamineShop are fictional. No merchandise will be shipped to any address. Product descriptions, images (represented by emoji), pricing, and reviews are entirely made up for simulation purposes." },
        { title: "4. No Real Shipping", body: "All order confirmations, processing updates, shipping notifications, and tracking IDs (format: SIM-DOPAMINE-XXXX) are simulated. No real courier, postal service, or logistics provider is involved in any transaction on this platform." },
        { title: "5. Data Collection", body: "No user data is collected, stored, or transmitted. Form submissions do not leave the user's browser. This is a completely frontend-only application with no backend infrastructure." },
        { title: "6. Entertainment Purpose", body: "This platform is designed for entertainment purposes only — to simulate the dopamine-driven experience of online shopping without any real commercial activity. Use of this platform constitutes acceptance of its purely simulated nature." },
        { title: "7. No Liability", body: "The creators of DopamineShop accept no liability for any misunderstanding arising from use of this simulation. Users who engage with this platform do so with full knowledge that it is a non-commercial, entertainment-only simulation." },
      ].map(s => (
        <div key={s.title} style={{ marginBottom: 28 }}>
          <h3 style={{ color: dark ? "#f8fafc" : "#0f172a", marginBottom: 8, fontWeight: 700 }}>{s.title}</h3>
          <p style={{ color: dark ? "#94a3b8" : "#475569", lineHeight: 1.7, fontSize: "15px" }}>{s.body}</p>
        </div>
      ))}
    </div>
  );
}

// ── PRIVACY PAGE ───────────────────────────────────────────────────────────
function PrivacyPage({ dark }) {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{
        background: "#fef3c7", border: "2px solid #f59e0b", borderRadius: 12,
        padding: "20px 24px", marginBottom: 32,
      }}>
        <h2 style={{ color: "#92400e", margin: "0 0 8px", fontSize: 20, fontWeight: 800 }}>⚠️ Simulation Disclosure</h2>
        <p style={{ color: "#92400e", margin: 0, fontWeight: 600 }}>
          DopamineShop collects no real user data. This is a 100% frontend simulation with no backend, no database, and no data transmission of any kind.
        </p>
      </div>
      <h1 style={{ color: dark ? "#f8fafc" : "#0f172a", fontFamily: "Georgia, serif", marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ color: dark ? "#64748b" : "#94a3b8", marginBottom: 32, fontSize: "14px" }}>Last updated: June 2024</p>
      {[
        { title: "No Data Collection", body: "DopamineShop does not collect any personal information. All data entered into forms (names, addresses, email addresses, card numbers) exists solely in your browser's memory and is discarded when you close or refresh the page." },
        { title: "No Cookies", body: "We do not use cookies, local storage, or any other persistent storage mechanisms to track users across sessions or visits." },
        { title: "No Payment Data", body: "As stated in our Terms of Service, no real payment transactions occur. Card numbers entered are not stored, not encrypted, not transmitted, and immediately discarded. Do not enter real financial credentials, though they will not be retained regardless." },
        { title: "No Third-Party Sharing", body: "No user data is shared with any third parties because no user data is collected. There are no analytics trackers, advertising networks, or data brokers involved in this simulation." },
        { title: "Children's Privacy", body: "DopamineShop is a simulation platform intended for general audiences. No data is collected from any users, including children under 13." },
        { title: "Simulation Context", body: "All order IDs, tracking numbers, and confirmation emails displayed are simulated. They do not represent real orders in any system. No real shipping carrier, warehouse, or logistics company has any knowledge of activities on this platform." },
        { title: "Contact", body: "As this is a simulation platform with no real business operations, there is no contact email or support system. This policy exists solely to be transparent about the simulated nature of all operations." },
      ].map(s => (
        <div key={s.title} style={{ marginBottom: 28 }}>
          <h3 style={{ color: dark ? "#f8fafc" : "#0f172a", marginBottom: 8, fontWeight: 700 }}>{s.title}</h3>
          <p style={{ color: dark ? "#94a3b8" : "#475569", lineHeight: 1.7, fontSize: "15px" }}>{s.body}</p>
        </div>
      ))}
    </div>
  );
}

// ── FOOTER ─────────────────────────────────────────────────────────────────
function Footer({ setPage, dark }) {
  return (
    <footer style={{
      background: dark ? "#0f172a" : "#1e293b",
      borderTop: `1px solid ${dark ? "#1e293b" : "#334155"}`,
      padding: "32px 24px 24px",
      marginTop: 60,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          background: "#7f1d1d", border: "1px solid #ef4444", borderRadius: 10,
          padding: "14px 20px", marginBottom: 28, textAlign: "center",
        }}>
          <p style={{ color: "#fca5a5", margin: 0, fontWeight: 700, fontSize: "13px" }}>
            ⚠️ Bu site tamamen simülasyon amaçlıdır. Gerçek ürün, ödeme veya kargo hizmeti sunulmaz. |
            This site is entirely for simulation purposes. No real products, payments, or shipping services are provided.
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: "20px", fontWeight: 800, color: "#f8fafc", marginBottom: 6 }}>
              <span style={{ color: "#ef4444" }}>Dopamine</span>Shop
            </div>
            <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>For entertainment and simulation purposes only</p>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {["home","terms","privacy"].map(p => (
              <button key={p} onClick={() => setPage(p)} style={{
                background: "none", border: "none", cursor: "pointer",
                color: "#64748b", fontSize: "13px", fontWeight: 500,
                transition: "color 0.15s",
              }}>
                {p === "home" ? "Shop" : p === "terms" ? "Terms of Service" : "Privacy Policy"}
              </button>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid #1e293b", marginTop: 24, paddingTop: 16, textAlign: "center" }}>
          <p style={{ color: "#475569", fontSize: "12px", margin: 0 }}>
            © 2024 DopamineShop Simulation · No real commerce · No real data · Entertainment only
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── APP ROOT ───────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState("home");
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [order, setOrder] = useState(null);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      <ThemeContext.Provider value={{ dark, setDark }}>
        <div style={{
          minHeight: "100vh",
          background: dark ? "#0f172a" : "#f8fafc",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          transition: "background 0.2s",
        }}>
          <style>{`
            * { box-sizing: border-box; }
            button { font-family: inherit; }
            input { font-family: inherit; }
            @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
            ::-webkit-scrollbar { width: 6px; height: 6px; }
            ::-webkit-scrollbar-track { background: transparent; }
            ::-webkit-scrollbar-thumb { background: #475569; border-radius: 3px; }
          `}</style>
          <SimBanner />
          <Navbar page={page} setPage={setPage} cartCount={cartCount} dark={dark} setDark={setDark} />
          <main>
            {page === "home" && <HomePage setPage={setPage} dark={dark} />}
            {page === "cart" && <CartPage setPage={setPage} dark={dark} />}
            {page === "checkout" && <CheckoutPage setPage={setPage} setOrder={setOrder} dark={dark} />}
            {page === "order" && order && <OrderPage order={order} setPage={setPage} dark={dark} />}
            {page === "tracking" && <TrackingPage order={order} setPage={setPage} dark={dark} />}
            {page === "terms" && <TermsPage dark={dark} />}
            {page === "privacy" && <PrivacyPage dark={dark} />}
          </main>
          <Footer setPage={setPage} dark={dark} />
        </div>
      </ThemeContext.Provider>
    </CartContext.Provider>
  );
}
