# Admin Authentication Setup Guide

This guide will help you set up the admin authentication system with Next Auth, Prisma, and MongoDB.

## Prerequisites

- Node.js installed
- MongoDB database (local or MongoDB Atlas)
- npm or yarn package manager

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Connection String
DATABASE_URL="mongodb+srv://23bcs037:2PNRnxkGdUPdjv4r@cluster0.q5kwrtg.mongodb.net/attrangi-insights?retryWrites=true&w=majority"

# Next Auth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-this-in-production"
```

### Getting MongoDB Connection String

1. **MongoDB Atlas (Cloud)**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Click "Connect" → "Connect your application"
   - Copy the connection string and replace `<password>` with your actual password

2. **Local MongoDB**:
   ```
   DATABASE_URL="mongodb://localhost:27017/attrangi-insights"
   ```

### Generating NEXTAUTH_SECRET

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

Or use this Node.js command:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Prisma Client
```bash
npm run prisma:generate
```

### 3. Push Database Schema
This will create the necessary collections in MongoDB:
```bash
npm run prisma:push
```

### 4. Create Admin User
Create your first admin user with this command:
```bash
npm run create-admin <email> <password> [name]
```

Example:
```bash
npm run create-admin admin@attrangi.com MySecurePassword123 "Admin User"
```

### 5. Start Development Server
```bash
npm run dev
```

## Admin Routes

- **Sign Up**: `/admin/signup` - Create new admin account
- **Login**: `/admin/login` - Sign in to admin portal
- **Dashboard**: `/admin/dashboard`
- **Manage Blogs**: `/admin/blogs`
- **Create Blog**: `/admin/blogs/new`
- **Manage Products**: `/admin/products`
- **Create Product**: `/admin/products/new`

## Features

### Blog Management
- Create, edit, and delete blog posts
- Rich text content support
- SEO-friendly slugs (auto-generated from title)
- Draft/Published status
- Featured images
- Excerpts for previews

### Product Management
- Create, edit, and delete products
- Multiple product images
- Price and stock management
- Categories
- SEO-friendly slugs (auto-generated from name)
- Draft/Published status

### Authentication
- Secure credential-based authentication
- Password hashing with bcrypt
- JWT session management
- Protected admin routes with middleware
- Role-based access control (admin only)

## API Endpoints

### Blogs
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create new blog (authenticated)
- `GET /api/blogs/[id]` - Get single blog
- `PUT /api/blogs/[id]` - Update blog (authenticated)
- `DELETE /api/blogs/[id]` - Delete blog (authenticated)

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product (authenticated)
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product (authenticated)
- `DELETE /api/products/[id]` - Delete product (authenticated)

## Database Schema

### User Model
- `id`: Unique identifier
- `email`: User email (unique)
- `password`: Hashed password
- `name`: User name
- `role`: User role (default: "admin")
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### Blog Model
- `id`: Unique identifier
- `title`: Blog title
- `slug`: URL-friendly slug (unique)
- `content`: Blog content
- `excerpt`: Short description
- `image`: Featured image URL
- `published`: Publication status
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### Product Model
- `id`: Unique identifier
- `name`: Product name
- `slug`: URL-friendly slug (unique)
- `description`: Product description
- `price`: Product price
- `images`: Array of image URLs
- `category`: Product category
- `stock`: Available stock quantity
- `published`: Publication status
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## Security Features

- Password hashing with bcrypt
- JWT-based session management
- Protected routes with Next.js middleware
- Server-side authentication checks
- CSRF protection (via Next Auth)
- Secure HTTP-only cookies

## Troubleshooting

### Database Connection Issues
- Verify your MongoDB connection string in `.env`
- Check if MongoDB Atlas allows connections from your IP
- Ensure database user has proper permissions

### Prisma Client Not Found
```bash
npm run prisma:generate
```

### Authentication Not Working
- Verify `NEXTAUTH_SECRET` is set in `.env`
- Check `NEXTAUTH_URL` matches your application URL
- Clear browser cookies and try again

### Port Already in Use
Change the port in the dev command:
```bash
next dev -p 3001
```

## Production Deployment

1. Set environment variables in your hosting platform
2. Update `NEXTAUTH_URL` to your production domain
3. Generate a new `NEXTAUTH_SECRET` for production
4. Use MongoDB Atlas for production database
5. Run build command:
   ```bash
   npm run build
   ```

## Additional Commands

```bash
# View Prisma Studio (database GUI)
npx prisma studio

# Reset database (careful!)
npx prisma db push --force-reset

# View database migrations
npx prisma migrate status
```

## Support

For issues or questions, please contact the development team.

