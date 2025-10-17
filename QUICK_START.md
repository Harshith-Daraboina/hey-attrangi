# Quick Start Guide - Admin Portal

## ✅ What's Been Set Up

Your admin authentication system is now fully configured with:
- ✅ Next Auth with credential-based authentication
- ✅ MongoDB integration via Prisma ORM
- ✅ Admin login page at `/admin/login`
- ✅ Protected admin routes with middleware
- ✅ Blog management system (create, edit, delete)
- ✅ Product management system (create, edit, delete)
- ✅ Beautiful, responsive UI with Tailwind CSS

## 🚀 Quick Setup (3 Steps)

### Step 1: Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="mongodb+srv://23bcs037:2PNRnxkGdUPdjv4r@cluster0.q5kwrtg.mongodb.net/attrangi-insights?retryWrites=true&w=majority"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

**Your MongoDB is already configured!** The connection string above is ready to use.

**Alternative - Local MongoDB:** `mongodb://localhost:27017/attrangi-insights`

**Generate NEXTAUTH_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Step 2: Setup Database

```bash
# Push schema to MongoDB
npm run prisma:push
```

You can now either:
- **Option A**: Create admin via signup page at `/admin/signup`
- **Option B**: Create admin via command line:
  ```bash
  npm run create-admin admin@example.com YourPassword123 "Admin Name"
  ```

### Step 3: Start the Application

```bash
npm run dev
```

Then visit:
- **Sign Up**: http://localhost:3000/admin/signup (Create your account)
- **Login**: http://localhost:3000/admin/login (After creating account)

## 📋 Admin Features

### Dashboard (`/admin/dashboard`)
Central hub with quick access to:
- Blog management
- Product management

### Blog Management (`/admin/blogs`)
- Create new blog posts
- Edit existing posts
- Delete posts
- Toggle draft/published status
- Auto-generate SEO-friendly slugs
- Add featured images and excerpts

### Product Management (`/admin/products`)
- Create new products
- Edit product details
- Delete products
- Manage pricing and stock
- Multiple product images
- Category organization
- Toggle draft/published status

## 🔐 Security Features

- Password hashing with bcrypt (10 rounds)
- JWT-based sessions
- Protected routes via middleware
- Server-side authentication checks
- Role-based access (admin only)

## 📁 Project Structure

```
Attrangi-Web/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/    # Next Auth handler
│   │   ├── blogs/                  # Blog API endpoints
│   │   └── products/               # Product API endpoints
│   ├── admin/
│   │   ├── login/                  # Login page
│   │   ├── dashboard/              # Admin dashboard
│   │   ├── blogs/                  # Blog management
│   │   └── products/               # Product management
│   └── generated/prisma/           # Generated Prisma client
├── components/
│   └── SessionProvider.tsx         # Next Auth session wrapper
├── lib/
│   ├── auth.ts                     # Auth configuration
│   └── prisma.ts                   # Prisma client instance
├── prisma/
│   └── schema.prisma               # Database schema
├── scripts/
│   └── create-admin.ts             # Admin user creation script
├── types/
│   └── next-auth.d.ts              # TypeScript definitions
└── middleware.ts                   # Route protection
```

## 🛠️ Useful Commands

```bash
# Development
npm run dev                         # Start dev server
npm run build                       # Build for production
npm run start                       # Start production server

# Database
npm run prisma:generate             # Generate Prisma client
npm run prisma:push                 # Push schema to database
npx prisma studio                   # Open database GUI

# Admin Management
npm run create-admin <email> <password> [name]
```

## 🌐 Routes

| Route | Description | Protected |
|-------|-------------|-----------|
| `/admin/signup` | Admin registration | No |
| `/admin/login` | Admin login page | No |
| `/admin/dashboard` | Admin dashboard | Yes |
| `/admin/blogs` | Blog list | Yes |
| `/admin/blogs/new` | Create blog | Yes |
| `/admin/blogs/edit/[id]` | Edit blog | Yes |
| `/admin/products` | Product list | Yes |
| `/admin/products/new` | Create product | Yes |
| `/admin/products/edit/[id]` | Edit product | Yes |

## 📝 Next Steps

1. **Configure .env file**
   - MongoDB URL is already provided in Step 1
   - Generate and add NEXTAUTH_SECRET

2. **Initialize database**
   ```bash
   npm run prisma:push
   ```

3. **Start the application**
   ```bash
   npm run dev
   ```

4. **Create your admin account**
   - Visit http://localhost:3000/admin/signup
   - Fill in your details and create account
   - OR use CLI: `npm run create-admin your@email.com password123 "Your Name"`

5. **Login and start managing**
   - Visit http://localhost:3000/admin/login
   - Use your credentials to sign in

## 💡 Tips

- Use MongoDB Atlas for quick cloud setup (free tier available)
- Run `npx prisma studio` to view/edit database directly
- Check `ADMIN_SETUP.md` for detailed documentation
- Admin credentials are hashed and stored securely

## ⚠️ Important Notes

- Never commit `.env` file to git (already in .gitignore)
- Change `NEXTAUTH_SECRET` in production
- Use strong passwords for admin accounts
- Update `NEXTAUTH_URL` when deploying to production

## 🆘 Need Help?

Check `ADMIN_SETUP.md` for:
- Detailed setup instructions
- Troubleshooting guide
- API documentation
- Database schema details
- Security best practices

---

**You're all set!** 🎉 The admin portal is ready to use.

