/**
 * Client-side Image & Video Optimizer for CMS
 * Allows users to upload directly from their computer or phone without typing any file paths.
 */

export const optimizeMediaFile = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error("No file selected"));
    }

    const isVideo = file.type.startsWith("video/");

    if (isVideo) {
      const reader = new FileReader();
      reader.onload = (e) => resolve({ type: "video", src: e.target.result });
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const rawDataUrl = event.target.result;
      const img = new Image();
      img.onload = () => {
        try {
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 900;
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

          let dataUrl = canvas.toDataURL("image/webp", 0.78);
          if (!dataUrl.startsWith("data:image/webp")) {
            dataUrl = canvas.toDataURL("image/jpeg", 0.78);
          }

          resolve({ type: "image", src: dataUrl });
        } catch (e) {
          // Fallback to raw data url if canvas has any issue
          resolve({ type: "image", src: rawDataUrl });
        }
      };
      img.onerror = () => {
        // Fallback directly to raw data url
        resolve({ type: "image", src: rawDataUrl });
      };
      img.src = rawDataUrl;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export const HOTEL_PRESET_PHOTOS = [
  { label: "Deluxe King Room with Sofa (AC)", path: "/changes_photo/deluxeRoom_ai.webp" },
  { label: "Family Room AC (Wood Panel & Balcony)", path: "/changes_photo/doubleBed.webp" },
  { label: "Budget Family Room (King + Single Bed)", path: "/triple.webp" },
  { label: "Hotel Front Desk & 24/7 Reception", path: "/assets/frontdesk_new-JHvt5Fe8.webp" },
  { label: "Shared Self-Kitchen & Dining", path: "/assets/shared_kitchen_new-HROE-pWG.webp" },
  { label: "Hotel Sherpa Soul Thamel Main", path: "/hero1.webp" },
];
