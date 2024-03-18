import React from 'react'
import { useRouter } from '../hooks/use-router';
import { useDispatch } from 'react-redux';
import { updateNavbar } from '../redux/reducers/functionalities.reducer';

const BackNavbar = ({name}) => {
    const router = useRouter();
    const dispatch = useDispatch();


  return (
    <div className="d-flex align-items-center justify-content-between mb-auto p-3 bg-white shadow-sm osahan-header">
    <a
      
      className="text-dark bg-white shadow rounded-circle icon"
      onClick={()=>{
        router.back() 
    }}
    >
      <span className="mdi mdi-arrow-left mdi-18px" />
    </a>
    <h6 className="mb-0 ms-3 me-auto fw-bold">{name}</h6>
    <div className="d-flex align-items-center gap-3">
      <a
        className="toggle bg-white shadow rounded-circle icon d-flex align-items-center justify-content-center fs-5"
        onClick={()=>{
            dispatch(updateNavbar())

        }}
      >
        <i className="bi bi-list" />
      </a>
    </div>
  </div>
    )
}

export default BackNavbar