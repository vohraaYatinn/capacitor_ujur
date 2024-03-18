/* eslint-disable */
export class Urls {
    static MPHRMS_API_PREFIX = 'api/v2/';

    // users
    static PHONE_NUMBER_OTP = Urls.MPHRMS_API_PREFIX + 'users/phone-otp/';
    static VERIFY_OTP = Urls.MPHRMS_API_PREFIX + 'users/phone-otp-verify/';
    static PATIENT_SIGNUP = Urls.MPHRMS_API_PREFIX + 'patients/patient-signup/';
    static PATIENT_ADD_PROFILE = Urls.MPHRMS_API_PREFIX + 'patients/add-new-profile/';


    //patients
    static PATIENT_LATEST_APPOINTMENTS = Urls.MPHRMS_API_PREFIX + 'doctors/fetch_latest_appointment/';
    static APPOINTMENT_DETAILS = Urls.MPHRMS_API_PREFIX + 'doctors/fetch_appointment_details/';
    static FETCH_FAV_DOCTOR = Urls.MPHRMS_API_PREFIX + 'doctors/fav-doctor/';
    static FETCH_APPOINTMENTS_PATIENTS = Urls.MPHRMS_API_PREFIX + 'doctors/fetch_appointments_patients/';
    static GET_PERSONAL_PROFILE = Urls.MPHRMS_API_PREFIX + 'patients/fetch-personal-info-patients/';

    


    //doctors
    static DASHBOARD_DOCTORS = Urls.MPHRMS_API_PREFIX + 'doctors/dashboard-doctor/';
    static GET_SINGLE_DOCTOR = Urls.MPHRMS_API_PREFIX + 'doctors/get-single-doctor/';
    static REQUEST_APPOINTMEENTS_DETAILS = Urls.MPHRMS_API_PREFIX + 'doctors/get-doctor-slots/';
    static FETCH_PRICE_OF_BOOKING = Urls.MPHRMS_API_PREFIX + 'doctors/fetch-price-of-booking/';
    static FETCH_PRICE_OF_BOOKING_FINAL_PAGE = Urls.MPHRMS_API_PREFIX + 'doctors/fetch-price-of-booking-final-page/';
    static CONFIRM_BOOKING_PATIENT = Urls.MPHRMS_API_PREFIX + 'doctors/confirm-booking-patient/';
    static SEARCHING_DETAILS = Urls.MPHRMS_API_PREFIX + 'doctors/search-details/';


    //hospitals
    static DASHBOARD_HOSPITALS = Urls.MPHRMS_API_PREFIX + 'hospitals/dashboard-hospitals/';
    static FETCH_SINGLE_HOSPITALS = Urls.MPHRMS_API_PREFIX + 'hospitals/doctors-hospitals/';
    static FETCH_LAB_REPORTS = Urls.MPHRMS_API_PREFIX + 'hospitals/fetch_patients_lab_reports/';




}
