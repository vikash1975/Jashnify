 Jashnify — Full-Stack Event Booking Platform

Jashnify is a modern, full-stack MERN (MongoDB, Express, React, Node.js) event management and booking platform that enables users to discover, register, and book events with secure authentication and OTP-based verification.

It includes a powerful admin dashboard for managing events, handling bookings, and tracking revenue and analytics in real time.

# Features
# Authentication & Security
Secure user registration and login using JWT + bcrypt
Email-based OTP verification (2FA) for:
Account activation during registration
Booking confirmation for events


** Role-Based Access Control
Admin
Create, update, and delete events
Approve or reject booking requests
Mark bookings as Paid / Not Paid
Access restricted via database-verified role
User
Browse and explore events
Book tickets with OTP verification
View booking status (Pending / Confirmed / Rejected)
Cancel bookings


** Event Management
Create free & paid events
Add event details (title, description, image URL, date, category, capacity)
Real-time seat availability validation to prevent overbooking


** Smart Booking System
OTP verification required for every booking
All bookings go into a Pending queue
Admin manually confirms payments and approvals
Automatic seat updates after confirmation

** Admin Dashboard
Live analytics:
Pending booking requests
Total revenue
Confirmed paid bookings
Centralized control panel for full event management


** Email Notifications
Automated emails using Nodemailer
Sent on:
Successful booking confirmation
Status updates


** UI/UX
Modern and responsive UI built with:
React.js
Tailwind CSS
Smooth interactions and clean user experience

## Tech Stack

Frontend--

React.js
Tailwind CSS
React Router

Backend--

Node.js
Express.js
MongoDB + Mongoose
JWT Authentication
Nodemailer
