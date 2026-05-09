# API Reference & Contracts

## Base URL
```
Development: http://localhost:5000/api
```

---

## 🔵 EXPERT APIs

### 1. Get All Experts (with search, filter, pagination)

**Endpoint:** `GET /experts`

**Query Parameters:**
```
page=1                    (optional, default: 1)
limit=12                  (optional, default: 10)
search=Shivani           (optional, searches by name)
category=Frontend Development  (optional, exact category match)
```

**Example Request:**
```bash
curl "http://localhost:5000/api/experts?page=1&limit=12&search=Shivani&category=Frontend%20Development"
```

**Response (Success - 200):**
```json
{
  "success": true,
  "experts": [
    {
      "_id": "645a1b2c3d4e5f6g7h8i9j0k",
      "name": "Shivani",
      "category": "Frontend Development",
      "experience": 5,
      "rating": 4.8,
      "bio": "Helps students build polished user interfaces...",
      "profileImage": "",
      "availableSlots": [
        {
          "date": "2026-05-10",
          "slots": ["10:00 AM", "11:00 AM", "2:00 PM"]
        }
      ],
      "createdAt": "2026-05-09T10:30:00Z",
      "updatedAt": "2026-05-09T10:30:00Z"
    }
  ],
  "totalPages": 1,
  "currentPage": 1
}
```

---

### 2. Get Expert By ID

**Endpoint:** `GET /experts/:id`

**Example Request:**
```bash
curl "http://localhost:5000/api/experts/645a1b2c3d4e5f6g7h8i9j0k"
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "_id": "645a1b2c3d4e5f6g7h8i9j0k",
    "name": "Shivani",
    "category": "Frontend Development",
    "experience": 5,
    "rating": 4.8,
    "bio": "Helps students build polished user interfaces...",
    "profileImage": "",
    "availableSlots": [
      {
        "date": "2026-05-10",
        "slots": ["10:00 AM", "11:00 AM", "2:00 PM"]
      }
    ]
  }
}
```

**Response (Error - 404):**
```json
{
  "message": "Expert not found"
}
```

---

## 🟠 BOOKING APIs

### 3. Create Booking

**Endpoint:** `POST /bookings`

**Request Body:**
```json
{
  "expertId": "645a1b2c3d4e5f6g7h8i9j0k",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "date": "2026-05-10",
  "timeSlot": "10:00 AM",
  "notes": "Looking forward to the session"
}
```

**Example Request:**
```bash
curl -X POST "http://localhost:5000/api/bookings" \
  -H "Content-Type: application/json" \
  -d '{
    "expertId": "645a1b2c3d4e5f6g7h8i9j0k",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "date": "2026-05-10",
    "timeSlot": "10:00 AM",
    "notes": "Looking forward"
  }'
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "_id": "645b2c3d4e5f6g7h8i9j0k1l",
    "expertId": "645a1b2c3d4e5f6g7h8i9j0k",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "date": "2026-05-10T00:00:00Z",
    "timeSlot": "10:00 AM",
    "notes": "Looking forward",
    "status": "Pending",
    "createdAt": "2026-05-09T14:30:00Z"
  }
}
```

**Response (Error - 400 - Validation):**
```json
{
  "message": "Missing required fields: name, email"
}
```

**Response (Error - 409 - Double Booking):**
```json
{
  "message": "This expert is already booked for the selected date and time slot"
}
```

---

### 4. Get Bookings By Email

**Endpoint:** `GET /bookings`

**Query Parameters:**
```
email=john@example.com    (required)
```

**Example Request:**
```bash
curl "http://localhost:5000/api/bookings?email=john@example.com"
```

**Response (Success - 200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "645b2c3d4e5f6g7h8i9j0k1l",
      "expertId": "645a1b2c3d4e5f6g7h8i9j0k",
      "name": "Shivani",
      "email": "john@example.com",
      "phone": "9876543210",
      "date": "2026-05-10T00:00:00Z",
      "timeSlot": "10:00 AM",
      "notes": "Looking forward",
      "status": "Pending",
      "createdAt": "2026-05-09T14:30:00Z"
    }
  ]
}
```

**Response (Error - 400 - Missing Email):**
```json
{
  "message": "email query parameter is required"
}
```

---

### 5. Update Booking Status

**Endpoint:** `PATCH /bookings/:id/status`

**Request Body:**
```json
{
  "status": "Confirmed"
}
```

**Valid Status Values:**
- `Pending` (default)
- `Confirmed`
- `Completed`

**Example Request:**
```bash
curl -X PATCH "http://localhost:5000/api/bookings/645b2c3d4e5f6g7h8i9j0k1l/status" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Confirmed"
  }'
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Booking status updated successfully",
  "data": {
    "_id": "645b2c3d4e5f6g7h8i9j0k1l",
    "status": "Confirmed",
    "updatedAt": "2026-05-09T14:35:00Z"
  }
}
```

**Response (Error - 404):**
```json
{
  "message": "Booking not found"
}
```

**Response (Error - 400 - Invalid Status):**
```json
{
  "message": "status must be one of: Pending, Confirmed, Completed"
}
```

---

### 6. Get Booked Slots For Expert

**Endpoint:** `GET /bookings/expert/:expertId/booked-slots`

**Example Request:**
```bash
curl "http://localhost:5000/api/bookings/expert/645a1b2c3d4e5f6g7h8i9j0k/booked-slots"
```

**Response (Success - 200):**
```json
{
  "success": true,
  "bookedSlots": [
    {
      "date": "2026-05-10",
      "timeSlot": "10:00 AM",
      "status": "Pending"
    },
    {
      "date": "2026-05-10",
      "timeSlot": "2:00 PM",
      "status": "Confirmed"
    }
  ]
}
```

---

## 🟢 HEALTH CHECK

### Health Check Endpoint

**Endpoint:** `GET /api/health`

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Expert Session Booking API is running"
}
```

---

## 🔴 ERROR RESPONSES

### Standard Error Format

All errors follow this format:

```json
{
  "message": "Error description"
}
```

### HTTP Status Codes

| Status | Meaning | Example |
|--------|---------|---------|
| 200 | OK | Successful GET request |
| 201 | Created | Booking created successfully |
| 400 | Bad Request | Missing required fields |
| 404 | Not Found | Expert or Booking not found |
| 409 | Conflict | Double booking attempt |
| 500 | Server Error | Database connection failed |

---

## 🔵 SOCKET.IO EVENTS

### Real-Time Slot Updates

**Event: `slotBooked`**

Emitted by backend when a booking is created.

**Payload:**
```javascript
{
  expertId: "645a1b2c3d4e5f6g7h8i9j0k",
  date: "2026-05-10T00:00:00Z",
  timeSlot: "10:00 AM"
}
```

**Frontend Usage:**
```javascript
const socket = io('http://localhost:5000');

socket.on('slotBooked', (payload) => {
  console.log('Slot booked:', payload);
  // Update UI to mark slot as booked
});
```

---

## 📋 TESTING WITH POSTMAN

1. **Import Collection**
   - File → Import → Select `postman_collection.json` (if available)

2. **Or Manually Create Requests**
   - Create request for each endpoint above
   - Set headers: `Content-Type: application/json`
   - Use example URLs and payloads

3. **Test Double Booking**
   - Book same slot twice
   - Verify 409 error

4. **Test Real-Time**
   - Use Postman to create booking
   - Observe Socket.io event in browser console

---

## 🚀 RATE LIMITING

Currently NOT implemented. For production, add:
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);
```

---

## 🔐 SECURITY NOTES

✅ **Implemented:**
- CORS configured
- Duplicate booking prevention
- Input validation
- Error handling

⚠️ **For Production Consider:**
- Add authentication (JWT)
- Add authorization checks
- Add rate limiting
- Add request sanitization
- Use HTTPS only
- Add logging

---

## 📞 COMMON ISSUES

### "Cannot POST /api/bookings"
- Check request method is POST
- Verify Content-Type header is set

### "Expert not found"
- Verify expert ID is correct
- Check ObjectId format

### "This expert is already booked"
- Try different time slot
- This is expected behavior (double booking prevention)

### Socket connection failed
- Check VITE_SOCKET_URL in frontend/.env
- Ensure backend is running
- Check browser console for errors
