# Shopify Storefront API Setup Guide

This guide will help you integrate your Shopify store with the DEEE TODO platform.

## Prerequisites

- A Shopify store (free trial available at shopify.com)
- Admin access to your Shopify store

## Step 1: Create a Custom App

1. Log in to your Shopify admin panel
2. Go to **Settings** → **Apps and sales channels**
3. Click **Develop apps** → **Create an app**
4. Name your app (e.g., "DEEE TODO Headless")
5. Click **Create app**

## Step 2: Configure Storefront API Access

1. In your app settings, click **Configure Storefront API scopes**
2. Enable the following permissions:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_read_product_pickup_locations`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_content`

3. Click **Save**

## Step 3: Get Your API Credentials

1. Click **Install app** to install it on your store
2. After installation, go to **API credentials** tab
3. Under **Storefront API access token**, click **Copy**
4. Save this token - you'll need it for your `.env.local` file

## Step 4: Get Your Store Domain

Your store domain is in the format: `your-store-name.myshopify.com`

You can find it in your Shopify admin URL or in your store settings.

## Step 5: Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token_here
```

Replace:
- `your-store.myshopify.com` with your actual store domain
- `your_storefront_access_token_here` with the token from Step 3

## Step 6: Add Products to Your Shopify Store

1. In Shopify admin, go to **Products**
2. Click **Add product**
3. Fill in product details:
   - Title
   - Description
   - Price
   - Images
   - Product type (will be used as category)
   - Tags

4. Make sure to set the product as **Available** on your sales channels

## Step 7: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000/tienda`
3. You should see your Shopify products displayed

## Step 8: Product Categories

Products are categorized based on the **Product Type** field in Shopify:
- Textil
- Regalos
- Cartelería
- Vinilos

Set appropriate product types for proper categorization.

## Troubleshooting

### Products not showing up?

1. **Check API credentials**: Make sure your Storefront API token is correct
2. **Verify product availability**: Products must be available on the "Headless" sales channel
3. **Check console errors**: Look for API errors in browser console
4. **Verify CORS**: Shopify Storefront API should allow your domain

### Cart not working?

1. **Check checkout permissions**: Ensure `unauthenticated_write_checkouts` is enabled
2. **Test cart creation**: Check browser console for cart creation errors
3. **Verify domain**: Make sure you're using the correct store domain

### Need to add custom fields?

You can extend the Shopify GraphQL queries in `/lib/api/shopify.ts` to fetch additional product metafields.

## Production Deployment

When deploying to production:

1. Update `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` with your custom domain if you have one
2. Ensure all API tokens are set in your hosting platform's environment variables
3. Test checkout flow thoroughly
4. Set up Shopify webhooks for real-time inventory updates (optional)

## Additional Resources

- [Shopify Storefront API Documentation](https://shopify.dev/docs/api/storefront)
- [Shopify GraphQL Explorer](https://shopify.dev/docs/apps/tools/graphiql-admin-api)
- [Custom Storefronts Guide](https://shopify.dev/docs/custom-storefronts)

## Support

For issues specific to this integration, check:
- `/lib/api/shopify.ts` - API client implementation
- `/lib/stores/cartStore.ts` - Cart state management
- `/components/ui/ProductCard.tsx` - Product display logic
