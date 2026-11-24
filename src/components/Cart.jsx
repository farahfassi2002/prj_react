import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, clearCart, applyPromoCode } from '../redux/cartSlice';

export default function Cart() {
  const { items, totalCount, totalPrice, discountPercent } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [code, setCode] = useState('');

  return (
    <div className="cart-card">
      <div className="cart-header">
        <h3>Mon Panier Redux</h3>
        {items.length > 0 && (
          <button onClick={() => dispatch(clearCart())}>Vider</button>
        )}
      </div>

      {items.length === 0 ? (
        <p>Le panier est actuellement vide.</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className="cart-row">
              <span>{item.name} ({item.price} DT x {item.quantity})</span>
              <div>
                <button onClick={() => dispatch(removeItem(item.id))}> - </button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(addItem(item))}>+</button>
              </div>
            </div>
          ))}
          <p>Nombre total d'articles : <strong>{totalCount}</strong></p>
          <p>Montant Total : <strong>{totalPrice} DT</strong></p>

          {/* Défi 2 : code promo */}
          <input
            type="text"
            placeholder="Code promo"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button onClick={() => dispatch(applyPromoCode(code))}>Appliquer</button>
          {discountPercent > 0 && (
            <p style={{ color: 'green' }}>
              Montant remisé (-{discountPercent} %) :{' '}
              <strong>{totalPrice * (1 - discountPercent / 100)} DT</strong>
            </p>
          )}
        </>
      )}
    </div>
  );
}
