"use client";

import { useState, useRef } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { apiClient } from "@/repositories/api/client";

interface FileUploadProps {
  onUploadSuccess: (url: string) => void;
  onUploadError?: (error: string) => void;
  directory?: string;
  accept?: string;
  maxSizeMB?: number;
  className?: string;
  defaultImage?: string;
}

export function FileUpload({
  onUploadSuccess,
  onUploadError,
  directory = "general",
  accept = "image/png, image/jpeg, image/jpg",
  maxSizeMB = 5,
  className,
  defaultImage,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleUpload(file);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await handleUpload(file);
    }
  };

  const handleUpload = async (file: File) => {
    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      const errorMsg = `File size must be less than ${maxSizeMB}MB`;
      if (onUploadError) onUploadError(errorMsg);
      else alert(errorMsg);
      return;
    }

    // Set preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("directory", directory);

      // Using the base apiClient to handle multipart upload
      const token = localStorage.getItem("auth-storage") 
        ? JSON.parse(localStorage.getItem("auth-storage") as string)?.state?.token 
        : "";

      const response = await fetch(`${apiClient.defaults.baseURL}/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onUploadSuccess(data.url);
    } catch (err) {
      setPreview(defaultImage || null);
      if (onUploadError) {
        onUploadError(err instanceof Error ? err.message : "Upload failed");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={cn("relative w-full", className)}>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={accept}
        onChange={handleFileChange}
      />

      {preview ? (
        <div className="relative group rounded-xl overflow-hidden border border-[#E5E7EB] aspect-video sm:aspect-auto sm:h-48 w-full bg-gray-50 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          {isUploading ? (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm gap-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-white text-[#111827] rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
              >
                Change
              </button>
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="p-2 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors w-full sm:h-48",
            isDragging
              ? "border-[#0D6E6E] bg-[#0D6E6E]/5"
              : "border-[#E5E7EB] hover:border-gray-400 hover:bg-gray-50"
          )}
        >
          <div className="w-12 h-12 rounded-full bg-[#F7F8FA] flex items-center justify-center mb-4">
            <UploadCloud className="w-6 h-6 text-[#6B7280]" />
          </div>
          <p className="text-sm font-semibold text-[#111827] mb-1">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-[#6B7280]">
            SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
          </p>
        </div>
      )}
    </div>
  );
}
