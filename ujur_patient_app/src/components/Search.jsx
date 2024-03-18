import React from 'react'
import img1 from "../img/favorite/favorite-1.jpg";
import img2 from "../img/favorite/favorite-2.jpg";
import img3 from "../img/favorite/favorite-3.jpg";
import img4 from "../img/favorite/favorite-4.jpg";
import topDoctor1 from "../img/home/available-doctor-1.png";
import topDoctor2 from "../img/home/available-doctor-3.png";
import topDoctor3 from "../img/home/available-doctor-2.png";
import { Swiper } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { useRouter } from '../hooks/use-router';
import { useDispatch } from 'react-redux';
import { updateNavbar } from '../redux/reducers/functionalities.reducer';
import BottomNav from './BottomNav';
import BackNavbar from './BackNavbar';


const Search = () => {
    const topDoctor = [topDoctor1, topDoctor2, topDoctor3 ]
    const dispatch = useDispatch();

    const router = useRouter();
    const topDoctors = topDoctor.map((color, index) => (
        <Swiper.Item key={index}>
      <div class="available-doctor-item">
                  <div class="bg-primary text-white rounded-4 p-3 doctor-book-back">
                     <h1 class="mb-1 doctor-book-back-title">Book Your Next 
                        <span class="h4 text-warning overflow-hidden rounded-4 m-0 bg-white">
                           <b class="bg-light-subtle text-primary px-1 rounded">Appointment</b>
                           <b class="bg-info fw-normal text-white px-1 rounded">Online!</b>
                        </span>
                     </h1>
                      <p class="mb-2 text-white-50 small">Book Now and Get 30% OFF</p>
                     <Link to="/request-appointment" class="btn btn-sm btn-book btn-secondary">BOOK NOW <i class="bi bi-arrow-right"></i></Link>
                     <div class="doctor-book-img">
                        <img src={color} alt="" class="img-fluid" />
                     </div>
                  </div>
               </div>
        </Swiper.Item>
      ))
  return (
    <div>
           <div className="select-area d-flex flex-column vh-100">
      <div className="bg-white shadow-sm">
      <BackNavbar name={"Lab Reports"}/>

         <div className="px-3 pb-3">
            <form>
               <div className="input-group rounded-4 shadow overflow-hidden border-0 py-1 ps-3 bg-light">
                  <span className="input-group-text bg-transparent text-muted border-0 p-0" id="search"><span className="mdi mdi-magnify mdi-24px text-primary"></span></span>
                  <input type="text" className="form-control bg-transparent text-muted border-0 px-3 fs-14" placeholder="Search" aria-label="Search" aria-describedby="search" />
               </div>
            </form>
         </div>
      </div>
      <div className="vh-100 my-auto overflow-auto body-fix-osahan-footer">
         <div className="py-3">
            <div>
               <h6 className="mb-2 pb-1 px-3 fw-bold text-black">Specialist</h6>
               <Link to="/request-appointment" className="link-dark">
                  <div className="d-flex align-items-center gap-3 bg-white border-bottom shadow-sm p-3">
                     <img src={img1} alt="" className="img-fluid rounded-4 favorite-img" />
                     <div className="small">
                        <h6 className="mb-1 fs-14">Dr. Taylor Samaro</h6>
                        <div className="d-flex align-items-center gap-1 small">
                           <span className="mdi mdi-star text-warning"></span>
                           <span className="mdi mdi-star text-warning"></span>
                           <span className="mdi mdi-star text-warning"></span>
                           <span className="mdi mdi-star text-warning"></span>
                           <span className="mdi mdi-star text-warning"></span>
                           <span className="text-warning">4.9</span>
                           <span>(5,380)</span>
                        </div>
                        <small className="text-muted">Dentist- Cumilla Medical Collage</small>
                     </div>
                  </div>
               </Link>
               <Link to="/request-appointment" className="link-dark">
                  <div className="d-flex align-items-center gap-3 bg-white border-bottom shadow-sm p-3">
                  <img src={img2} alt="" className="img-fluid rounded-4 favorite-img" />
                     <div className="small">
                        <h6 className="mb-1 fs-14">Dr. Cayden Stack</h6>
                        <div className="d-flex align-items-center gap-1 small">
                           <span className="mdi mdi-star text-warning"></span>
                           <span className="mdi mdi-star text-warning"></span>
                           <span className="mdi mdi-star text-warning"></span>
                           <span className="mdi mdi-star text-warning"></span>
                           <span className="mdi mdi-star text-warning"></span>
                           <span className="text-warning">4.9</span>
                           <span>(5,380)</span>
                        </div>
                        <small className="text-muted">Dentist- Cumilla Medical Collage</small>
                     </div>
                  </div>
               </Link>
               <Link to="/request-appointment" className="link-dark">
                  <div className="d-flex align-items-center gap-3 bg-white border-bottom shadow-sm p-3">
                  <img src={img3} alt="" className="img-fluid rounded-4 favorite-img" />
                     <div className="small">
                        <h6 className="mb-1 fs-14">Dr. Morgan</h6>
                        <div className="d-flex align-items-center gap-1 small">
                           <span className="mdi mdi-star text-warning"></span>
                           <span className="mdi mdi-star text-warning"></span>
                           <span className="mdi mdi-star text-warning"></span>
                           <span className="mdi mdi-star text-warning"></span>
                           <span className="mdi mdi-star text-warning"></span>
                           <span className="text-warning">4.9</span>
                           <span>(5,380)</span>
                        </div>
                        <small className="text-muted">Dentist- Cumilla Medical Collage</small>
                     </div>
                  </div>
               </Link>
               <Link to="/request-appointment" className="link-dark">
                  <div className="d-flex align-items-center gap-3 bg-white border-bottom shadow-sm p-3">
                  <img src={img4} alt="" className="img-fluid rounded-4 favorite-img" />
                     <div className="small">
                        <h6 className="mb-1 fs-14">Dr. Leabow</h6>
                        <div className="d-flex align-items-center gap-1 small">
                           <span className="mdi mdi-star text-warning"></span>
                           <span className="mdi mdi-star text-warning"></span>
                           <span className="mdi mdi-star text-warning"></span>
                           <span className="mdi mdi-star text-warning"></span>
                           <span className="mdi mdi-star text-warning"></span>
                           <span className="text-warning">4.9</span>
                           <span>(5,380)</span>
                        </div>
                        <small className="text-muted">Dentist- Cumilla Medical Collage</small>
                     </div>
                  </div>
               </Link>
            </div>
         </div>
         <div className="mb-3">
            <h6 className="mb-2 pb-1 fw-bold px-3 text-black">Available Doctor</h6>
            <Swiper slideSize={70} trackOffset={15} loop stuckAtBoundary={false}
            indicator={() => null}
            >
          {topDoctors}
        </Swiper>
            
         </div>
      </div>
      <BottomNav path={"search"}/>
   </div>
    </div>
  )
}

export default Search