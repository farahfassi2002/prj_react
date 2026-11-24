import React from 'react';
import { useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import NotificationToast from './components/NotificationToast';

export default function App() {
  const { theme } = useTheme();

  return (
    <div className={`app-shell ${theme}`}>
      <Navbar />
      <main className="main-content">
        <div className="container">
          <div className="page-intro">
            <h1>
              État Global : <code>useContext</code> &amp; <code>Redux Toolkit</code>
            </h1>
            <p>
              Séance 6 : Coexistence d'un état applicatif léger (Thème géré par Context) et d'un état
              métier transactionnel (Panier géré par Redux Toolkit).
            </p>
          </div>

          <div className="store-layout">
            <section className="product-section">
              <div className="section-title-box">
                <h3>📦 Catalogue Produits</h3>
                <p className="subtitle-hint">
                  Chaque clic sur le bouton déclenche une action via <code>dispatch(addItem(produit))</code>.
                </p>
              </div>
              <ProductList />
            </section>

            <Cart />
          </div>
        </div>
      </main>
      <footer className="footer-bar">
        MERN – Séance 6 · École Polytechnique de Sousse · 2026–2027
      </footer>
      <NotificationToast />
    </div>
  );
}
