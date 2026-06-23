/**
 * Shopify Storefront API Client
 * Headless commerce integration for DEEE TODO
 * Gracefully handles missing configuration (uses sample data in dev)
 */

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
const SHOPIFY_API_VERSION = '2024-01';

/**
 * Check if Shopify is configured
 */
function isShopifyConfigured(): boolean {
  return Boolean(SHOPIFY_STORE_DOMAIN && SHOPIFY_STOREFRONT_ACCESS_TOKEN);
}

interface ShopifyResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

/**
 * Make a request to Shopify Storefront API
 */
async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<T> {
  if (!isShopifyConfigured()) {
    throw new Error('Shopify not configured');
  }

  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`);
  }

  const json: ShopifyResponse<T> = await response.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
}

/**
 * Get all products
 */
export async function getProducts(limit: number = 50) {
  if (!isShopifyConfigured()) return [];

  const query = `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            description
            handle
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  id
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            tags
            productType
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch<any>({
      query,
      variables: { first: limit },
    });

    return response.products.edges.map((edge: any) => ({
      id: edge.node.id,
      title: edge.node.title,
      description: edge.node.description,
      handle: edge.node.handle,
      price: parseFloat(edge.node.priceRange.minVariantPrice.amount),
      compareAtPrice: edge.node.compareAtPriceRange?.minVariantPrice?.amount
        ? parseFloat(edge.node.compareAtPriceRange.minVariantPrice.amount)
        : undefined,
      images: edge.node.images.edges.map((img: any) => ({
        id: img.node.id,
        url: img.node.url,
        altText: img.node.altText,
      })),
      variants: edge.node.variants.edges.map((variant: any) => ({
        id: variant.node.id,
        title: variant.node.title,
        price: parseFloat(variant.node.price.amount),
        available: variant.node.availableForSale,
        selectedOptions: variant.node.selectedOptions,
      })),
      category: edge.node.productType,
      tags: edge.node.tags,
      available: edge.node.availableForSale,
    }));
  } catch (error) {
    console.error('Failed to fetch products from Shopify:', error);
    return [];
  }
}

/**
 * Get a single product by handle
 */
export async function getProduct(handle: string) {
  if (!isShopifyConfigured()) return null;

  const query = `
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        description
        descriptionHtml
        handle
        availableForSale
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              id
              url
              altText
              width
              height
            }
          }
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              availableForSale
              quantityAvailable
              price {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
        tags
        productType
        seo {
          title
          description
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch<any>({
      query,
      variables: { handle },
    });

    const product = response.product;
    if (!product) return null;

    return {
      id: product.id,
      title: product.title,
      description: product.description,
      descriptionHtml: product.descriptionHtml,
      handle: product.handle,
      price: parseFloat(product.priceRange.minVariantPrice.amount),
      compareAtPrice: product.compareAtPriceRange?.minVariantPrice?.amount
        ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
        : undefined,
      images: product.images.edges.map((img: any) => ({
        id: img.node.id,
        url: img.node.url,
        altText: img.node.altText,
      })),
      variants: product.variants.edges.map((variant: any) => ({
        id: variant.node.id,
        title: variant.node.title,
        price: parseFloat(variant.node.price.amount),
        available: variant.node.availableForSale,
        quantityAvailable: variant.node.quantityAvailable,
        selectedOptions: variant.node.selectedOptions,
      })),
      category: product.productType,
      tags: product.tags,
      available: product.availableForSale,
      seo: product.seo,
    };
  } catch (error) {
    console.error('Failed to fetch product from Shopify:', error);
    return null;
  }
}

/**
 * Create a new cart
 */
export async function createCart() {
  if (!isShopifyConfigured()) {
    // Return mock cart for demo mode
    return {
      id: 'demo-cart-' + Date.now(),
      checkoutUrl: null,
      totalQuantity: 0,
      cost: { totalAmount: { amount: '0', currencyCode: 'EUR' } },
    };
  }

  const query = `
    mutation CreateCart {
      cartCreate {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const response = await shopifyFetch<any>({ query });

  if (response.cartCreate.userErrors.length > 0) {
    throw new Error(response.cartCreate.userErrors[0].message);
  }

  return response.cartCreate.cart;
}

/**
 * Add items to cart
 */
export async function addToCart(cartId: string, lines: Array<{ merchandiseId: string; quantity: number }>) {
  if (!isShopifyConfigured()) {
    // Return mock response for demo
    return {
      id: cartId,
      checkoutUrl: null,
      totalQuantity: lines.reduce((sum, l) => sum + l.quantity, 0),
      lines: { edges: [] },
      cost: { totalAmount: { amount: '0', currencyCode: 'EUR' } },
    };
  }

  const query = `
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const response = await shopifyFetch<any>({
    query,
    variables: { cartId, lines },
  });

  if (response.cartLinesAdd.userErrors.length > 0) {
    throw new Error(response.cartLinesAdd.userErrors[0].message);
  }

  return response.cartLinesAdd.cart;
}

/**
 * Update cart line quantities
 */
export async function updateCart(cartId: string, lines: Array<{ id: string; quantity: number }>) {
  if (!isShopifyConfigured()) {
    return { id: cartId, totalQuantity: 0, lines: { edges: [] }, cost: { totalAmount: { amount: '0' } } };
  }

  const query = `
    mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          totalQuantity
          lines(first: 100) {
            edges {
              node {
                id
                quantity
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const response = await shopifyFetch<any>({
    query,
    variables: { cartId, lines },
  });

  if (response.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(response.cartLinesUpdate.userErrors[0].message);
  }

  return response.cartLinesUpdate.cart;
}

/**
 * Remove items from cart
 */
export async function removeFromCart(cartId: string, lineIds: string[]) {
  if (!isShopifyConfigured()) {
    return { id: cartId, totalQuantity: 0, lines: { edges: [] }, cost: { totalAmount: { amount: '0' } } };
  }

  const query = `
    mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          totalQuantity
          lines(first: 100) {
            edges {
              node {
                id
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const response = await shopifyFetch<any>({
    query,
    variables: { cartId, lineIds },
  });

  if (response.cartLinesRemove.userErrors.length > 0) {
    throw new Error(response.cartLinesRemove.userErrors[0].message);
  }

  return response.cartLinesRemove.cart;
}

/**
 * Get cart by ID
 */
export async function getCart(cartId: string) {
  if (!isShopifyConfigured()) return null;

  const query = `
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        totalQuantity
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch<any>({
      query,
      variables: { cartId },
    });
    return response.cart;
  } catch (error) {
    console.error('Failed to fetch cart:', error);
    return null;
  }
}
