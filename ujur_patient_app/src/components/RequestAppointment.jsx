import React, { useEffect, useState } from "react";
import { useRouter } from "../hooks/use-router";
import BackNavbar from "./BackNavbar";
import { Link, useParams } from "react-router-dom";
import { fetchRequestAppointmentsDetails } from "../urls/urls";
import useAxios from "../network/useAxios";
import { test_url_images } from "../config/environment";
import transition from "../transition";

const RequestAppointment = () => {
  const router = useRouter();
  const { doctorId } = useParams();
  const [appointmentDetails, setAppointmentDetails] = useState([]);
  const [daysdateDetails, setdaysdateDetails] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(false);
  const [selectedSlotsAndDate, setSelectedSlotsAndDate] = useState({
    date: "",
    slot: "",
  });

  //useAxios
  const [
    doctorsAppointmentResponse,
    doctorsAppointmentError,
    doctorsAppointmentLoading,
    doctorsAppointmentFetch,
  ] = useAxios();

  //functions
  const fetchDoctorAppointments = () => {
    doctorsAppointmentFetch(
      fetchRequestAppointmentsDetails({ doctorId: doctorId })
    );
  };
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
    });
  };
  const setPrice = (time) => {
    if (time == "morning") {
      setSelectedSlotsAndDate((prev) => ({ ...prev, slot: "morning" }));
      setSelectedPrice(appointmentDetails?.morning_slots_price);
    } else if (time == "afternoon") {
      setSelectedSlotsAndDate((prev) => ({ ...prev, slot: "afternoon" }));
      setSelectedPrice(appointmentDetails?.afternoon_slots_price);
    } else if (time == "evening") {
      setSelectedSlotsAndDate((prev) => ({ ...prev, slot: "evening" }));
      setSelectedPrice(appointmentDetails?.evening_slots_price);
    }
  };

  // Function to format day
  const formatDay = (day) => {
    return day.slice(0, 3);
  };

  const checkValidTime = () => {
    const now = new Date();
    let hour = now.getHours();
    return hour
  };
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns zero-based index
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

  console.log(getCurrentDate(), selectedSlotsAndDate.date)

  //useEffects
  useEffect(() => {
    if (doctorId) {
      fetchDoctorAppointments();
      checkValidTime();
    }
  }, [doctorId]);
  useEffect(() => {
    if (doctorsAppointmentResponse?.result == "success") {
      setAppointmentDetails(doctorsAppointmentResponse?.data);
      setdaysdateDetails(doctorsAppointmentResponse?.dates_and_days);
    }
  }, [doctorsAppointmentResponse]);

  const currentHour = checkValidTime();
  let showMorningSlots = selectedSlotsAndDate.date !== getCurrentDate() || currentHour < 12; // Show until 12 PM
  let showAfternoonSlots =selectedSlotsAndDate.date !== getCurrentDate() || currentHour < 18; // Show until 6 PM
  let showEveningSlots = selectedSlotsAndDate.date !== getCurrentDate() ||currentHour < 22 ; // Show until 10 PM

  return (
    <>
      <BackNavbar name={"Book Appointment"} />

      <div
        class="vh-100 my-auto overflow-auto p-3"
        style={{ marginBottom: "2rem" }}
      >
        <div class="rounded-4 px-3 appointment-banner mb-4">
          <div class="d-flex align-items-center gap-3">
            <img
              src={test_url_images + appointmentDetails.doctor?.profile_picture}
              alt=""
              class="img-fluid appointment-doctor-img"
            />
            <div>
              <h6>Consultation Fee</h6>
              {selectedPrice ? (
                <h1 class="text-primary mb-0 fw-bold">
                  ₹{selectedPrice}
                  <span class="text-muted fw-normal fs-6">Inc. GST</span>
                </h1>
              ) : (
                <p>Please Select the slot and time</p>
              )}
            </div>
          </div>
        </div>
        {!appointmentDetails?.doctor?.is_active && <p style={{color:"red"}}>Appointment is unavailable, Please Try again later</p>}
        <div class="mb-4">
          <p class="fs-14 fw-bold text-black mb-3">Date</p>
          <div class="row align-items-center justify-content-between g-2 custom-check">
            {daysdateDetails.map(([date, day], index) => (
              <div class="col">
                <input
                  type="radio"
                  class="btn-check"
                  disabled={!appointmentDetails?.doctor?.is_active}

                  name={`btnradio${index}`}
                  id={`btnradio${index}`}
                  autocomplete="off"
                  onClick={() => {
                    console.log(date);

                    setSelectedSlotsAndDate((prev) => ({
                      ...prev,
                      date: date,
                    }));
                  }}
                />
                <label
                  class={`btn btn-outline-info text-center custom-label-link-appoint ${
                    selectedSlotsAndDate?.date == date && "hopechecked"
                  }`}
                  for={`btnradio${index}`}
                >
                  {formatDay(day)}
                  <br />
                  <span class="fs-5">{formatDate(date)}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        {showMorningSlots && appointmentDetails?.morning_slots > 0 && (
          <div class="mb-4">
            <h5 class="fs-14 fw-bold text-black mb-3">Morning Slots</h5>

            <div class="row row-cols-3 align-items-center justify-content-between g-2 custom-check">
              <div class="col">
                <input
                  type="radio"
                  class="btn-check"
                  name="btnradio1"
                  id="btnradio7"
                  disabled={!appointmentDetails?.doctor?.is_active}
                  autocomplete="off"
                  onClick={() => {
                    setPrice("morning");
                  }}
                />
                <label
                style={{width:"10rem"}}
                  class={`btn btn-outline-info custom-time-appointment ${
                    selectedSlotsAndDate?.slot == "morning" && "hopechecked"
                  }`}
                  for="btnradio7"
                >
                  {appointmentDetails?.morning_timings?.toUpperCase()}
                </label>
              </div>
            </div>
          </div>
        )}
        {showAfternoonSlots && appointmentDetails?.afternoon_slots > 0 && (
          <div class="mb-4">
            <h5 class="fs-14 fw-bold text-black mb-3">Afternoon Slots</h5>

            <div class="row row-cols-3 align-items-center justify-content-between g-2 custom-check">
              <div class="col">
                <input
                  type="radio"
                  class="btn-check"
                  name="btnradio2"
                  id="btnradio8"
                  disabled={!appointmentDetails?.doctor?.is_active}

                  autocomplete="off"
                  onClick={() => {
                    setPrice("afternoon");
                  }}
                />
                <label
                                style={{width:"10rem"}}

                  class={`btn btn-outline-info custom-time-appointment ${
                    selectedSlotsAndDate?.slot == "afternoon" && "hopechecked"
                  }`}
                  for="btnradio8"
                >
                  {appointmentDetails?.afternoon_timings?.toUpperCase()}
                </label>
              </div>
            </div>
          </div>
        )}
        {showEveningSlots && appointmentDetails?.evening_slots > 0 && (
          <div class="mb-4">
            <h5 class="fs-14 fw-bold text-black mb-3">Evening Slots</h5>

            <div class="row row-cols-3 align-items-center justify-content-between g-2 custom-check">
              <div class="col">
                <input
                  type="radio"
                  class="btn-check"
                  name="btnradio3"
                  id="btnradio9"
                  disabled={!appointmentDetails?.doctor?.is_active}

                  autocomplete="off"
                  value={false}
                  onClick={() => {
                    setPrice("evening");
                  }}
                />
                <label
                                style={{width:"10rem"}}

                  class={`btn btn-outline-info custom-time-appointment ${
                    selectedSlotsAndDate?.slot == "evening" && "hopechecked"
                  }`}
                  for="btnradio9"
                >
                  {appointmentDetails?.evening_timings?.toUpperCase()}
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
      <div class="footer mt-auto p-3 custom-footer-appointment">
        <Link
          to={appointmentDetails?.doctor?.is_active && `/visit-info/${doctorId}/${selectedSlotsAndDate.date}/${selectedSlotsAndDate.slot}`}
          class="btn btn-info btn-lg w-100 rounded-4"

        >
          Request For Appointment
        </Link>
      </div>
    </>
  );
};

export default transition(RequestAppointment);
