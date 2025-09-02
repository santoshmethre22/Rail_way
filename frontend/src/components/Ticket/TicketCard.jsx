import React from 'react'

function TicketCard() {
    const booking={
        name:"sam",
        number:"233445",
        source:"sundhal",
        destination:"aurad",
        departure:"16:00",
        arrival:"8:00",
        classes:"AC"

    }
  return (
     <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg hover:scale-[1.02] transition-transform duration-200">
       <h2 className="text-xl font-semibold text-blue-600 mb-2">
         {train?.name}
       </h2>
       <p className="text-gray-700 text-sm">
         <span className="font-medium">Train No:</span> {booking.number}
       </p>
        <p className="text-gray-700 text-sm">
         <span className="font-medium">Name :</span> {booking.name}
       </p>
       <p className="text-gray-700 text-sm">
         <span className="font-medium">From:</span> {booking.source} →{" "}
         <span className="font-medium">To:</span> {booking.destination}
       </p>
       <p className="text-gray-700 text-sm">
         <span className="font-medium">Departure:</span> {booking.departure} |{" "}
         <span className="font-medium">Arrival:</span> {booking.arrival}
       </p>
       <p className="text-gray-700 text-sm">
         <span className="font-medium">Duration:</span> {booking.duration}
       </p>
       <p className="text-gray-700 text-sm">
         <span className="font-medium">Classes:</span> {booking.classes.join(", ")}
       </p>
       <div>
        <Button onClick={() => navigate("/booking",{state:{booking}})}
        children="Book Now" />
       </div>
     </div>
   );
}

export default TicketCard
