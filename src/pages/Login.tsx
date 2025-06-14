
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const handleMockLogin = () => {
    alert("Authentication integration coming soon!");
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="max-w-sm w-full p-8 flex flex-col items-center bg-white shadow-md rounded border">
        <LogIn size={48} className="mb-4 text-primary" />
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <Button
          className="w-full text-lg py-5 flex gap-2 items-center"
          onClick={handleMockLogin}
        >
          <LogIn size={20} />
          Login
        </Button>
        <div className="text-xs text-muted-foreground mt-5 text-center">Secure login integration will be available here.</div>
      </div>
    </div>
  );
}
