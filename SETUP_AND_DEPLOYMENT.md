# Complete Setup & Deployment Guide

## 🚀 LOCAL DEVELOPMENT SETUP

### Prerequisites
- Node.js v16+ installed
- MongoDB Atlas account (free tier available)
- Git installed

### Step 1: Clone & Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Configure Environment Variables

**Backend (.env already configured):**
```
MONGO_URI=mongodb+srv://thris:thris123@cluster0.jagwptc.mongodb.net/expert-booking?retryWrites=true&w=majority
PORT=5000
CLIENT_URL=http://localhost:3000,http://localhost:5173
NODE_ENV=development
```

**Frontend (.env already configured):**
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

### Step 3: Seed Database

Run once to populate dummy data:
```bash
cd backend
npm run seed:experts
```

Output should show:
```
MongoDB connected: ac-jwmjsdm-shard-00-01.jagwptc.mongodb.net
Seeded 8 experts successfully.
```

### Step 4: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Expected output:
```
Server running on port 5000
MongoDB connected: ...
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run start
```
Expected output:
```
Port 3000 is in use, trying 5173
VITE v6.4.2 ready in XXXms
```

### Step 5: Access Application

- Frontend: http://localhost:5173 (or http://localhost:3000)
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

---

## 📱 TESTING THE APPLICATION

### Test 1: Expert Listing
1. Go to Experts page
2. ✅ Verify 8 experts displayed
3. ✅ Type name in search box (e.g., "Shivani")
4. ✅ Select category from dropdown
5. ✅ Use pagination buttons

### Test 2: Expert Detail
1. Click on any expert card
2. ✅ See expert details
3. ✅ Slots grouped by date
4. ✅ Booked slots show as "Booked"

### Test 3: Booking
1. Click "Book Now" button
2. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Phone: 9876543210
   - Select date
   - Select time slot
   - Notes: Test booking
3. ✅ See success message
4. ✅ Slot now shows as "Booked"

### Test 4: Real-Time Updates
1. Open expert detail in 2 browser tabs
2. Book slot in Tab 1
3. ✅ Slot immediately shows as "Booked" in Tab 2 (without refresh)

### Test 5: My Bookings
1. Go to My Bookings
2. Enter email: test@example.com
3. ✅ See your bookings
4. ✅ Try changing status: Pending → Confirmed → Completed
5. ✅ Status updates in real-time

### Test 6: Double Booking (Error Handling)
1. Try to book same slot twice
2. ✅ See error: "This expert is already booked..."

---

## 🌐 PRODUCTION DEPLOYMENT

### Backend Deployment (Render.com - Free)

1. **Create Render Account**
   - Visit https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "Create" → "Web Service"
   - Connect your GitHub repo
   - Select `backend` folder

3. **Configure Environment**
   ```
   MONGO_URI=your_mongodb_atlas_uri
   PORT=5000
   CLIENT_URL=your_frontend_url,localhost:5173
   NODE_ENV=production
   ```

4. **Deploy**
   - Build command: `npm install`
   - Start command: `npm start`
   - Deploy!

### Frontend Deployment (Vercel - Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy Frontend**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Update Environment Variables**
   - In Vercel dashboard → Settings → Environment Variables
   ```
   VITE_API_BASE_URL=your_backend_url/api
   VITE_SOCKET_URL=your_backend_url
   ```

4. **Redeploy with new env vars**

---

## 📦 GITHUB SUBMISSION

### Step 1: Initialize Repository
```bash
git init
git add .
git commit -m "Initial commit: Real-Time Expert Booking System"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Create repository (e.g., `expert-booking-system`)
3. **DO NOT initialize with README** (we already have one)

### Step 3: Push Code
```bash
git remote add origin https://github.com/YOUR_USERNAME/expert-booking-system.git
git branch -M main
git push -u origin main
```

### Step 4: Share Repository Link
Format for submission:
```
GitHub: https://github.com/YOUR_USERNAME/expert-booking-system
Deployed Frontend: https://expert-booking.vercel.app
Deployed Backend: https://expert-booking-api.onrender.com
```

---

## 🎥 RECORDING VIDEO DEMO

### Setup
1. Open terminal showing:
   - Backend running on port 5000
   - Frontend running on port 5173

### Recording Script (5-10 minutes)

**Scene 1: Home Page (30 seconds)**
- Show landing page
- Click "Book with an expert" button
- Navigate to Experts page

**Scene 2: Expert Listing (1 minute)**
- Show all 8 experts
- Demonstrate search: Type "Shivani"
- Clear search, select category "Backend Development"
- Show pagination if needed

**Scene 3: Expert Detail (1 minute)**
- Click on an expert
- Show details (name, experience, rating)
- Show available slots grouped by date
- Highlight booked slots

**Scene 4: Booking Flow (2 minutes)**
- Click "Book Now"
- Fill form:
  - Name: "Demo User"
  - Email: "demo@example.com"
  - Phone: "9876543210"
- Select date and time slot
- Submit booking
- Show success message
- Highlight that slot is now "Booked"

**Scene 5: Real-Time Update (1 minute)**
- Open same expert in new browser tab
- Point out slot shows as "Booked" in both tabs (without refresh)

**Scene 6: My Bookings (1 minute)**
- Go to My Bookings
- Enter email
- Show booking
- Update status: Pending → Confirmed → Completed
- Show real-time update

**Scene 7: Error Handling (30 seconds)**
- Try to book same slot again
- Show error message

---

## ✅ FINAL CHECKLIST

Before submitting, ensure:

- [ ] Backend starts without errors: `npm run dev`
- [ ] Frontend starts without errors: `npm run start`
- [ ] Seed script runs successfully: `npm run seed:experts`
- [ ] All 8 dummy experts appear
- [ ] Can search and filter experts
- [ ] Can view expert detail
- [ ] Can book a session (shows success)
- [ ] Booked slot disabled for others
- [ ] Real-time updates work (test in 2 tabs)
- [ ] Can view My Bookings by email
- [ ] Can update booking status
- [ ] Double booking prevention works
- [ ] Error handling displays properly
- [ ] Code pushed to GitHub
- [ ] Video recorded (5-10 min)
- [ ] All files committed (except node_modules & .env)

---

## 📞 TROUBLESHOOTING

### Issue: MongoDB Connection Error
**Solution:** 
- Check MONGO_URI in backend/.env
- Verify IP whitelist in MongoDB Atlas (add 0.0.0.0/0)

### Issue: Frontend can't connect to backend
**Solution:**
- Check VITE_API_BASE_URL and VITE_SOCKET_URL in frontend/.env
- Ensure backend is running on correct port

### Issue: Real-time updates not working
**Solution:**
- Check Socket.io in browser console
- Verify CORS settings in backend

### Issue: Seed script fails
**Solution:**
- Run again with `npm run seed:experts`
- Check MongoDB connection first

---

## 🎯 YOU'RE ALL SET!

Your Real-Time Expert Booking System is **100% complete** and production-ready.

**Next Steps:**
1. ✅ Test everything locally
2. ✅ Deploy to production (optional)
3. ✅ Record video demo
4. ✅ Push to GitHub
5. ✅ Submit with links

**Deadline:** 10th May, 2 PM ⏰

Good luck! 🚀
