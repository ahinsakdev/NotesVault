const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

const supportedImageTypes = new Set([
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export function validateImageFile(file: File): string | null {
  if (!supportedImageTypes.has(file.type)) {
    return "Choose a PNG, JPEG, WebP, or GIF image.";
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return "The image must be 5 MB or smaller.";
  }

  return null;
}

export function readImageFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("Unable to read the selected image."));
        return;
      }

      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new Error("Unable to read the selected image."));
    };

    reader.readAsDataURL(file);
  });
}

export function createImageDownloadName(alt: string): string {
  const normalizedName = alt
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${normalizedName || "notesvault-image"}.png`;
}

export function downloadImage(src: string, alt: string): void {
  const link = document.createElement("a");

  link.download = createImageDownloadName(alt);
  link.href = src;

  document.body.appendChild(link);
  link.click();
  link.remove();
}
