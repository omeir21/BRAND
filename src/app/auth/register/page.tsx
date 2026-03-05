// ============================================
// REGISTER PAGE
// ============================================

"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuthStore } from "@/store/auth";
import { useNotification } from "@/store/ui";
import { ROUTES, VALIDATION } from "@/lib/constants";
import { isValidEmail, validatePassword } from "@/lib/utils";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const login = useAuthStore((state) => state.login);
  const notification = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validation
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!isValidEmail(email)) newErrors.email = "Please enter a valid email";
    
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      newErrors.password = passwordValidation.errors[0] || "Password does not meet requirements";
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      // Simulated registration
      const mockUser = {
        id: "user-" + Math.random().toString(36),
        email,
        firstName,
        lastName,
        phone: "",
        profile_image: "",
        wishlist: [],
        created_at: new Date().toISOString(),
        verified: false,
      };

      login(mockUser, "token-123");
      notification.success("Registration successful!");
      window.location.href = ROUTES.ACCOUNT;
    } catch (error) {
      notification.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="section bg-navy-primary text-white">
        <div className="section-inner text-center">
          <h1 className="text-luxury-large mb-4">CREATE ACCOUNT</h1>
        </div>
      </div>

      {/* Register Form */}
      <section className="section">
        <div className="section-inner max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={errors.firstName}
                required
              />
              <Input
                label="Last Name"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={errors.lastName}
                required
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              helperText={`Minimum ${VALIDATION.PASSWORD_MIN_LENGTH} characters with uppercase, lowercase, number and special character`}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              required
            />

            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" required />
              <span className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="#terms" className="text-navy-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#privacy" className="text-navy-primary hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>

            <Button variant="primary" size="lg" fullWidth isLoading={isLoading} type="submit">
              CREATE ACCOUNT
            </Button>
          </form>

          <div className="mt-8 border-t border-gray-200 pt-8 text-center">
            <p className="mb-4 text-gray-600">
              Already have an account?{" "}
              <Link href={ROUTES.LOGIN} className="text-navy-primary hover:underline font-semibold">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
