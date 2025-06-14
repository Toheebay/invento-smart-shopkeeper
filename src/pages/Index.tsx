
// Inventory Dashboard
import { BarChart2, ShoppingCart, Box, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sampleStats = [
  {
    label: "Products in Stock",
    value: 128,
    icon: Box,
    color: "bg-blue-100 text-blue-600",
  },
  {
    label: "Low Stock",
    value: 8,
    icon: Package,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    label: "Today’s Sales",
    value: "₹ 4,150",
    icon: ShoppingCart,
    color: "bg-green-100 text-green-600",
  },
  {
    label: "Top Product",
    value: "Red T-Shirt",
    icon: BarChart2,
    color: "bg-fuchsia-100 text-fuchsia-600",
  },
];

const products = [
  { sku: "TS-1002", name: "Red T-Shirt", stock: 42, price: 399 },
  { sku: "AC-3301", name: "Blue Cap", stock: 16, price: 149 },
  { sku: "JK-0221", name: "Winter Jacket", stock: 9, price: 2499 },
  { sku: "BG-0010", name: "Travel Backpack", stock: 2, price: 1299 },
  { sku: "BT-5521", name: "Bluetooth Speaker", stock: 25, price: 799 },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background flex flex-col w-full">
      {/* Nav */}
      <div className="mb-8">
        {/* Navbar moved to AppNav */}
      </div>
      <main className="w-full max-w-7xl mx-auto flex flex-col gap-8">
        {/* Hero Section */}
        <div className="flex flex-col items-start gap-2 py-2">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-primary">Inventory Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Monitor your stocks, track sales, and smartly manage your shop in one unified system!
          </p>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {sampleStats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4 p-4">
                <span className={`rounded-full p-2 text-lg ${stat.color} flex`}>
                  <stat.icon size={26} />
                </span>
                <div className="flex flex-col">
                  <span className="text-xl font-bold">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Quick Actions */}
        <div className="flex gap-3 flex-wrap">
          <Link to="/pos">
            <Button variant="outline" size="lg" className="flex gap-2 items-center shadow hover:bg-primary/10 border-primary">
              <ShoppingCart size={20} /> Open POS
            </Button>
          </Link>
          <Link to="/barcode">
            <Button variant="outline" size="lg" className="flex gap-2 items-center shadow hover:bg-primary/10 border-primary">
              <BarChart2 size={20} /> Barcode Scan
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="lg" className="flex gap-2 items-center shadow hover:bg-primary/10 border-primary">
              <span>Login</span>
            </Button>
          </Link>
        </div>
        {/* Product Table */}
        <section>
          <h2 className="text-lg font-medium mb-2 text-foreground">Current Inventory</h2>
          <div className="overflow-x-auto rounded border">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-accent">
                <tr>
                  <th className="py-2 px-4">SKU</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Stock</th>
                  <th className="py-2 px-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr
                    key={item.sku}
                    className={item.stock <= 5 ? "bg-yellow-50" : ""}
                  >
                    <td className="py-2 px-4 font-mono">{item.sku}</td>
                    <td className="py-2 px-4">{item.name}</td>
                    <td className={`py-2 px-4 font-semibold ${item.stock <= 5 ? "text-red-600" : ""}`}>{item.stock}</td>
                    <td className="py-2 px-4">₹{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
