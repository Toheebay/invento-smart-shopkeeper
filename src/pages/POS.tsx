
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";

const initialProducts = [
  { id: 1, name: "Red T-Shirt", price: 399, qty: 1 },
  { id: 2, name: "Blue Cap", price: 149, qty: 2 },
];

export default function POSPage() {
  const [cart, setCart] = React.useState(initialProducts);

  const increment = (id: number) =>
    setCart((old) =>
      old.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
    );

  const decrement = (id: number) =>
    setCart((old) =>
      old
        .map((item) => (item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );

  const remove = (id: number) => setCart((old) => old.filter((item) => item.id !== id));

  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);

  return (
    <div className="min-h-screen w-full max-w-4xl mx-auto flex flex-col gap-6 py-10">
      <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
        <ShoppingCart size={28} className="text-primary" /> Point of Sale
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Cart */}
        <Card className="flex-1">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Current Sale</h2>
            <div className="divide-y">
              {cart.length === 0 && (
                <div className="py-6 text-muted-foreground text-center">Cart is empty. Scan a barcode to add items!</div>
              )}
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 gap-4">
                  <span>{item.name}</span>
                  <div className="flex items-center gap-1">
                    <Button size="icon" variant="ghost" onClick={() => decrement(item.id)}>
                      <Minus size={16} />
                    </Button>
                    <span className="w-6 text-center">{item.qty}</span>
                    <Button size="icon" variant="ghost" onClick={() => increment(item.id)}>
                      <Plus size={16} />
                    </Button>
                  </div>
                  <span className="font-mono w-20 text-right">₹{item.price * item.qty}</span>
                  <Button size="icon" variant="outline" onClick={() => remove(item.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Summary */}
        <div className="w-full md:w-72">
          <Card>
            <CardContent className="p-6 flex flex-col gap-4">
              <div>
                <span className="text-muted-foreground">Total:</span>
                <div className="text-2xl font-bold text-primary">₹{total}</div>
              </div>
              <Button disabled={cart.length === 0} className="w-full text-lg py-6 mt-4">Checkout</Button>
              <Button asChild variant="outline" className="w-full mt-2 gap-2 py-6">
                <a href="/barcode">
                  <ShoppingCart size={20} />
                  Scan Item (Barcode)
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
