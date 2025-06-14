
import { ShoppingCart, Barcode, LogIn, Boxes } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", path: "/", icon: Boxes },
  { name: "POS", path: "/pos", icon: ShoppingCart },
  { name: "Barcode", path: "/barcode", icon: Barcode },
  { name: "Login", path: "/login", icon: LogIn },
];

export function AppNav() {
  const location = useLocation();

  return (
    <header className="w-full py-2 px-8 bg-white border-b border-gray-200 flex items-center justify-between shadow-sm z-50">
      <div className="flex items-center gap-4">
        <span className="font-bold text-lg tracking-wide text-primary">Invento</span>
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link to={item.path} key={item.path}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "flex items-center gap-2 hover:bg-accent transition-colors rounded px-3 py-2 font-semibold",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <item.icon size={18} />
                  <span className="hidden md:inline">{item.name}</span>
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex items-center gap-2">
        {/* Could add user/account actions here */}
      </div>
    </header>
  );
}
