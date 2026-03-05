// ============================================
// ACCOUNT/DASHBOARD PAGE
// ============================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import { useNotification } from "@/store/ui";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ROUTES } from "@/lib/constants";

export default function AccountPage() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const updateUser = useAuthStore((state) => state.updateUser);
  const notification = useNotification();

  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "wishlist" | "addresses">("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "",
  });

  const handleLogout = () => {
    logout();
    notification.success("You have been logged out");
    window.location.href = ROUTES.HOME;
  };

  const handleSaveProfile = () => {
    updateUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
    });
    notification.success("Profile updated successfully");
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Please log in to view your account</h1>
          <Button variant="primary">
            <Link href={ROUTES.LOGIN}>GO TO LOGIN</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="section bg-navy-primary text-white">
        <div className="section-inner">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-luxury-large mb-2">MY ACCOUNT</h1>
              <p className="text-white/80">Welcome back, {user.firstName}!</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              LOGOUT
            </Button>
          </div>
        </div>
      </div>

      {/* Account Content */}
      <section className="section">
        <div className="section-inner">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Sidebar Navigation */}
            <div className="md:col-span-1">
              <nav className="space-y-2 border-b border-gray-200 pb-4 md:border-b-0 md:border-r md:border-gray-200 md:pb-0 md:pr-4">
                {[
                  { id: "profile", label: "Profile" },
                  { id: "orders", label: "Orders" },
                  { id: "addresses", label: "Addresses" },
                  { id: "wishlist", label: "Wishlist" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`block w-full px-4 py-2 text-left font-semibold transition-colors ${
                      activeTab === tab.id
                        ? "border-l-2 border-gold-accent text-navy-primary md:border-l-0 md:border-r-2"
                        : "text-gray-600 hover:text-navy-primary"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content Area */}
            <div className="md:col-span-3">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <h2 className="mb-6 font-serif text-2xl font-bold">Profile Information</h2>

                  {!isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-sm text-gray-600">First Name</p>
                          <p className="font-semibold">{user.firstName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Last Name</p>
                          <p className="font-semibold">{user.lastName}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-semibold">{user.email}</p>
                      </div>
                      <Button variant="primary" onClick={() => setIsEditing(true)}>
                        EDIT PROFILE
                      </Button>
                    </div>
                  ) : (
                    <form className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="First Name"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({ ...formData, firstName: e.target.value })
                          }
                        />
                        <Input
                          label="Last Name"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({ ...formData, lastName: e.target.value })
                          }
                        />
                      </div>
                      <Input
                        label="Email"
                        type="email"
                        value={formData.email}
                        disabled
                      />
                      <div className="flex gap-4">
                        <Button variant="primary" onClick={handleSaveProfile}>
                          SAVE
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsEditing(false);
                            setFormData({
                              firstName: user.firstName,
                              lastName: user.lastName,
                              email: user.email,
                              phone: "",
                            });
                          }}
                        >
                          CANCEL
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <h2 className="mb-6 font-serif text-2xl font-bold">Your Orders</h2>
                  <p className="text-center py-12 text-gray-600">
                    No orders yet. <Link href={ROUTES.PRODUCTS} className="text-navy-primary hover:underline">Start shopping</Link>
                  </p>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <h2 className="mb-6 font-serif text-2xl font-bold">Saved Addresses</h2>
                  <p className="mb-4 text-gray-600">
                    No saved addresses yet.
                  </p>
                  <Button variant="primary">
                    ADD NEW ADDRESS
                  </Button>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <h2 className="mb-6 font-serif text-2xl font-bold">My Wishlist</h2>
                  <p className="text-center py-12 text-gray-600">
                    Your wishlist is empty.<Link href={ROUTES.PRODUCTS} className="block text-navy-primary hover:underline mt-2">Add items to your wishlist</Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
