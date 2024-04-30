import React, { useEffect, useState } from 'react';


function PrescriptionHistory({htmlContent}) {
  useEffect(()=>{
    console.log("sd")
    console.log(htmlContent)
  },[htmlContent])
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}

export default PrescriptionHistory;
