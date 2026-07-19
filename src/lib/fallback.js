export const FALLBACK_IMAGE =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">' +
      '<rect width="500" height="500" fill="#F3DCE1"/>' +
      '<text x="50%" y="50%" font-family="Georgia, serif" font-size="28" fill="#9C3D52" text-anchor="middle" dominant-baseline="middle">Aurelle</text>' +
      "</svg>"
  );

export function handleImgError(e) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = FALLBACK_IMAGE;
}
