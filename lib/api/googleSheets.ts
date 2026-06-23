/**
 * Google Sheets API Integration
 * Automatically log form submissions to Google Sheets
 * Gracefully handles missing configuration (works without Google Sheets in dev/preview)
 */

let sheets: any = null;

async function getGoogleSheetsClient() {
  if (sheets) return sheets;

  // Skip if no credentials configured
  if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL || !process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
    return null;
  }

  try {
    const { google } = await import('googleapis');
    
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    sheets = google.sheets({ version: 'v4', auth });
    return sheets;
  } catch (error) {
    console.error('Failed to initialize Google Sheets client:', error);
    return null;
  }
}

/**
 * Append a row to a Google Sheet
 */
async function appendRow(
  spreadsheetId: string,
  sheetName: string,
  values: any[]
) {
  const client = await getGoogleSheetsClient();
  
  if (!client) {
    console.warn('Google Sheets client not available - skipping log');
    return false;
  }

  try {
    await client.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:Z`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [values],
      },
    });

    return true;
  } catch (error) {
    console.error('Error appending to Google Sheets:', error);
    return false;
  }
}

/**
 * Log contact form submission
 */
export async function logContactForm(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  
  if (!spreadsheetId) {
    console.warn('Google Sheets Spreadsheet ID not configured - skipping log');
    return false;
  }

  const timestamp = new Date().toISOString();
  const values = [
    timestamp,
    'Contacto',
    data.name,
    data.email,
    data.phone,
    data.subject,
    data.message,
  ];

  return await appendRow(spreadsheetId, 'Contacto', values);
}

/**
 * Log quote request
 */
export async function logQuoteRequest(data: {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  quantity: number;
  description: string;
}) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  
  if (!spreadsheetId) {
    console.warn('Google Sheets Spreadsheet ID not configured - skipping log');
    return false;
  }

  const timestamp = new Date().toISOString();
  const values = [
    timestamp,
    'Presupuesto',
    data.name,
    data.email,
    data.phone,
    data.serviceType,
    data.quantity,
    data.description,
  ];

  return await appendRow(spreadsheetId, 'Presupuestos', values);
}

/**
 * Log user registration
 */
export async function logUserRegistration(data: {
  name: string;
  email: string;
  phone: string;
}) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  
  if (!spreadsheetId) {
    console.warn('Google Sheets Spreadsheet ID not configured - skipping log');
    return false;
  }

  const timestamp = new Date().toISOString();
  const values = [
    timestamp,
    'Registro',
    data.name,
    data.email,
    data.phone,
  ];

  return await appendRow(spreadsheetId, 'Usuarios', values);
}
