    import React, { useEffect, useState } from 'react'
import { Drawer } from 'antd';
import navImg from "../img/favorite/favorite-4.jpg"
import { useDispatch, useSelector } from 'react-redux';
import { functionalitiesNavbar, updateNavbar } from '../redux/reducers/functionalities.reducer';
import { Link } from 'react-router-dom';
import logo from '../img/logo/logo.png'


const Navbar = () => {
    const navBar = useSelector(functionalitiesNavbar);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    useEffect(()=>{
        console.log(navBar)
        setOpen(navBar)
    },[navBar])
    // const showDrawer = () => {
    //     setOpen(true);
    //   };
      const onClose = () => {
        dispatch(updateNavbar())

    };
    //   const onChange = (e) => {
    //     setPlacement(e.target.value);
    //   };
  return (

<Drawer
        placement={"left"}
        closable={false}
        onClose={onClose}
        open={open}
        key={"left"}
        style={{padding:'0rem'}}
      >
     <>
     <ul className="second-nav p-0" style={{ listStyle: "none" }}>
  <li className="osahan-user-profile bg-primary" style={{ padding: "1rem" }}>
    <div className="d-flex align-items-center gap-2">
      <div className="ps-1">
        <h6 className="fw-bold text-white mb-0">Hey There!</h6>
        <p className="text-white-50 m-0 small">Welcome to UJUR</p>
      </div>
    </div>
  </li>
  <li style={{ marginTop: "0.5rem" }}>
    <Link to="/customer-profile" onClick={()=>{
       onClose()
    }} 
    style={{textDecoration: "none"}}
    >
      <span className="mdi mdi-calendar me-3"></span>My Profile
    </Link>
    <hr/>

  </li>
  <li>
    <Link to="/view-appointments" onClick={()=>{
       onClose()
    }}
    style={{textDecoration: "none"}}

    >
      <span className="mdi mdi-file me-3"></span>My Appointments
    </Link>
    <hr/>

  </li>
  <li>
    <Link to="/favorite-doctor" onClick={()=>{
       onClose()
    }}
    style={{textDecoration: "none"}}

    >
    <span className="mdi mdi-prescription me-3"></span>Favourite Doctors
    </Link>
    <hr/>

  </li>
  <li>
    <Link to="/doctor-reviews" onClick={()=>{
       onClose()
    }}
    style={{textDecoration: "none"}}

    >
    <span className="mdi mdi-star me-3"></span>My Reviews
    </Link>
    <hr/>

  </li>
  <li>
    <Link to="/lab-reports" onClick={()=>{
       onClose()
    }}
    style={{textDecoration: "none"}}

    >
    <span className="mdi mdi-flask me-3"></span>Lab Reports
    </Link>
    <hr/>

  </li>
  {/* <li>
    <Link to="/change-profile" onClick={()=>{
       onClose()
    }}
    style={{textDecoration: "none"}}

    >
      <span className="mdi mdi-account-edit me-3"></span>Edit Profile
    </Link>
    <hr/>

  </li> */}
  <li>
    <Link to="/" onClick={()=>{
      localStorage.removeItem('storedToken')
       onClose()
    }}
    style={{textDecoration: "none"}}

    >
    <span className="mdi mdi-logout me-3"></span>Logout
    </Link>
    <hr/>

  </li>

  {/* <li>
    <Link to="/change-profile" onClick={()=>{
       onClose()
    }}
    style={{textDecoration: "none"}}

    >
      <span className="mdi mdi-account-edit me-3"></span>Logout
    </Link>

  </li> */}


  
</ul>

      <ul className="nav-bootom bottom-nav p-0" 
      
      >
         {/* <li className="home">
            <Link to="/home"
            onClick={()=>{
                onClose()
             }}
            >
               <p className="h5 m-0"><span className="mdi mdi-home-variant-outline"></span></p>
               Home
            </Link>
         </li>
         <li className="find">
            <Link to="/search-doctor"
            onClick={()=>{
                onClose()
             }}
            >
               <p className="h5 m-0"><span className="mdi mdi-magnify"></span></p>
               Search
            </Link>
         </li> */}
         <li className="more" style={{display: "flex", justifyContent: "space-between", width: "full", gap: "35px", alignItems:"center", padding:"1rem", paddingBottom:"0rem"}}>
          <img src={logo} alt="" width={"60px"} />
          <div>
          +91 7682097070
          support@ujurcare.com
          </div>
         </li>

         
      </ul>
     </>
      </Drawer>  )
}

export default Navbar