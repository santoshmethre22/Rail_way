import React, { useState } from 'react'
import { SeatCard } from '../index.js'
import {Select} from "../index.js"
function TrainDesign({train}) {

      const renderSeat = (n) => {
    const selectedCls = isSelected(n)
      ? "bg-green-500 text-white ring-2 ring-green-300"
      : "bg-white text-gray-800 hover:bg-gray-100";

    const unavailableCls = isUnavailable(n)
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : "cursor-pointer";

    return (
      <button
        key={n}
        type="button"
        onClick={() => toggleSeat(n)}
        className={`w-10 h-10 flex items-center justify-center rounded-md border select-none focus:outline-none focus:ring-2 focus:ring-offset-1 ${selectedCls} ${unavailableCls}`}
        disabled={isUnavailable(n)}
      >
        {n}
      </button>
    );
  };

    const [data,setData]=useState({
        seat:"",
       options:""
    })

    const  options=["AC","SL","3E"] 
    return (
    <div>
      <Select
        label="Class"
        placeholder="Select Class"
        options={options}
      />

      

    </div>
  )
}

export default TrainDesign
