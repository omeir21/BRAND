// ============================================
// PRODUCTS/SHOP PAGE
// ============================================

"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart";
import { useNotification } from "@/store/ui";
import ProductCard from "@/components/ui/ProductCard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { CATEGORIES, SIZES } from "@/lib/constants";
import { Product } from "@/types";

// Mock data - replace with API calls
const MOCK_PRODUCTS: Product[] = [
  {
    id: "product-1",
    name: "Premium Silk Blouse",
    slug: "premium-silk-blouse",
    description: "Luxurious silk blouse with elegant draping",
    price: 1250,
    originalPrice: 1500,
    images: ["/images/product-1.svg"],
    category: "Apparel",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy"],
    inStock: true,
    availability: 15,
    sku: "SILK-001",
    rating: 4.8,
    reviews_count: 24,
    created_at: new Date().toISOString(),
  },
  // Add more products...
];

export default function ProductsPage() {
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState("newest");

  const notification = useNotification();
  const addItem = useCartStore((state) => state.addItem);

  // Filter products
  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Size filter
    if (selectedSize) {
      filtered = filtered.filter((p) => p.sizes.includes(selectedSize));
    }

    // Price filter
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Stock filter
    filtered = filtered.filter((p) => p.inStock);

    // Sort
    if (sortBy === "price_asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, selectedSize, priceRange, sortBy]);

  const handleAddToCart = (product: Product) => {
    addItem({
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      quantity: 1,
      size: product.sizes[0],
      image: product.images[0],
    });
    notification.success("Product added to cart!");
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="section bg-navy-primary text-white">
        <div className="section-inner text-center">
          <h1 className="text-luxury-large mb-4">SHOP</h1>
          <p className="text-lg text-white/80">
            Explore our complete collection of luxury items
          </p>
        </div>
      </div>

      {/* Shop Section */}
      <section className="section">
        <div className="section-inner">
          {/* Filter & Sort Bar */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-md border border-gray-300 px-4 py-2 text-base focus:border-navy-primary focus:outline-none focus:ring-1 focus:ring-navy-primary"
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden rounded-md border border-gray-300 px-4 py-2 transition-colors hover:border-navy-primary hover:text-navy-primary"
            >
              FILTERS
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Sidebar Filters */}
            <div
              className={`md:col-span-1 ${
                isFilterOpen ? "block" : "hidden"
              } md:block`}
            >
              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h3 className=" mb-4 font-semibold uppercase tracking-wider">
                    Category
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value=""
                        checked={selectedCategory === ""}
                        onChange={() => setSelectedCategory("")}
                      />
                      <span className="text-sm">All Categories</span>
                    </label>
                    {Object.values(CATEGORIES).map((category) => (
                      <label key={category} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                        />
                        <span className="text-sm capitalize">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div>
                  <h3 className="mb-4 font-semibold uppercase tracking-wider">
                    Size
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="size"
                        value=""
                        checked={selectedSize === ""}
                        onChange={() => setSelectedSize("")}
                      />
                      <span className="text-sm">All Sizes</span>
                    </label>
                    {SIZES.APPAREL.map((size) => (
                      <label key={size} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="size"
                          value={size}
                          checked={selectedSize === size}
                          onChange={() => setSelectedSize(size)}
                        />
                        <span className="text-sm">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h3 className="mb-4 font-semibold uppercase tracking-wider">
                    Price Range
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm">Min Price</label>
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm">Max Price</label>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Reset Filters */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("");
                    setSelectedSize("");
                    setPriceRange([0, 5000]);
                  }}
                >
                  RESET FILTERS
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="md:col-span-3">
              {filteredProducts.length > 0 ? (
                <div>
                  <p className="mb-6 text-sm text-gray-600">
                    Showing {filteredProducts.length} products
                  </p>
                  <div className="grid-products">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600">
                    No products found matching your filters.
                  </p>
                  <Button
                    variant="primary"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("");
                      setSelectedSize("");
                      setPriceRange([0, 5000]);
                    }}
                  >
                    CLEAR FILTERS
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
