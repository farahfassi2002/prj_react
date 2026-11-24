import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideToast } from '../redux/uiSlice';

export default function NotificationToast() {
  const { message, visible } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => dispatch(hideToast()), 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, message, dispatch]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        background: 'green',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
      }}
    >
      {message}
    </div>
  );
}
