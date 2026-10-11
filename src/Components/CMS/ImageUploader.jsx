import React, { useState, useRef } from "react";
import { upload } from "@vercel/blob/client";
import { Upload, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { registerUploadRef } from "../../Context/CMSContext";

const ALLOWED_MIMES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 4 * 1024 * 1024;

export default function ImageUploader({ onUploadSuccess, label = "Upload Image" }) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successBlobUrl, setSuccessBlobUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_MIMES.includes(file.type)) {
      setErrorMessage("Only JPEG, PNG, and WebP images are allowed.");
      return;
    }

    if (file.size > MAX_BYTES) {
      setErrorMessage("File exceeds 4 MiB limit.");
      return;
    }

    setIsUploading(true);
    setErrorMessage(null);
    setSuccessBlobUrl(null);

    try {
      const clientGeneratedUploadId = crypto.randomUUID();
      const rawExt = (file.name.split(".").pop() || "webp").toLowerCase().replace(/[^a-z0-9]/g, "");
      const ext = ["jpeg", "jpg", "png", "webp"].includes(rawExt) ? rawExt : "webp";
      const targetPathname = `cms-uploads/${clientGeneratedUploadId}.${ext}`;

      const newBlob = await upload(targetPathname, file, {
        access: "public",
        handleUploadUrl: "/api/cms-upload-token",
        clientPayload: JSON.stringify({ uploadId: clientGeneratedUploadId }),
      });

      const uploadId = clientGeneratedUploadId;

      const completeRes = await fetch("/api/cms-upload-complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          uploadId,
          pathname: targetPathname,
          blobUrl: newBlob.url,
          contentType: file.type,
          sizeBytes: file.size,
        }),
      });

      if (!completeRes.ok) {
        const errData = await completeRes.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to confirm upload completion");
      }

      registerUploadRef({ uploadId, blobUrl: newBlob.url });
      setSuccessBlobUrl(newBlob.url);
      if (onUploadSuccess) {
        onUploadSuccess({
          uploadId,
          blobUrl: newBlob.url,
        });
      }
    } catch (err) {
      console.error("Blob upload error:", err);
      setErrorMessage(err.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
      >
        {isUploading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Upload className="w-4 h-4" />
        )}
        {isUploading ? "Uploading to Blob..." : label}
      </button>
      {errorMessage && (
        <div className="flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
      {successBlobUrl && (
        <div className="flex items-center gap-1.5 text-xs text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Upload ready and registered.</span>
        </div>
      )}
    </div>
  );
}
