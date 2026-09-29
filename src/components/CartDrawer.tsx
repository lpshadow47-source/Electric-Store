import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const [checkedOut, setCheckedOut] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setCheckedOut(true);
    clearCart();
    setTimeout(() => {
      setCheckedOut(false);
      setIsOpen(false);
    }, 3500);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-amber-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Cart {totalItems > 0 && <span className="text-gray-400">({totalItems})</span>}
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {checkedOut ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Order Placed!</h3>
            <p className="mt-2 text-gray-500">Thank you for your purchase. We'll email you a confirmation shortly.</p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <ShoppingBag className="h-10 w-10" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Your cart is empty</h3>
            <p className="mt-1 text-sm text-gray-500">Add some products to get started.</p>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 rounded-lg bg-slate-900 px-6 py-2.5 font-semibold text-white transition-all hover:bg-slate-800"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 rounded-xl border border-gray-200 p-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
                    />
                    <div className="flex flex-1 flex-col">
                      <h3 className="text-sm font-semibold text-slate-900">{item.name}</h3>
                      <p className="text-xs text-gray-500">{item.category}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-1 rounded-lg border border-gray-200">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center text-gray-600 hover:bg-gray-100"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center text-gray-600 hover:bg-gray-100"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 transition-colors hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-5 py-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-xl font-bold text-slate-900">${totalPrice.toFixed(2)}</span>
              </div>
              <p className="mb-4 text-xs text-gray-500">Shipping and taxes calculated at checkout.</p>
              <button
                onClick={handleCheckout}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-600 py-3 font-semibold text-slate-900 shadow-lg shadow-amber-500/20 transition-all hover:brightness-110"
              >
                Checkout
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
