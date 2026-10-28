/**
 * Client-side Image & Video Optimizer and Cloud Uploader for CMS
 * Supports automatic client-side resizing, WebP compression, and direct Vercel Blob cloud upload.
 * Falls back gracefully to local canvas DataURL if cloud upload is unreachable (e.g. local offline dev).
 */

import { upload } from "@vercel/blob/client";
import { registerUploadRef } from "../../Context/CMSContext";

export const optimizeMediaFile = async (file) => {
  if (!file) {
    throw new Error("No file selected");
  }

  const isVideo = file.type && file.type.startsWith("video/");

  if (isVideo) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve({ type: "video", src: e.target.result });
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  // 1. Client-side canvas resize and compression to WebP (max 1920x1280, 0.82 quality)
  const { blob, dataUrl } = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const rawDataUrl = event.target.result;
      const img = new Image();
      img.onload = () => {
        try {
          const MAX_WIDTH = 1920;
          const MAX_HEIGHT = 1280;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          let fallbackUrl = canvas.toDataURL("image/webp", 0.82);
          if (!fallbackUrl.startsWith("data:image/webp")) {
            fallbackUrl = canvas.toDataURL("image/jpeg", 0.82);
          }

          canvas.toBlob(
            (b) => {
              if (b) {
                resolve({ blob: b, dataUrl: fallbackUrl });
              } else {
                resolve({ blob: file, dataUrl: rawDataUrl });
              }
            },
            "image/webp",
            0.82
          );
        } catch {
          resolve({ blob: file, dataUrl: rawDataUrl });
        }
      };
      img.onerror = () => resolve({ blob: file, dataUrl: rawDataUrl });
      img.src = rawDataUrl;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });

  // 2. Direct cloud upload to Vercel Blob with token & verification
  try {
    const clientGeneratedUploadId = crypto.randomUUID();
    const targetPathname = `cms-uploads/${clientGeneratedUploadId}.webp`;

    const uploadFile = new File([blob], `${clientGeneratedUploadId}.webp`, {
      type: "image/webp",
    });

    const newBlob = await upload(targetPathname, uploadFile, {
      access: "public",
      handleUploadUrl: "/api/cms-upload-token",
      clientPayload: JSON.stringify({ uploadId: clientGeneratedUploadId }),
    });

    const completeRes = await fetch("/api/cms-upload-complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        uploadId: clientGeneratedUploadId,
        pathname: targetPathname,
        blobUrl: newBlob.url,
        contentType: "image/webp",
        sizeBytes: uploadFile.size,
      }),
    });

    if (completeRes.ok) {
      // Register with CMS save tracking
      registerUploadRef({
        uploadId: clientGeneratedUploadId,
        blobUrl: newBlob.url,
      });

      return {
        type: "image",
        src: newBlob.url,
        uploadId: clientGeneratedUploadId,
      };
    } else {
      console.warn("Upload completion verification failed, falling back to local preview.");
    }
  } catch (cloudErr) {
    console.warn("Vercel Blob cloud upload not available; using local data URL fallback:", cloudErr?.message || cloudErr);
  }

  // 3. Graceful fallback to local canvas data URL
  return {
    type: "image",
    src: dataUrl,
  };
};

export { HOTEL_PRESET_PHOTOS } from "./presetPhotos";

