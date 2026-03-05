// ============================================
// LOGIN PAGE
// ============================================

"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuthStore } from "@/store/auth";
import { useNotification } from "@/store/ui";
import { ROUTES } from "@/lib/constants";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const notification = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      // Simulated login
      const mockUser = {
        id: "user-123",
        email,
        firstName: "John",
        lastName: "Doe",
        phone: "",
        profile_image: "",
        wishlist: [],
        created_at: new Date().toISOString(),
        verified: true,
      };

      login(mockUser, "token-123");
      notification.success("Logged in successfully!");
      window.location.href = ROUTES.ACCOUNT;
    } catch (error) {
      notification.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="section bg-navy-primary text-white">
        <div className="section-inner text-center">
          <h1 className="text-luxury-large mb-4">LOGIN</h1>
        </div>
      </div>

      {/* Login Form */}
      <section className="section">
        <div className="section-inner max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="text-navy-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <Button variant="primary" size="lg" fullWidth isLoading={isLoading} type="submit">
              LOGIN
            </Button>
          </form>

          <div className="mt-8 border-t border-gray-200 pt-8 text-center">
            <p className="mb-4 text-gray-600">
              Don't have an account?{" "}
              <Link href={ROUTES.REGISTER} className="text-navy-primary hover:underline font-semibold">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
