import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn, UserPlus, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type AuthMode = "login" | "signup" | "forgot";

export default function AuthPage() {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Simulate auth session check and redirect (replace with your backend logic)
  React.useEffect(() => {
    // TODO: Replace with backend session/token check (call your API or check localStorage, etc.)
    const isLoggedIn = false; // <- Replace with a real check, if you wish
    if (isLoggedIn) navigate("/");
  }, [navigate]);

  // === STEP 1: REPLACE THESE FUNCTIONS WITH YOUR API CALLS! ===

  // --- LOGIN ---
  async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });
      // You may need to adjust the response structure based on your API
      if (res.data && res.data.success) {
        return { success: true };
      } else {
        return { success: false, error: res.data.error || "Login failed" };
      }
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || "Network or server error" };
    }
  }

  // --- SIGN UP ---
  async function signup(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await axios.post("http://localhost:3000/api/signup", {
        email,
        password,
      });
      if (res.data && res.data.success) {
        return { success: true };
      } else {
        return { success: false, error: res.data.error || "Signup failed" };
      }
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || "Network or server error" };
    }
  }

  // --- FORGOT PASSWORD ---
  async function forgotPassword(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await axios.post("http://localhost:3000/api/forgot-password", {
        email,
      });
      if (res.data && res.data.success) {
        return { success: true };
      } else {
        return { success: false, error: res.data.error || "Failed to send email" };
      }
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || "Network or server error" };
    }
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setPending(true);

    if (authMode === "login") {
      const res = await login(email, password);
      if (res.error) {
        setError(res.error);
      } else {
        setMessage("Login successful! Redirecting...");
        // TODO: set session/token from your backend here
        setTimeout(() => navigate("/"), 1000);
      }
    } else if (authMode === "signup") {
      const res = await signup(email, password);
      if (res.error) {
        setError(res.error);
      } else {
        setMessage("Account created! You may now login.");
        setAuthMode("login");
      }
    } else if (authMode === "forgot") {
      const res = await forgotPassword(email);
      if (res.error) {
        setError(res.error);
      } else {
        setMessage("Password recovery email sent!");
      }
    }
    setPending(false);
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center 
        bg-gradient-to-br from-green-200 via-green-100 to-green-300
      "
    >
      <form
        className="
          bg-white rounded-lg shadow-xl w-full max-w-md p-8
          flex flex-col items-center gap-6 border-2 border-green-400
          animate-fadeIn
        "
        onSubmit={handleAuth}
      >
        {authMode === "login" && (
          <>
            <LogIn size={48} className="text-green-600 mb-2" />
            <h1 className="text-2xl font-bold text-green-700 mb-1">Login</h1>
          </>
        )}
        {authMode === "signup" && (
          <>
            <UserPlus size={48} className="text-green-600 mb-2" />
            <h1 className="text-2xl font-bold text-green-700 mb-1">Sign Up</h1>
          </>
        )}
        {authMode === "forgot" && (
          <>
            <Mail size={48} className="text-green-600 mb-2" />
            <h1 className="text-2xl font-bold text-green-700 mb-1">Password Recovery</h1>
            <div className="text-green-800 text-center text-md mb-1">
              We'll send you a recovery email link.
            </div>
          </>
        )}
        <Input
          required
          placeholder="Email"
          type="email"
          className="border-green-400 focus:ring-green-500"
          value={email}
          autoComplete="email"
          disabled={pending}
          onChange={(e) => setEmail(e.target.value)}
        />
        {authMode !== "forgot" && (
          <Input
            required
            placeholder="Password"
            type="password"
            value={password}
            className="border-green-400 focus:ring-green-500"
            autoComplete={authMode === "signup" ? "new-password" : "current-password"}
            disabled={pending}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        <Button
          type="submit"
          className="w-full py-3 text-lg bg-green-600 text-white hover:bg-green-700 font-bold shadow"
          disabled={pending}
        >
          {authMode === "login" && "Login"}
          {authMode === "signup" && "Sign Up"}
          {authMode === "forgot" && "Send Recovery Email"}
        </Button>

        <div className="flex flex-col gap-2 items-center w-full">
          {authMode === "login" && (
            <>
              <span className="text-muted-foreground text-sm">
                Don&apos;t have an account? &nbsp;
                <button
                  type="button"
                  className="text-green-700 underline font-bold"
                  onClick={() => setAuthMode("signup")}
                >
                  Sign Up
                </button>
              </span>
              <button
                type="button"
                className="text-green-700 underline text-sm"
                onClick={() => setAuthMode("forgot")}
              >
                Forgot Password?
              </button>
            </>
          )}
          {authMode === "signup" && (
            <span className="text-muted-foreground text-sm">
              Already have an account?&nbsp;
              <button
                type="button"
                className="text-green-700 underline font-bold"
                onClick={() => setAuthMode("login")}
              >
                Login
              </button>
            </span>
          )}
          {authMode === "forgot" && (
            <span className="text-muted-foreground text-sm">
              Return to&nbsp;
              <button
                type="button"
                className="text-green-700 underline font-bold"
                onClick={() => setAuthMode("login")}
              >
                Login
              </button>
            </span>
          )}
        </div>

        {error && (
          <div className="mt-2 w-full px-2 py-2 text-red-600 bg-red-100 rounded text-center font-semibold">
            {error}
          </div>
        )}
        {message && (
          <div className="mt-2 w-full px-2 py-2 text-green-700 bg-green-100 rounded text-center font-semibold">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
