/* eslint-disable */
export class Urls {
    static MPHRMS_API_PREFIX = 'api/v2/';

    // users
    static PHONE_NUMBER_OTP = Urls.MPHRMS_API_PREFIX + 'users/phone-otp-verify/';
    static VERIFY_OTP = Urls.MPHRMS_API_PREFIX + 'users/phone-otp-verify/';
    static PATIENT_SIGNUP = Urls.MPHRMS_API_PREFIX + 'patients/patient-signup/';
    static PATIENT_ADD_PROFILE = Urls.MPHRMS_API_PREFIX + 'patients/add-new-profile/';
    static CHANGE_JWT_PATIENT = Urls.MPHRMS_API_PREFIX + 'patients/change_jwt_patient/';
    static FETCH_CUSTOMER_REVIEWS = Urls.MPHRMS_API_PREFIX + 'patients/fetch_customer_reviews/';
    static FETCH_CUSTOMER_REVIEWS_HOSPITALS = Urls.MPHRMS_API_PREFIX + 'patients/fetch_customer_reviews_hospitals/';
    static UPLOAD_CUSTOMER_LAB_REPORT = Urls.MPHRMS_API_PREFIX + 'patients/upload_customer_lab_report/';
    static APPLY_COUPONS = Urls.MPHRMS_API_PREFIX + 'patients/apply_coupons/';
    static PAYMENT_ORDER_GATEWAY = Urls.MPHRMS_API_PREFIX + 'patients/payment-order-fetch/';
    static CANCEL_APPOINTMENT_PATIENT = Urls.MPHRMS_API_PREFIX + 'patients/cancel-appointment-patient/';
    static FORGOT_PASSWORD_ACCOUNT_GET = Urls.MPHRMS_API_PREFIX + 'patients/forgot-password-account-get/';
    static CONFIRM_PAYMENT = Urls.MPHRMS_API_PREFIX + 'patients/confirm-payment/';
    static CHANGE_PASSWORD = Urls.MPHRMS_API_PREFIX + 'patients/change-password/';


    //patients
    static PATIENT_LATEST_APPOINTMENTS = Urls.MPHRMS_API_PREFIX + 'doctors/fetch_latest_appointment/';
    static APPOINTMENT_DETAILS = Urls.MPHRMS_API_PREFIX + 'doctors/fetch_appointment_details/';
    static GET_ALL_DOCTOR = Urls.MPHRMS_API_PREFIX + 'doctors/get-all-doctor-patient/';
    static GET_ALL_HOSPITAL = Urls.MPHRMS_API_PREFIX + 'doctors/get-all-hospital-patient/';

    static FETCH_FAV_DOCTOR = Urls.MPHRMS_API_PREFIX + 'doctors/fav-doctor/';
    static FETCH_APPOINTMENTS_PATIENTS = Urls.MPHRMS_API_PREFIX + 'doctors/fetch_appointments_patients/';
    static GET_PERSONAL_PROFILE = Urls.MPHRMS_API_PREFIX + 'patients/fetch-personal-info-patients/';
    static CHANGE_PROFILE_VALUES = Urls.MPHRMS_API_PREFIX + 'patients/change-profile-values/';
    static ADD_REVIEWS = Urls.MPHRMS_API_PREFIX + 'doctors/add-reviews/';
    static ADD_REVIEWS_HOSPITAL = Urls.MPHRMS_API_PREFIX + 'doctors/add-reviews-hospital/';
    static FETCH_REVIEWS = Urls.MPHRMS_API_PREFIX + 'doctors/fetch-reviews/';
    static FETCH_REVIEWS_HOSPITAL = Urls.MPHRMS_API_PREFIX + 'doctors/fetch-reviews-hospital/';

    


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
    static FETCH_LAB_REPORTS = Urls.MPHRMS_API_PREFIX + 'patients/fetch_patients_lab_reports/';




}
