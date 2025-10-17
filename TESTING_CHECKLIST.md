# Testing Checklist - Admin Portal

## ✅ Pre-Test Setup

- [ ] `.env` file created with correct values:
  ```env
  DATABASE_URL="mongodb+srv://23bcs037:2PNRnxkGdUPdjv4r@cluster0.q5kwrtg.mongodb.net/attrangi-insights?retryWrites=true&w=majority"
  NEXTAUTH_URL="http://localhost:3000"
  NEXTAUTH_SECRET="<generated-secret-here>"
  ```

- [ ] Generate NEXTAUTH_SECRET:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
  ```

- [ ] Push database schema:
  ```bash
  npm run prisma:push
  ```

- [ ] Dev server running:
  ```bash
  npm run dev
  ```

## 🧪 Test Cases

### Test 1: Landing Page (No Sign-in)
- [ ] Visit: http://localhost:3000
- [ ] **Verify**: No "Sign-in" button in header
- [ ] **Verify**: "Get Started" button points to #services (not signin)
- [ ] **Verify**: All sections visible (About, Services, Footer)

### Test 2: Admin Signup Page
- [ ] Visit: http://localhost:3000/admin/signup
- [ ] **Verify**: Form displays with 4 fields (Name, Email, Password, Confirm Password)
- [ ] **Verify**: "Already have an account? Sign in" link present

#### Test 2.1: Validation - Password Mismatch
- [ ] Fill in form with mismatched passwords
- [ ] Click "Create Account"
- [ ] **Expected**: Error message "Passwords do not match"

#### Test 2.2: Validation - Short Password
- [ ] Fill in form with password < 6 characters
- [ ] Click "Create Account"
- [ ] **Expected**: Error message "Password must be at least 6 characters"

#### Test 2.3: Validation - Empty Fields
- [ ] Leave any field empty
- [ ] Click "Create Account"
- [ ] **Expected**: HTML5 validation error (required field)

#### Test 2.4: Successful Signup
- [ ] Fill in all fields correctly:
  - Name: Test Admin
  - Email: test@admin.com
  - Password: test123
  - Confirm Password: test123
- [ ] Click "Create Account"
- [ ] **Expected**: Redirect to /admin/login
- [ ] **Expected**: Green success message "Account created successfully! Please sign in."

#### Test 2.5: Duplicate Email
- [ ] Try to signup with same email again
- [ ] **Expected**: Error message "User with this email already exists"

### Test 3: Admin Login Page
- [ ] Visit: http://localhost:3000/admin/login
- [ ] **Verify**: Form displays with 2 fields (Email, Password)
- [ ] **Verify**: "Don't have an account? Sign up" link present
- [ ] **Verify**: If redirected from signup, success message shows

#### Test 3.1: Invalid Credentials
- [ ] Enter wrong email or password
- [ ] Click "Sign in"
- [ ] **Expected**: Error message "Invalid email or password"

#### Test 3.2: Successful Login
- [ ] Enter correct credentials (from Test 2.4)
- [ ] Click "Sign in"
- [ ] **Expected**: Redirect to /admin/dashboard
- [ ] **Expected**: Dashboard shows with user email in header

### Test 4: Admin Dashboard (Protected)
- [ ] Visit: http://localhost:3000/admin/dashboard (while logged in)
- [ ] **Verify**: Dashboard displays
- [ ] **Verify**: User email shown in header
- [ ] **Verify**: "Sign Out" button present
- [ ] **Verify**: Two cards visible: "Manage Blogs" and "Manage Products"

#### Test 4.1: Protected Route - Unauthenticated
- [ ] Sign out
- [ ] Try to visit: http://localhost:3000/admin/dashboard
- [ ] **Expected**: Redirect to /admin/login

### Test 5: Sign Out
- [ ] From dashboard, click "Sign Out"
- [ ] **Expected**: Redirect to /admin/login
- [ ] **Expected**: Session cleared

### Test 6: Blog Management
- [ ] From dashboard, click "Manage Blogs"
- [ ] **Verify**: Navigate to /admin/blogs
- [ ] **Verify**: "Create New Blog" button visible
- [ ] **Verify**: "Back" link to dashboard works

#### Test 6.1: Create New Blog
- [ ] Click "Create New Blog"
- [ ] **Verify**: Navigate to /admin/blogs/new
- [ ] Fill in blog details:
  - Title: Test Blog
  - Slug: Auto-generated (test-blog)
  - Content: Test content
  - Excerpt: Test excerpt (optional)
  - Image URL: (optional)
  - Published: Check/uncheck
- [ ] Click "Create Blog"
- [ ] **Expected**: Redirect to /admin/blogs
- [ ] **Expected**: New blog appears in list

#### Test 6.2: Delete Blog
- [ ] From blogs list, click "Delete" on a blog
- [ ] **Expected**: Confirmation dialog
- [ ] Confirm deletion
- [ ] **Expected**: Blog removed from list

### Test 7: Product Management
- [ ] From dashboard, click "Manage Products"
- [ ] **Verify**: Navigate to /admin/products
- [ ] **Verify**: "Create New Product" button visible
- [ ] **Verify**: "Back" link to dashboard works

#### Test 7.1: Create New Product
- [ ] Click "Create New Product"
- [ ] **Verify**: Navigate to /admin/products/new
- [ ] Fill in product details:
  - Name: Test Product
  - Slug: Auto-generated (test-product)
  - Description: Test description
  - Price: 99.99
  - Stock: 10
  - Category: Test Category
  - Images: (comma-separated URLs)
  - Published: Check/uncheck
- [ ] Click "Create Product"
- [ ] **Expected**: Redirect to /admin/products
- [ ] **Expected**: New product appears in list

#### Test 7.2: Delete Product
- [ ] From products list, click "Delete" on a product
- [ ] **Expected**: Confirmation dialog
- [ ] Confirm deletion
- [ ] **Expected**: Product removed from list

### Test 8: API Endpoints

#### Test 8.1: Signup API
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"API Test","email":"apitest@test.com","password":"test123"}'
```
- [ ] **Expected**: Status 201, success response

#### Test 8.2: Blogs API - Get All
```bash
curl http://localhost:3000/api/blogs
```
- [ ] **Expected**: Status 200, array of blogs

#### Test 8.3: Products API - Get All
```bash
curl http://localhost:3000/api/products
```
- [ ] **Expected**: Status 200, array of products

### Test 9: Database Verification
- [ ] Run: `npx prisma studio`
- [ ] **Verify**: Database has 3 collections:
  - User (with test admin account)
  - Blog (with test blog if created)
  - Product (with test product if created)

## 🐛 Common Issues & Solutions

### Issue 1: "Invalid credentials" on login
- **Solution**: Make sure you pushed the schema: `npm run prisma:push`
- **Solution**: Verify MongoDB connection in .env file

### Issue 2: Can't access MongoDB
- **Solution**: Check if your IP is whitelisted in MongoDB Atlas
- **Solution**: Verify DATABASE_URL is correct

### Issue 3: Next Auth errors
- **Solution**: Verify NEXTAUTH_SECRET is set in .env
- **Solution**: Restart dev server after changing .env

### Issue 4: "Module not found" errors
- **Solution**: Run `npm install` again
- **Solution**: Run `npm run prisma:generate`

### Issue 5: Middleware not protecting routes
- **Solution**: Check middleware.ts matcher config
- **Solution**: Restart dev server

## ✅ Success Criteria

All tests should pass with:
- ✅ No console errors
- ✅ Proper redirects working
- ✅ Data persisting in MongoDB
- ✅ Authentication working correctly
- ✅ Protected routes inaccessible when logged out
- ✅ Forms validating correctly
- ✅ Error messages displaying properly

## 📝 Notes

- Test in both Chrome and Firefox for compatibility
- Clear browser cache if seeing stale data
- Check browser console for any JavaScript errors
- Monitor terminal for server-side errors
- Use MongoDB Compass or Prisma Studio to verify data

