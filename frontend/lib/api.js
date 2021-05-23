export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchStrapiAPI(path) {
  const strapiURL = getStrapiURL(path);
  const response = await fetch(strapiURL);
  const data = await response.json();
  return data;
}

export async function fetchAPI(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
