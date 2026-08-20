"use client";

import { useState, useEffect } from "react";
import { businessRepository, productRepository } from "@/repositories";
import type { Business, Product } from "@/domain/types";
import { useAuthStore } from "@/stores/authStore";
import { LoadingState, EmptyState } from "@/components/ui/States";
import { Price } from "@/components/ui/Price";
import { toast } from "sonner";
import { Plus, Package, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { FileUpload } from "@/components/ui/FileUpload";

export default function BusinessProductsPage() {
  const { user } = useAuthStore();
  const [business, setBusiness] = useState<Business | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        const bizRes = await businessRepository.getBusinesses({});
        const biz = bizRes.data[0];
        if (biz) {
          setBusiness(biz);
          const prodRes = await productRepository.getProducts({ businessId: biz.id, limit: 50 });
          setProducts(prodRes.data);
        }
      } catch (e) {
        toast.error("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [user]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate save
    toast.success("Product saved successfully!");
    setShowForm(false);
  };

  if (isLoading) return <LoadingState />;
  if (!business) return <EmptyState icon={<Package />} title="No Business Profile" description="You need an active business to manage products." />;

  if (showForm) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
          <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
        </div>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input required type="text" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-10 px-3 border" placeholder="e.g. Chocolate Cake" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea rows={3} className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-3 border" placeholder="Describe the product..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (LKR)</label>
                <input required type="number" min="0" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-10 px-3 border" placeholder="e.g. 1500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-10 px-3 border">
                  <option>Cakes</option>
                  <option>Pastries</option>
                  <option>Beverages</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
              <FileUpload
                directory={`products/${business?.id || 'general'}`}
                onUploadSuccess={(url) => {
                  toast.success("Image uploaded!");
                  // Here we would normally save the URL to form state
                  console.log("Uploaded URL:", url);
                }}
              />
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-100">
            <Button type="submit" className="w-full">Save Product</Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Catalog</h1>
          <p className="text-gray-500">Manage your physical products and inventory.</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {products.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
            <p className="text-gray-500 mt-1">Get started by adding your first product.</p>
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Base Price</th>
                <th className="px-6 py-4">Variants</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                      {product.images[0] && (
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                      )}
                    </div>
                    <div className="font-medium text-gray-900 max-w-[200px] truncate">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{product.categoryId.substring(0, 8)}</td>
                  <td className="px-6 py-4 font-medium"><Price amount={product.basePrice} /></td>
                  <td className="px-6 py-4 text-gray-600">{product.variants.length} options</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
