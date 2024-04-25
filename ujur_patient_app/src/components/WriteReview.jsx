import React from 'react'
// import img1 from "../img/favorite/favorite-1.jpg"
import { useRouter } from '../hooks/use-router';
import { updateNavbar } from '../redux/reducers/functionalities.reducer';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import BackNavbar from './BackNavbar';

const WriteReview = () => {
   
   const router = useRouter();
   const dispatch = useDispatch();


  return (
<>
<div class="review d-flex flex-column vh-100">
     <BackNavbar name="Write Review" />
         <div class="vh-100 my-auto overflow-auto p-3">
            <div class="text-center mb-5">
               <img src="img/favorite/favorite-4.jpg" alt="" class="img-fluid rounded-circle call-img mb-4 mt-4" />
               <div>
                  <h6 class="mb-2">How was your experience with</h6>
                  <h5 class="mb-3 text-primary fw-bold">Dr. Cayden Stack</h5>
                  <div class="d-flex align-items-center justify-content-center gap-2 fs-5 text-warning">
                     <span class="mdi mdi-star"></span>
                     <span class="mdi mdi-star"></span>
                     <span class="mdi mdi-star"></span>
                     <span class="mdi mdi-star"></span>
                     <i class="bi bi-star"></i>
                  </div>
               </div>
            </div>
            <div>
               <div class="d-flex align-items-center justify-content-between mb-2">
                  <h6 class="m-0 fs-14">Write a comment</h6>
                  <p class="m-0 text-info">Max 250 word</p>
               </div>
               <form>
                  <textarea class="form-control text-muted p-3 fs-14" name="" id="" cols="30" rows="5">A good experience with Dr. Taylor Samaro. He always tries to understand my speech carefully. I appreciate his process...</textarea>
               </form>
            </div>
         </div>
         <div class="footer mt-auto p-3">
            <Link to="/doctor-reviews" class="btn btn-info btn-lg w-100 rounded-4">Submit Review</Link>
         </div>
      </div>
      <div class="offcanvas offcanvas-bottom bg-light" tabindex="-1" id="offcanvasBottomRemove"
         aria-labelledby="offcanvasBottomRemoveLabel" style={{height:"40vh"}}>
         <div class="offcanvas-body">
            <div class="d-flex align-items-center gap-3 bg-white rounded-4 shadow-sm p-3 mb-3">
               {/* <img src={img1} alt="" class="img-fluid rounded-circle favorite-img" /> */}
               <div>
                  <h6 class="mb-1 fw-bold">Dr. Taylor Samaro</h6>
                  <div class="d-flex align-items-center gap-1 small">
                     <span class="mdi mdi-star text-warning"></span>
                     <span class="mdi mdi-star text-warning"></span>
                     <span class="mdi mdi-star text-warning"></span>
                     <span class="mdi mdi-star text-warning"></span>
                     <span class="mdi mdi-star text-warning"></span>
                     <span class="text-warning">4.9</span>
                      
                  </div>
                  <small class="text-muted">Dentist- Cumilla Medical Collage</small>
               </div>
               <div class="ms-auto">
                  <div class="bg-danger rounded-circle icon">
                     <span class="mdi mdi-cards-heart-outline mdi-18px text-white"></span>
                  </div>
               </div>
            </div>
            <h6 class="text-center text-info m-0">Remove from favorite?</h6>
         </div>
         <div class="offcanvas-footer d-flex gap-3">
            <a href="#" class="btn btn-outline-info btn-lg col" data-bs-dismiss="offcanvas"
               aria-label="Close">Cancel</a>
            <a href="#" class="btn btn-info btn-lg col" data-bs-dismiss="offcanvas" aria-label="Close">Yes,
            Remove</a>
         </div>
      </div>
</>
    )
}

export default WriteReview