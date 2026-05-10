"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import {
  properties,
  counties,
  propertyTypes,
  Property,
} from "@/lib/properties";
import {
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  Home,
  Grid3X3,
  List,
  Box,
} from "lucide-react";

type SortOption = "newest" | "price-low" | "price-high" | "area";

export function PropertiesClient() {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | "sale" | "rent">(
    (searchParams.get("type") as "sale" | "rent") || "all",
  );
  const [selectedCounty, setSelectedCounty] = useState(
    searchParams.get("county") || "",
  );
  const [selectedPropertyType, setSelectedPropertyType] = useState(
    searchParams.get("propertyType") || "",
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0, 200000000,
  ]);
  const [bedroomsMin, setBedroomsMin] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [virtualTourOnly, setVirtualTourOnly] = useState(false);

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query),
      );
    }

    if (selectedType !== "all") {
      result = result.filter((p) => p.type === selectedType);
    }

    if (selectedCounty) {
      result = result.filter((p) => p.county === selectedCounty);
    }

    if (selectedPropertyType) {
      result = result.filter((p) => p.propertyType === selectedPropertyType);
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    if (bedroomsMin > 0) {
      result = result.filter((p) => p.bedrooms >= bedroomsMin);
    }

    if (virtualTourOnly) {
      result = result.filter((p) => p.virtualTour);
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "area":
        result.sort((a, b) => b.area - a.area);
        break;
      default:
        break;
    }

    return result;
  }, [
    searchQuery,
    selectedType,
    selectedCounty,
    selectedPropertyType,
    priceRange,
    bedroomsMin,
    sortBy,
    virtualTourOnly,
  ]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedCounty("");
    setSelectedPropertyType("");
    setPriceRange([0, 200000000]);
    setBedroomsMin(0);
    setVirtualTourOnly(false);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedType !== "all" ||
    selectedCounty ||
    selectedPropertyType ||
    priceRange[0] > 0 ||
    priceRange[1] < 200000000 ||
    bedroomsMin > 0 ||
    virtualTourOnly;

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
          {selectedType === "sale"
            ? "Properties for Sale"
            : selectedType === "rent"
              ? "Properties for Rent"
              : "All Properties"}
        </h1>
        <p className="text-muted-foreground">
          Discover {filteredProperties.length} properties across Kenya
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-card rounded-2xl border border-border p-4 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by location, property name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Type Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedType("all")}
              className={`px-4 py-3 rounded-xl font-medium transition-all ${
                selectedType === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedType("sale")}
              className={`px-4 py-3 rounded-xl font-medium transition-all ${
                selectedType === "sale"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setSelectedType("rent")}
              className={`px-4 py-3 rounded-xl font-medium transition-all ${
                selectedType === "rent"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              Rent
            </button>
          </div>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={`gap-2 ${showFilters ? "bg-primary text-primary-foreground" : ""}`}
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </Button>

          {/* View Mode Toggle */}
          <div className="flex gap-1 border border-border rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              aria-label="Grid view"
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              aria-label="List view"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* County */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  County
                </label>
                <select
                  value={selectedCounty}
                  onChange={(e) => setSelectedCounty(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Counties</option>
                  {counties.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Home className="w-4 h-4 inline mr-1" />
                  Property Type
                </label>
                <select
                  value={selectedPropertyType}
                  onChange={(e) => setSelectedPropertyType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Types</option>
                  {propertyTypes.map((pt) => (
                    <option key={pt.value} value={pt.value}>
                      {pt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Min Bedrooms
                </label>
                <select
                  value={bedroomsMin}
                  onChange={(e) => setBedroomsMin(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value={0}>Any</option>
                  <option value={1}>1+</option>
                  <option value={2}>2+</option>
                  <option value={3}>3+</option>
                  <option value={4}>4+</option>
                  <option value={5}>5+</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="area">Largest Area</option>
                </select>
              </div>
            </div>

            {/* Additional Filter Options */}
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={virtualTourOnly}
                  onChange={(e) => setVirtualTourOnly(e.target.checked)}
                  className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                />
                <Box className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  3D Virtual Tour Only
                </span>
              </label>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-destructive hover:text-destructive gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear All Filters
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {filteredProperties.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-4"
          }
        >
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
            <Search className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No properties found
          </h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search or filters to find what you&apos;re
            looking for
          </p>
          <Button onClick={clearFilters}>Clear All Filters</Button>
        </div>
      )}
    </>
  );
}
