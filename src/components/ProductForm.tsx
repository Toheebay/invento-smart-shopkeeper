
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { Select } from "@/components/ui/select";

type ProductFormProps = {
  categories: { id: string; name: string }[];
  onSuccess?: () => void;
};

export default function ProductForm({ categories, onSuccess }: ProductFormProps) {
  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm();
  const queryClient = useQueryClient();

  const onSubmit = async (data: any) => {
    const { error } = await supabase.from("products").insert({
      name: data.name,
      price: Number(data.price),
      stock: Number(data.stock),
      category_id: data.category_id || null,
      image_url: data.image_url || null,
      sku: data.sku || null,
      unit: "pcs",
      status: "active",
    });
    if (!error) {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      reset();
      if (onSuccess) onSuccess();
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label>Name</Label>
        <Input {...register("name", { required: true })} placeholder="Product name" />
        {errors.name && <span className="text-destructive text-xs">Name required</span>}
      </div>
      <div>
        <Label>Price (₹)</Label>
        <Input type="number" min={0} {...register("price", { required: true })} />
      </div>
      <div>
        <Label>Stock</Label>
        <Input type="number" min={0} {...register("stock", { required: true })} />
      </div>
      <div>
        <Label>Category</Label>
        <select {...register("category_id")} className="input w-full border px-3 py-2 rounded">
          <option value="">-- None --</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <div>
        <Label>SKU</Label>
        <Input {...register("sku")} />
      </div>
      <div>
        <Label>Image URL</Label>
        <Input {...register("image_url")} placeholder="https://..." />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Adding..." : "Add Product"}
      </Button>
    </form>
  );
}
