import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { showToast } from '../redux/uiSlice';

const PRODUCTS = [
  { id: 1, name: 'Écran UltraWide 4K 34"', price: 850, category: 'Affichage' },
  { id: 2, name: 'Clavier Mécanique RGB', price: 180, category: 'Périphérique' },
  { id: 3, name: 'Souris Sans Fil Ergonomique', price: 95, category: 'Accessoire' },
  { id: 4, name: 'Casque Haute Fidélité ANC', price: 320, category: 'Audio' },
];

export default function ProductList() {
  const dispatch = useDispatch();

  return (
    <div className="product-grid">
      {PRODUCTS.map((product) => (
        <div key={product.id} className="product-card">
          <h4>{product.name}</h4>
          <span>{product.price} DT</span>
          <button
            onClick={() => {
              dispatch(addItem(product));
              dispatch(showToast(`${product.name} ajouté au panier`)); // Défi 3
            }}
          >
            + Ajouter
          </button>
        </div>
      ))}
    </div>
  );
}
