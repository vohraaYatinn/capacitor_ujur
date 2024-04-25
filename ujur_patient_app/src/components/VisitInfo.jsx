import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateNavbar } from "../redux/reducers/functionalities.reducer";
import { Link, useParams } from "react-router-dom";
import BackNavbar from "./BackNavbar";
import useAxios from "../network/useAxios";
import { useRouter } from "../hooks/use-router";
import { fetchBookingPrice } from '../urls/urls';
import { Alert } from "antd";


const VisitInfo = () => {
  //Constants & additionals
  const router = useRouter();
  const { doctorId, date, slot } = useParams();
  const [patientData, setPatientData] = useState();
  //useAxios
  const [
    fetchBookingResponse,
    fetchBookingError,
    fetchBookingLoading,
    fetchBookingFetch,
  ] = useAxios();

  //functions
  const getBookingAmount = () => {
    const payload = {
      patientId: 1,
      bio: "",
      doctorId: doctorId,
      date: date,
      slot: slot,
      comment: patientData?.comment
    };
    fetchBookingFetch(fetchBookingPrice(payload));
  };
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    // Handle the file, e.g., upload to server or store locally
    console.log('Selected file:', selectedFile);
  };

  useEffect(() => {
    if (fetchBookingResponse?.result == "success") {
      router.push(`/overview-booking/${fetchBookingResponse?.booking_id}`);
    }
  }, [fetchBookingResponse]);
  //useState
  const [message, setMessage] = useState({
    message: "",
    isShow: false,
  });
  useEffect(() => {
    if (fetchBookingError) {
      setMessage({
        message: fetchBookingError?.response?.data?.message,
        isShow: true,
      });
    }
  }, [fetchBookingError]);
  return (
    <>

      <div className="visit-info d-flex flex-column vh-100">
        
        <BackNavbar name={"Patient Info"} />
        <div className="vh-100 my-auto overflow-auto p-3">
        {message.isShow && (
            <Alert
              style={{ marginBottom: "1rem" }}
              message={message?.message}
              type="error"
              showIcon
              closable
              onClose={() => {
                setMessage({
                  message: "",
                  isShow: false,
                });
              }}
            />
          )}
          <form>
            <div className="mb-3">

            </div>

            <div className="mb-5">
              <label for="floatingTextarea" className="mb-1 label-custom-boot">
                Brifly describe the problem
              </label>
              <textarea
                className="form-control text-muted"
                style={{ height: "100px" }}
                placeholder="Leave a comment here"
                id="floatingTextarea"
                onChange={(e)=>{
                  setPatientData((prev)=>({...prev, "comment":e.target.value}))
                }}
              >
                hello, My name..
              </textarea>
            </div>
          </form>
        </div>
        <button style={{background:"white", border:"0px", padding:"1rem"}}>
            <p className="fw-bold mb-1 text-primary fs-14"  onClick={()=>handleUploadClick()}>
              Attach reports &<br /> previous Pescriptions
            </p>
            <small className="text-muted"  onClick={()=>handleUploadClick()}>
              JPG, PNG, PDF (Max No. of attachments: 10)
            </small>
            <div className="upload-file-icon bg-primary" >
              <i className="bi bi-file-earmark-arrow-up text-white fs-3 pt-4 pe-3"></i>
            </div>

          </button>
        <div className="footer mt-auto p-3">
          
          <Link
            className="btn btn-info btn-lg w-100 rounded-4"
            onClick={() => {
              getBookingAmount();
            }}
          >
            PROCEED NEXT
          </Link>
        </div>
      </div>
    </>
  );
};

export default VisitInfo;
