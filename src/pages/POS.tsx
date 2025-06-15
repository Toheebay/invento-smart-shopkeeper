
import { ShoppingCart, Plus, Minus, Trash2, X, Check, ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import ProductForm from "@/components/ProductForm";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  image_url?: string | null;
  category_id?: string | null;
  sku?: string | null;
};

type Category = {
  id: string;
  name: string;
  description?: string | null;
};

function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Product[];
    }
  });
}

function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order('name');
      if (error) throw error;
      return data as Category[];
    }
  });
}

function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: "Product deleted" });
    },
    meta: {
      onError: (error: any) => {
        toast({ title: "Delete error", description: error.message, variant: "destructive" });
      }
    }
  });
}

export default function POSPage() {
  const { data: products, isLoading: loadingProducts } = useProducts();
  const { data: categories, isLoading: loadingCategories } = useCategories();
  const deleteProduct = useDeleteProduct();
  const [cart, setCart] = React.useState<Product[]>([]);
  const [showAdd, setShowAdd] = React.useState(false);

  // Add product to cart
  const addToCart = (prod: Product) => {
    setCart((old) => {
      const found = old.find((i) => i.id === prod.id);
      if (found) {
        return old.map(item => item.id === prod.id ? { ...item, qty: (item.qty || 1) + 1 } : item);
      }
      return [...old, { ...prod, qty: 1 }];
    });
  };

  const increment = (id: string) =>
    setCart((old) =>
      old.map((item) => (item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item))
    );

  const decrement = (id: string) =>
    setCart((old) =>
      old
        .map((item) => (item.id === id && item.qty! > 1 ? { ...item, qty: item.qty! - 1 } : item))
        .filter((item) => (item.qty ?? 1) > 0)
    );

  const remove = (id: string) => setCart((old) => old.filter((item) => item.id !== id));

  const total = cart.reduce((sum, p) => sum + (p.price || 0) * (p.qty || 1), 0);

  return (
    <div className="min-h-screen w-full max-w-6xl mx-auto flex flex-col gap-6 py-10">
      <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
        <ShoppingCart size={28} className="text-primary" /> Point of Sale
      </h1>
      {/* Add Product Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-card rounded-lg p-6 w-full max-w-lg relative">
            <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => setShowAdd(false)}>
              <X />
            </Button>
            <ProductForm
              categories={categories || []}
              onSuccess={() => {
                setShowAdd(false);
                toast({ title: "Product added" });
              }}
            />
          </div>
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Cart */}
        <Card className="flex-1 min-h-[400px]">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Current Sale</h2>
            <div className="divide-y">
              {cart.length === 0 && (
                <div className="py-6 text-muted-foreground text-center">Cart is empty. Click a product to add it!</div>
              )}
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 gap-4">
                  <span className="flex items-center gap-2">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded border"
                      />
                    ) : (
                      <span className="w-10 h-10 flex items-center justify-center bg-muted rounded">
                        <ImageIcon className="text-muted-foreground" />
                      </span>
                    )}
                    {item.name}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button size="icon" variant="ghost" onClick={() => decrement(item.id)}>
                      <Minus size={16} />
                    </Button>
                    <span className="w-6 text-center">{item.qty ?? 1}</span>
                    <Button size="icon" variant="ghost" onClick={() => increment(item.id)}>
                      <Plus size={16} />
                    </Button>
                  </div>
                  <span className="font-mono w-20 text-right">₹{(item.price || 0) * (item.qty ?? 1)}</span>
                  <Button size="icon" variant="outline" onClick={() => remove(item.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Products List & Add */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Products</h2>
            <Button size="sm" onClick={() => setShowAdd(true)}>
              <Plus size={16} className="mr-1" /> Add Product
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto">
            {loadingProducts ? (
              <div className="col-span-2 text-center">Loading...</div>
            ) : (
              products &&
              products.map((prod) => (
                <div key={prod.id} className="flex flex-col items-center bg-card border rounded-lg p-3 gap-2 hover:shadow transition relative">
                  {/* PRODUCT IMAGE */}
                  {prod.image_url ? (
                    <img
                      src={prod.image_url}
                      alt={prod.name}
                      className="w-20 h-20 object-cover rounded border mb-1"
                    />
                  ) : (
                    <span className="w-20 h-20 flex items-center justify-center bg-muted rounded mb-1">
                      <ImageIcon className="text-muted-foreground" size={32} />
                    </span>
                  )}
                  <span className="text-base font-semibold text-center">{prod.name}</span>
                  <span className="text-sm text-muted-foreground">{prod.sku}</span>
                  <span className="text-primary text-lg font-mono">₹{prod.price}</span>
                  <span className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => addToCart(prod)}>
                      Add to Cart
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => deleteProduct.mutate(prod.id)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {/* Cart summary / checkout */}
      <div className="w-full md:w-80 ml-auto mt-4">
        <Card>
          <CardContent className="p-6 flex flex-col gap-4">
            <div>
              <span className="text-muted-foreground">Total:</span>
              <div className="text-2xl font-bold text-primary">₹{total}</div>
            </div>
            <Button disabled={cart.length === 0} className="w-full text-lg py-6 mt-4">Checkout</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
