# Fee Collection API Setup Guide

## Quick Setup

The fee collection service has been updated to use real API calls instead of mock data. Follow these steps to set it up:

### 1. Create Environment File

Create a `.env` file in your project root (same level as `package.json`):

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api

# Environment
NODE_ENV=development
```

### 2. Update API Base URL

Replace `http://localhost:3000/api` with your actual API endpoint if different.

### 3. Ensure Backend is Running

Make sure your backend API server is running and accessible at the configured URL.

### 4. Test the Connection

The fee collection service will now make real API calls to these endpoints:

- **Fee Types**: `/fee-collection/fee-types`
- **Fees**: `/fee-collection/fees`
- **Payments**: `/fee-collection/payments`
- **Analytics**: `/fee-collection/analytics/*`

## Error Handling

The service includes comprehensive error handling:

- Network errors are caught and displayed to users
- Failed requests return empty data arrays instead of crashing
- Console logs help debug connection issues

## Troubleshooting

If you see "Failed to fetch" errors:

1. Check that your backend API is running
2. Verify the API base URL in `.env`
3. Check browser console for detailed error logs
4. Ensure CORS is properly configured on your backend

## API Endpoints Expected

Your backend should implement these endpoints according to the `FEE_COLLECTION_API_SPEC.md`:

- `GET /fee-collection/fee-types` - List fee types
- `POST /fee-collection/fee-types` - Create fee type
- `GET /fee-collection/fees` - List fees
- `POST /fee-collection/fees` - Create fee
- `GET /fee-collection/payments` - List payments
- `POST /fee-collection/payments` - Record payment
- `GET /fee-collection/analytics/collection-summary` - Collection summary
- And more...

## Development vs Production

- **Development**: Uses `.env` file for configuration
- **Production**: Set environment variables on your hosting platform
