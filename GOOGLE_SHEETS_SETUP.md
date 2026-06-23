# Google Sheets API Setup Guide

This guide will help you integrate Google Sheets for automatic form submission logging.

## Why Google Sheets?

Google Sheets provides a simple, accessible way to:
- Log all form submissions automatically
- Track user registrations
- Monitor quote requests
- Access data from anywhere
- Share with team members easily

## Prerequisites

- A Google account
- Access to Google Cloud Console

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **Select a project** → **New Project**
3. Name your project (e.g., "DEEE TODO Forms")
4. Click **Create**

## Step 2: Enable Google Sheets API

1. In your project, go to **APIs & Services** → **Library**
2. Search for "Google Sheets API"
3. Click on it and click **Enable**

## Step 3: Create Service Account

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **Service Account**
3. Fill in the details:
   - Service account name: `deee-todo-forms`
   - Service account ID: (auto-generated)
   - Description: "Service account for form submissions"
4. Click **Create and Continue**
5. Skip the optional steps and click **Done**

## Step 4: Generate Service Account Key

1. In the **Service Accounts** list, click on the account you just created
2. Go to the **Keys** tab
3. Click **Add Key** → **Create new key**
4. Choose **JSON** format
5. Click **Create**
6. The key file will download automatically - **Keep it safe!**

## Step 5: Extract Credentials

Open the downloaded JSON file. You'll need two values:

```json
{
  "client_email": "deee-todo-forms@your-project.iam.gserviceaccount.com",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
}
```

## Step 6: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **Blank** to create a new spreadsheet
3. Name it "DEEE TODO - Form Submissions"
4. Create three sheets (tabs):
   - **Contacto**
   - **Presupuestos**
   - **Usuarios**

5. For each sheet, add headers in row 1:

**Contacto:**
```
Fecha | Tipo | Nombre | Email | Teléfono | Asunto | Mensaje
```

**Presupuestos:**
```
Fecha | Tipo | Nombre | Email | Teléfono | Servicio | Cantidad | Descripción
```

**Usuarios:**
```
Fecha | Tipo | Nombre | Email | Teléfono
```

## Step 7: Share Sheet with Service Account

1. Click the **Share** button in your Google Sheet
2. Add the `client_email` from your JSON key file
3. Give it **Editor** access
4. Uncheck "Notify people"
5. Click **Share**

## Step 8: Get Spreadsheet ID

The Spreadsheet ID is in the URL of your Google Sheet:

```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
```

Copy the ID between `/d/` and `/edit`

## Step 9: Configure Environment Variables

Add these to your `.env.local` file:

```bash
# Google Sheets Configuration
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
```

**Important Notes:**
- Keep the private key in quotes
- Keep the `\n` characters in the private key
- Never commit these credentials to version control

## Step 10: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to the contact page: `http://localhost:3000/contacto`

3. Fill out and submit the form

4. Check your Google Sheet - a new row should appear!

## Troubleshooting

### Error: "The caller does not have permission"

**Solution:** Make sure you shared the spreadsheet with the service account email and gave it Editor access.

### Error: "Unable to parse range"

**Solution:** Make sure your sheet names match exactly:
- "Contacto" (not "contacto")
- "Presupuestos" (not "presupuestos")
- "Usuarios" (not "usuarios")

### Error: "Private key is invalid"

**Solution:** 
1. Make sure the private key is wrapped in quotes in `.env.local`
2. Ensure `\n` characters are preserved
3. The key should start with `-----BEGIN PRIVATE KEY-----\n`

### Nothing appearing in sheets

**Solution:**
1. Check server console for errors
2. Verify environment variables are loaded
3. Make sure sheet names are spelled correctly
4. Confirm service account has Editor access

## Data Privacy & GDPR

When using Google Sheets to store user data:

1. **Inform users**: Update your privacy policy to mention data is stored in Google Sheets
2. **Limit access**: Only share the sheet with necessary team members
3. **Regular cleanup**: Delete old data according to your retention policy
4. **Secure backups**: Export data regularly and store securely
5. **Access logs**: Monitor who accesses the spreadsheet

## Production Deployment

For production:

1. **Use environment variables** in your hosting platform
2. **Rotate keys periodically** (every 90 days recommended)
3. **Set up alerts** for API quota limits
4. **Monitor usage** in Google Cloud Console
5. **Consider upgrading** to a database for high-volume operations

## Alternative: Direct Database Storage

For production sites with high traffic, consider:
- PostgreSQL (with Prisma)
- MongoDB
- Supabase
- Firebase

Google Sheets works great for:
- Small to medium traffic
- Simple data needs
- Easy team access
- Quick setup

## Support

For issues with:
- **Google Sheets API**: [Google Workspace Developer Docs](https://developers.google.com/sheets)
- **This integration**: Check `/lib/api/googleSheets.ts`
- **Form submissions**: Check `/app/api/contact/route.ts` and `/app/api/quote/route.ts`

## Security Checklist

- [ ] Service account JSON key is secure and not in version control
- [ ] `.env.local` is in `.gitignore`
- [ ] Private key has proper line breaks (`\n`)
- [ ] Spreadsheet is only shared with service account (not public)
- [ ] Environment variables are set in production
- [ ] API quotas are sufficient for your traffic
- [ ] Error logging is configured
- [ ] Privacy policy mentions Google Sheets storage
