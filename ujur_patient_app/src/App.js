import React, { useEffect } from 'react';
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
import WriteReviewHospital from './components/WriteReviewHospital';
import { Capacitor } from '@capacitor/core';
import { Plugins, Directory, Encoding } from '@capacitor/core';
import {  FilesystemDirectory, FilesystemEncoding} from '@capacitor/filesystem';
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePassword';
import AllDoctorsFetch from './components/AllDoctorsFetch';
import AllHospitalFetchComponent from './components/AllHospitalFetch';

const { Permissions, Filesystem } = Plugins;


const data = 'This is the content of the file.';

// Define the path where you want to write the file
document.addEventListener('mousedown', (event) => {
  if (event.buttons > 1) { // Check for multiple buttons pressed (long press)
    event.preventDefault();
  }
}, false);
const writeFile = async () => {
  const data = 'Hello, World!';
  const fileName = 'example2.txt';
  const directory = FilesystemDirectory.Documents;

  // Ensure the parent directory exists
  try {
    console.log("sdasd")
    await Filesystem.mkdir({
      path: directory,
      directory: FilesystemDirectory.Documents,
      recursive: true // Create parent directories if they don't exist
    });
  } catch (error) {
    console.error('Error creating directory:', error);
  }

}
function App() {
  useEffect(()=>{
    writeFile();

  },[])
  return (
    <BrowserRouter>
    <Navbar />
    <AnimatePresence mode='wait'>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/home/:changeId" element={<Home />} />
        <Route path="/" element={<LandingSlides />} />
        <Route path="/search-doctor" element={<Search />} />
        <Route path="/search-doctor/:extra" element={<Search />} />
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
        <Route path="/write-reviews-hospital/:appointmentId" element={<WriteReviewHospital />} />
        <Route path="/sign-up/" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password/:userId" element={<ChangePassword />} />
        <Route path="/hospital-overview/:hospitalId" element={<HospitalOverview />} />
        <Route path="/all-doctors-fetch" element={<AllDoctorsFetch />} />
        <Route path="/all-hospital-fetch" element={<AllHospitalFetchComponent />} />
      </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
