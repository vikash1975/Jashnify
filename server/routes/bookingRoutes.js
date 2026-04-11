const express=require('express');
const bookingRoutes=express.Router();
const {bookEvent,sendBookingOTP,getMyBookings,confirmBooking,cancelBooking}=require('../controllers/bookingController');
const {protect,admin}=require('../middlewares/auth');
const { verifyOTP } = require('../controllers/authController');

bookingRoutes.post('/',protect, bookEvent);
bookingRoutes.post('/send-otp', protect, sendBookingOTP);
bookingRoutes.get('/my', protect, getMyBookings);
bookingRoutes.put('/:id/confirm', protect, admin, confirmBooking);
bookingRoutes.delete('/:id', protect, cancelBooking); 



module.exports=bookingRoutes;