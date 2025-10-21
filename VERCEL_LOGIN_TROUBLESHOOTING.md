# Vercel Admin Login Troubleshooting Guide

## Common Issues & Solutions

### 1. Environment Variables Missing
Make sure these are set in Vercel Dashboard → Project Settings → Environment Variables:

```bash
# Required Environment Variables
DATABASE_URL=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key_here
NEXTAUTH_URL=https://your-app.vercel.app
```

### 2. Database Connection Issues
- Ensure your MongoDB database is accessible from Vercel
- Check if your MongoDB Atlas IP whitelist includes Vercel's IP ranges
- For MongoDB Atlas, add `0.0.0.0/0` to IP whitelist (less secure but works)

### 3. NextAuth Configuration Issues
The updated auth.ts now includes:
- `trustHost: true` - Required for Vercel
- Better error logging
- Proper session configuration
- Error page redirect

### 4. Admin User Creation
Make sure you have an admin user in your database:

```bash
# Run this locally to create admin user
npm run create-admin
```

Or manually create in MongoDB:
```json
{
  "email": "admin@example.com",
  "password": "$2a$10$hashedpassword",
  "name": "Admin User",
  "role": "admin"
}
```

### 5. Debugging Steps

#### Check Vercel Function Logs:
1. Go to Vercel Dashboard → Functions tab
2. Look for errors in `/api/auth/*` endpoints
3. Check for database connection errors

#### Test Database Connection:
Create a test API route to verify database connection:

```typescript
// app/api/test-db/route.ts
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    return Response.json({ success: true, userCount });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

### 6. Quick Fixes to Try

1. **Redeploy** - Sometimes a fresh deployment fixes issues
2. **Check Environment Variables** - Ensure all are set correctly
3. **Database Permissions** - Verify MongoDB user has read/write access
4. **Network Access** - Ensure database is accessible from Vercel

### 7. Testing Checklist

- [ ] Environment variables set in Vercel
- [ ] Database accessible from Vercel
- [ ] Admin user exists in database
- [ ] NEXTAUTH_SECRET is set
- [ ] NEXTAUTH_URL matches your Vercel domain
- [ ] No CORS issues
- [ ] Database connection string is correct

### 8. If Still Not Working

Check Vercel logs for specific errors:
1. Go to Vercel Dashboard → Functions
2. Click on your project
3. Check the logs for `/api/auth/callback/credentials`
4. Look for specific error messages

Common error patterns:
- `ECONNREFUSED` - Database connection issue
- `Invalid credentials` - User not found or wrong password
- `JWT_SECRET` errors - Missing NEXTAUTH_SECRET
