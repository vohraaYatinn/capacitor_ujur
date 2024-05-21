import { Swiper } from 'antd-mobile'
import React, { useEffect } from 'react'
import { useRouter } from '../hooks/use-router';
import img2 from "../img/frontpage/1.png"
import img1 from "../img/frontpage/2.png"
import img3 from "../img/frontpage/3.png"
import { useNavigate } from 'react-router-dom';


const LandingSlides = () => {

   const navigate = useNavigate();

   useEffect(()=>{
      const isLoggedIn = localStorage.getItem('storedToken')
      if(isLoggedIn?.length > 0){
         navigate('/home')
      }
   }, [])

    const router = useRouter();

    const colors = [
        <div class="landing-slider-item">
        <div class="card bg-transparent border-0 pt-5 mt-5">
           <img src={img1} className='imgimg' alt="" class="rounded-0 card-img-top landing-img" />
           <div class="card-body p-4 mb-4">
              <h3 class="card-title mb-2 lh-base">Schedule <span class="fw-bold text-primary">appointments</span><br/> with expert doctors!</h3>
              <p class="card-text text-muted">Easily schedule appointments with top-rated medical professionals to ensure you receive the best care possible.</p>
           </div>
        </div>
     </div>,
     <div class="landing-slider-item">
        <div class="card bg-transparent border-0 pt-5 mt-5">
        <img src={img2} className='imgimg' alt="" class="rounded-0 card-img-top landing-img" />
           <div class="card-body p-4">
              <h3 class="card-title mb-2 lh-base">Find the best <span class="fw-bold text-info">Doctors</span><br/> in your vicinity</h3>
              <p class="card-text text-muted">Our extensive network includes renowned specialists and general practitioners to cater to all your healthcare needs.</p>
           </div>
        </div>
     </div>,
     <div class="landing-slider-item">
        <div class="card bg-transparent border-0 pt-5 mt-5">
        <img src={img3} className='imgimg' alt="" class="rounded-0 card-img-top landing-img" />
           <div class="card-body p-4">
              <h3 class="card-title mb-2 lh-base">Book <span class="fw-bold">face-to-face</span><br/> Appointment!</h3>
              <p class="card-text text-muted">Secure your face-to-face appointment with ease. Personalized consultations allow for a comprehensive understanding.</p>
           </div>
        </div>
     </div>
    ]
    const items = colors.map((color, index) => (
        <Swiper.Item key={index}>
      {color}
        </Swiper.Item>
      ))
  return (
<>
<div class="landing text-center vh-100">
           
         <Swiper autoplay>{items}</Swiper>
         
      </div>
      <div class="footer fixed-bottom d-flex justify-content-end m-4"
      onClick={()=>router.push('/login-phone')}
      >
         <a class="btn btn-info btn-lg w-100 rounded-4">NEXT</a>
      </div>
</>
    )
}

export default LandingSlides