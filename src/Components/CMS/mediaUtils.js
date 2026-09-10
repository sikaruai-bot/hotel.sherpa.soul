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
  { label: "Budget Family Room (King + Single Bed)", path: "/triple.webp" },
  { label: "Deluxe King Room with Sofa", path: "/changes_photo/singleBedWithSofa.webp" },
  { label: "Family Room AC (Wood Panel & Balcony)", path: "/changes_photo/doubleBed.webp" },
  { label: "Twin Bed Room", path: "/changes_photo/doubleBedRoom.webp" },
  { label: "Balcony Scenic View", path: "/changes_photo/balkani.webp" },
  { label: "Executive Room Interior", path: "/room1/room.webp" },
  { label: "Cozy Bedroom Angle 2", path: "/room1/room2.webp" },
  { label: "Twin Room Setup", path: "/room3/DSC00136.webp" },
  { label: "Twin Room Angle 2", path: "/room3/DSC00137.webp" },
  { label: "Modern Washroom", path: "/changes_photo/washRoom.webp" },
  { label: "Luggage & Storage Room", path: "/changes_photo/storeRoom.webp" },
  { label: "Rooftop Skyline View", path: "/changes_photo/viewSeen.webp" },
  { label: "Kathmandu Valley Panorama", path: "/hero/hero1.webp" },
  { label: "Hotel Sherpa Soul Night Exterior", path: "/hero/hero2.webp" },
  { label: "Thamel Street Ambiance", path: "/hero/hero4.webp" },
  { label: "Double Bed Classic", path: "/double.webp" },
  { label: "Single Room", path: "/single.webp" },
  { label: "Hotel Front Desk & Reception", path: "/assets/frontdesk_new-JHvt5Fe8.webp" },
  { label: "Shared Self-Kitchen & Dining", path: "/assets/shared_kitchen_new-HROE-pWG.webp" },
  { label: "Hotel Logo", path: "/logo.webp" },
];
