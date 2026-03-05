// ============================================
// CHECKOUT PAGE - MULTI-STEP FORM
// ============================================

"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { useAuthStore } from "@/store/auth";
import { useNotification } from "@/store/ui";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { formatCurrency, cn } from "@/lib/utils";
import { CHECKOUT_STEPS, ROUTES, SHIPPING_CONFIG } from "@/lib/constants";
import { CheckoutData } from "@/types";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const currentStep = ((searchParams.get("step") || "customer").toUpperCase()) as keyof typeof CHECKOUT_STEPS;

  const user = useAuthStore((state) => state.user);
  const { items,subtotal, shipping, tax, total } = useCartStore();
  const notification = useNotification();

  const [formData, setFormData] = useState<CheckoutData>({
    customer: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: "",
    },
    shipping: {
      id: "addr-1",
      user_id: user?.id || "",
      street: "",
      city: "",
      state: "",
      postal_code: "",
      country: "Egypt",
      is_default: false,
      type: "shipping",
    },
    billing: {
      id: "addr-2",
      user_id: user?.id || "",
      street: "",
      city: "",
      state: "",
      postal_code: "",
      country: "Egypt",
      is_default: false,
      type: "billing",
    },
    payment: {
      method: "online",
    },
  });

  const steps = [
    CHECKOUT_STEPS.CUSTOMER,
    CHECKOUT_STEPS.SHIPPING,
    CHECKOUT_STEPS.PAYMENT,
    CHECKOUT_STEPS.CONFIRMATION,
  ];

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep.toLowerCase());

  const handleNext = () => {
    // Validation
    if (currentStep === "CUSTOMER") {
      if (!formData.customer.firstName || !formData.customer.email) {
        notification.error("Please fill in all required fields");
        return;
      }
    }

    if (currentStepIndex < steps.length - 1) {
      const nextStep = steps[currentStepIndex + 1];
      window.history.pushState(null, "", `${ROUTES.CHECKOUT}?step=${nextStep.id}`);
      // Force re-render
      window.location.reload();
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      const prevStep = steps[currentStepIndex - 1];
      window.history.pushState(null, "", `${ROUTES.CHECKOUT}?step=${prevStep.id}`);
      window.location.reload();
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button variant="primary">
            <Link href={ROUTES.PRODUCTS}>CONTINUE SHOPPING</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="container-luxury">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                {/* Step Circle */}
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full font-bold transition-all duration-300",
                    currentStepIndex >= index
                      ? "bg-navy-primary text-white"
                      : "bg-gray-200 text-gray-600"
                  )}
                >
                  {index + 1}
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-1 mx-2 transition-all duration-300",
                      currentStepIndex > index
                        ? "bg-navy-primary"
                        : "bg-gray-200"
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step Labels */}
          <div className="mt-4 flex justify-between text-sm">
            {steps.map((step) => (
              <span
                key={step.id}
                className={cn(
                  "font-medium transition-colors",
                  currentStepIndex >= steps.findIndex((s) => s.id === step.id)
                    ? "text-navy-primary"
                    : "text-gray-500"
                )}
              >
                {step.label}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Form Content */}
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white p-8">
              {/* STEP 1: CUSTOMER INFO */}
              {currentStep === "CUSTOMER" && (
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl font-bold mb-6">Contact Information</h2>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Input
                      label="First Name"
                      value={formData.customer.firstName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customer: { ...formData.customer, firstName: e.target.value },
                        })
                      }
                      required
                    />
                    <Input
                      label="Last Name"
                      value={formData.customer.lastName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customer: { ...formData.customer, lastName: e.target.value },
                        })
                      }
                      required
                    />
                  </div>

                  <Input
                    label="Email Address"
                    type="email"
                    value={formData.customer.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customer: { ...formData.customer, email: e.target.value },
                      })
                    }
                    required
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    value={formData.customer.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customer: { ...formData.customer, phone: e.target.value },
                      })
                    }
                  />
                </div>
              )}

              {/* STEP 2: SHIPPING */}
              {currentStep === "SHIPPING" && (
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl font-bold mb-6">Shipping Address</h2>

                  <Input
                    label="Street Address"
                    value={formData.shipping.street}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shipping: { ...formData.shipping, street: e.target.value },
                      })
                    }
                  />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Input
                      label="City"
                      value={formData.shipping.city}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shipping: { ...formData.shipping, city: e.target.value },
                        })
                      }
                    />
                    <Input
                      label="State/Province"
                      value={formData.shipping.state}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shipping: { ...formData.shipping, state: e.target.value },
                        })
                      }
                    />
                  </div>

                  <Input
                    label="Postal Code"
                    value={formData.shipping.postal_code}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shipping: { ...formData.shipping, postal_code: e.target.value },
                      })
                    }
                  />

                  {/* Shipping Options */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold mb-3">Shipping Method</h3>
                    {SHIPPING_CONFIG.REGIONS.EGYPT.options.map((option) => (
                      <label key={option.id} className="flex items-center gap-3 mb-3">
                        <input type="radio" name="shipping" defaultChecked={option.id === "standard"} />
                        <span>
                          {option.name} - {formatCurrency(option.cost)} ({option.estimated_days} day{option.estimated_days !== 1 ? "s" : ""})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: PAYMENT */}
              {currentStep === "PAYMENT" && (
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl font-bold mb-6">Payment Method</h2>

                  <div className="space-y-4">
                    {Object.entries({
                      online: "Online Payment",
                      cash: "Cash on Delivery",
                    }).map(([value, label]) => (
                      <label
                        key={value}
                        className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 cursor-pointer hover:border-navy-primary hover:bg-gray-50"
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={value}
                          checked={formData.payment.method === value}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              payment: { ...formData.payment, method: e.target.value as "online" | "cash" },
                            })
                          }
                        />
                        <div>
                          <p className="font-semibold">{label}</p>
                          <p className="text-sm text-gray-600">
                            {value === "online"
                              ? "Pay securely online with card or digital wallet"
                              : "Pay in cash when you receive your order"}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {formData.payment.method === "online" && (
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        Payment gateway will appear on the next step for your security.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 4: CONFIRMATION */}
              {currentStep === "CONFIRMATION" && (
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl font-bold mb-6 text-green-600">
                    Order Confirmed!
                  </h2>

                  <div className="rounded-lg bg-green-50 p-6 text-center">
                    <svg className="mx-auto mb-4 h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-lg font-semibold text-green-900">
                      Thank you for your order!
                    </p>
                    <p className="mt-2 text-sm text-green-700">
                      Order confirmation email has been sent to {formData.customer.email}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p>
                      <span className="font-semibold">Estimated Delivery:</span> 3-5 business days
                    </p>
                    <p>
                      <span className="font-semibold">Order Number:</span> #ATOM-2024-001234
                    </p>
                    <p>
                      <span className="font-semibold">Payment Method:</span>{" "}
                      {formData.payment.method === "online" ? "Card" : "Cash on Delivery"}
                    </p>
                  </div>

                  <Button variant="primary" fullWidth>
                    <Link href={ROUTES.ORDERS}>VIEW ORDER DETAILS</Link>
                  </Button>

                  <Button variant="secondary" fullWidth>
                    <Link href={ROUTES.PRODUCTS}>CONTINUE SHOPPING</Link>
                  </Button>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep !== "CONFIRMATION" && (
                <div className="mt-8 flex gap-4">
                  {currentStepIndex > 0 && (
                    <Button variant="outline" onClick={handleBack}>
                      BACK
                    </Button>
                  )}
                  <Button variant="primary" onClick={handleNext} className="ml-auto">
                    {currentStepIndex === steps.length - 2 ? "PLACE ORDER" : "CONTINUE"}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="h-fit rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-6 font-bold uppercase tracking-wider">ORDER SUMMARY</h3>

            {/* Items */}
            <div className="mb-6 max-h-64 space-y-3 overflow-y-auto border-b border-gray-200 pb-6">
              {items.map((item) => (
                <div key={`${item.product_id}-${item.size}`} className="flex justify-between text-sm">
                  <span>
                    {item.product_name} x {item.quantity}
                  </span>
                  <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{shipping === 0 ? "FREE" : formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-gold-accent">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
