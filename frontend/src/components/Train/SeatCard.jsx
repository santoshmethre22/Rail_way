  import React, { useEffect, useState } from "react";
  import {useSelector, useDispatch } from 'react-redux';
  import {useNavigate} from "react-router-dom"
  import { useLocation } from "react-router-dom";
  function SeatCard() {

    // add to url==="/seat-select"
    const navigate=useNavigate();
    //const train=useLocation();
    
  // console.log("the train data is ",train);

    const [val,setVal]=useState();
    const n = 100;
    const seats = Array.from(
      { length: n }, (_, i) => i + 1
    ); 

    return (
      <div>
        {seats.map((seat, index) => (
          <div key={index}>
              <button   onClick={(e)=>{
                  setVal(seat);
                navigate("/booking",{state:{seatNumber:seat}})
              }}>
                Book {seat}
              </button>
        
          </div>

        ))}
      </div>
    );
  }

  export default SeatCard;
