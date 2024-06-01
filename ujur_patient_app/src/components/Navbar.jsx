    import React, { useEffect, useState } from 'react'
import { Drawer, Image } from 'antd';
import navImg from "../img/favorite/favorite-4.jpg"
import { useDispatch, useSelector } from 'react-redux';
import { functionalitiesNavbar, updateNavbar, userData } from '../redux/reducers/functionalities.reducer';
import { Link } from 'react-router-dom';
import logo from '../img/logo/logo.png'
import { useRouter } from '../hooks/use-router';
import { test_url_images } from '../config/environment';
import user99 from "../img/home/user.png"


const Navbar = () => {
  const user = useSelector(userData)

    const navBar = useSelector(functionalitiesNavbar);
    const dispatch = useDispatch();
    const router = useRouter();


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
      <div className="ps-1 d-flex" onClick={()=>{
        onClose()
        router.push("/home/modalTrue")
      }}>
      <img src={user?.profile_picture ? test_url_images + user?.profile_picture : user99} width={50} style={{
        border:"1px solid transparent", borderRadius:"90%"
      }}/>
<div style={{marginLeft:"1rem", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
<h6 className="fw-bold text-white mb-0"><span className=''>Hey</span>{" "}<span>{user?.full_name && user?.full_name.replace(/\b\w/g, char => char.toUpperCase())}</span>      <span className="dropdown-toggle" style={{marginLeft:"0.4rem"}} />
</h6>
        <p className="text-white-50 m-0 small">{user?.ujur_id}</p>
        </div>
      </div>
    </div>
  </li>
  <li style={{ marginTop: "0.5rem" }} onClick={()=>{
    onClose()
    router.push("/customer-profile")
  }}>
    <p 
    style={{textDecoration: "none"}}
    >
      <span className="mdi mdi-calendar me-3"></span>My Profile
    </p>
    <hr/>

  </li>
  <li onClick={()=>{
    onClose()
    router.push("/view-appointments")
  }}>
    <p 
    style={{textDecoration: "none"}}

    >
      <span className="mdi mdi-file me-3"></span>My Appointments
    </p>
    <hr/>

  </li>
  <li onClick={()=>{
    onClose()
    router.push("/favorite-doctor")
  }}>
    <p 
    style={{textDecoration: "none"}}

    >
    <span className="mdi mdi-prescription me-3"></span>Favourite Doctors
    </p>
    <hr/>

  </li>
  <li onClick={()=>{
    onClose()
    router.push("/doctor-reviews")
  }}>
    <p 
    style={{textDecoration: "none"}}

    >
    <span className="mdi mdi-star me-3"></span>My Reviews
    </p>
    <hr/>

  </li>
  <li onClick={()=>{
    onClose()
    router.push("/lab-reports")
  }}>
    <p 
    style={{textDecoration: "none"}}

    >
    <span className="mdi mdi-flask me-3"></span>Lab Reports
    </p>
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
    <p to="/" onClick={()=>{
      localStorage.removeItem('storedToken')

       onClose()
       router.push("/")
    }}
    style={{textDecoration: "none"}}

    >
    <span className="mdi mdi-logout me-3"></span>Logout
    </p>
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