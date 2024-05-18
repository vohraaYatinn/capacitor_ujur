import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search';
import RequestAppointment from './components/RequestAppointment';
import AboutDoctor from './components/AboutDoctor';
import VisitInfo from './components/VisitInfo';
import OverviewBooking from './components/Overview';
import CustomerProfile from './components/profile';
import ViewAppointments from './components/ViewAppointments';
import AppointmentDetails from './components/AppointmentDetails';
import FavDoctor from './components/FavDoctor';
import NotificationsCustomer from './components/NotificationsCustomer';
import ChangeCustomerProfile from './components/ChangeCustomerProfile';
import Navbar from './components/Navbar';
import LabReports from './components/LabReports';
import DoctorReviews from './components/DoctorReviews';
import WriteReview from './components/WriteReview';
import LandingSlides from './components/LandingSlides';
import Welcome from './components/Welcome';
import VerifyOtp from './components/VerifyOtp';
import LoginPhone from './components/LoginPhone';
import HospitalOverview from './components/HospitalOverview';
import SignupPage from './components/Signup';
import { AnimatePresence } from 'framer-motion';
import "./index.css"
function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <AnimatePresence mode='wait'>
      <Routes>
      
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<LandingSlides />} />
        <Route path="/search-doctor" element={<Search />} />
        <Route path="/verify-otp/:phone" element={<VerifyOtp />} />
        <Route path="/login-phone" element={<LoginPhone />} />
        <Route path="/request-appointment/:doctorId" element={<RequestAppointment />} />
        <Route path="/about-doctor/:doctorId" element={<AboutDoctor />} />
        <Route path="/visit-info/:doctorId/:date/:slot" element={<VisitInfo />} />
        <Route path="/overview-booking/:bookingId" element={<OverviewBooking />} />
        <Route path="/customer-profile" element={<CustomerProfile />} />
        <Route path="/view-appointments" element={<ViewAppointments />} />
        <Route path="/appointment-details/:appointmentId" element={<AppointmentDetails />} />
        <Route path="/favorite-doctor" element={<FavDoctor />} />
        <Route path="/notifications" element={<NotificationsCustomer />} />
        <Route path="/change-profile" element={<ChangeCustomerProfile />} />
        <Route path="/lab-reports" element={<LabReports />} />
        <Route path="/doctor-reviews" element={<DoctorReviews />} />
        <Route path="/write-reviews/:appointmentId" element={<WriteReview />} />
        <Route path="/sign-up/:phone" element={<SignupPage />} />
        <Route path="/hospital-overview/:hospitalId" element={<HospitalOverview />} />
      </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
