import { google } from 'googleapis';

/**
 * Google Sheets API Integration
 * Automatically log form submissions to Google Sheets
 */

// Initialize Google Sheets API
let sheets: any = null;

function getGoogleSheetsClient() {
  if (sheets) return sheets;

  try {
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
  const client = getGoogleSheetsClient();
  
  if (!client) {
    console.error('Google Sheets client not initialized');
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
    console.warn('Google Sheets Spreadsheet ID not configured');
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
    console.warn('Google Sheets Spreadsheet ID not configured');
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
    console.warn('Google Sheets Spreadsheet ID not configured');
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

/**
 * Create initial sheets structure
 * This should be run once to set up the spreadsheet
 */
export async function setupSpreadsheet() {
  const client = getGoogleSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  
  if (!client || !spreadsheetId) {
    console.error('Cannot set up spreadsheet: client or ID not available');
    return false;
  }

  try {
    // Create headers for each sheet
    const sheets = [
      {
        name: 'Contacto',
        headers: ['Fecha', 'Tipo', 'Nombre', 'Email', 'Teléfono', 'Asunto', 'Mensaje'],
      },
      {
        name: 'Presupuestos',
        headers: ['Fecha', 'Tipo', 'Nombre', 'Email', 'Teléfono', 'Servicio', 'Cantidad', 'Descripción'],
      },
      {
        name: 'Usuarios',
        headers: ['Fecha', 'Tipo', 'Nombre', 'Email', 'Teléfono'],
      },
    ];

    for (const sheet of sheets) {
      await client.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheet.name}!A1:Z1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [sheet.headers],
        },
      });
    }

    return true;
  } catch (error) {
    console.error('Error setting up spreadsheet:', error);
    return false;
  }
}
