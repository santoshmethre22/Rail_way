import React from 'react'
import { TicketCard } from '../components/index.js'
import {BookTicket} from "../components/index.js"
import { useLocation } from 'react-router-dom';

function BookingDashboard() {

    const { state } = useLocation();
  const train = state?.train; 
  return (
    <div>
        <div>
            <TicketCard train={train} />
        </div>
        <div >
        <BookTicket train={train} seatNumber={1} className={"AC"}/>
            
        </div>

    </div>
  )
}

export default BookingDashboard
