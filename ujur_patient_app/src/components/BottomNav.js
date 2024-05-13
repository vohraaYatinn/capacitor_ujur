import React from 'react'
import { Link } from 'react-router-dom'

const BottomNav = ({path}) => {
  return (
<>
<div className="footer mt-auto fix-osahan-footer" style={{paddingLeft: "18px", paddingRight: "18px", bottom:"12px"}}>
          <div className="d-flex align-items-center justify-content-between rounded-4 shadow overflow-hidden bottom-nav-main">
            <Link to="/home" className={`col footer-bottom-nav ${path=="home" && "active"}`}>
              <span className="mdi mdi-home-variant-outline mdi-24px"></span>
              <span>Home</span>
            </Link>
            {/* <Link to="/search-doctor" className={`col footer-bottom-nav ${path=="search" && "active"}`}>
              <span className="mdi mdi-magnify mdi-24px"></span>
              <span>Search</span>
            </Link>
            <Link to="/favorite-doctor" className={`col footer-bottom-nav ${path=="fav" && "active"}`}>
              <span className="mdi mdi-heart-outline mdi-24px"></span>
              <span>Favrouite</span>
            </Link> */}
            <Link to="/view-appointments" className={`col footer-bottom-nav ${path=="appointments" && "active"}`}>
              <span className="mdi mdi-book-outline mdi-24px"></span>
              <span>Appointments</span>
            </Link>
            <Link to="/customer-profile" className={`col footer-bottom-nav ${path=="profile" && "active"}`}>
              <span className="mdi mdi-account-outline mdi-24px"></span>
              <span>Profile</span>
            </Link> ̰
          </div>
        </div>
</>  )
}

export default BottomNav;