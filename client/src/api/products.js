const API_URL = import.meta.env.VITE_API_URL;

export async function getAllProducts() {
  const response = await fetch(`${API_URL}/api/products`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

export async function getProductBySlug(slug) {
  const response = await fetch(`${API_URL}/api/products/${slug}`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}
