import React, { useState, useEffect } from "react";

export default function SeatSelector({train }) {
   
  totalSeats = 100
  seatsPerRow = 6
  //initialUnavailable = [],
  maxSelectable = null
 

  const [selected, setSelected] = useState([]);
  const [unavailable] = useState(new Set(initialUnavailable));

  useEffect(() => {
    onChange(selected.slice().sort((a, b) => a - b));
  }, [selected, onChange]);

  const toggleSeat = (n) => {
    if (unavailable.has(n)) return;

    if (selected.includes(n)) {
      setSelected((s) => s.filter((x) => x !== n));
      return;
    }

    // if (maxSelectable && selected.length >= maxSelectable) {
    //   return;
    // }

    setSelected((s) => [...s, n]);
  };

  const isSelected = (n) => selected.includes(n);
  const isUnavailable = (n) => unavailable.has(n);

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

  const rows = [];
  for (let i = 0; i < totalSeats; i += seatsPerRow) {
    const rowSeats = [];
    for (let j = 0; j < seatsPerRow && i + j < totalSeats; j++) {
      rowSeats.push(renderSeat(i + j + 1));   
    }
    rows.push(
      <div key={i} className="flex gap-5 justify-center">
        {rowSeats}
      </div>
    );
  }

  const clearSelection = () => setSelected([]);

  return (
    <div className="p-6 max-w-screen-md mx-auto bg-gray-50 rounded-xl shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">Select Your Seats</h3>
        <div className="text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm">
          Selected: {selected.length}
          {maxSelectable ? ` / ${maxSelectable}` : ""}
        </div>
      </div>

      <div className="mb-6 p-4 bg-white rounded-lg shadow-inner border border-gray-200">
        <div className="grid gap-4">{rows}</div>
      </div>


      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="text-sm">
          <div className="font-medium text-gray-700 mb-1">Selected seats:</div>
          <div className="min-h-6">
            {selected.length ? (
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                {selected.sort((a, b) => a - b).join(", ")}
              </span>
            ) : (
              <span className="text-gray-400 italic">No seats selected yet</span>
            )}
          </div>
        </div>


  {/*  TODO  this is down part*/}
        <div className="flex gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={clearSelection}
            className="px-4 py-2 rounded-md border 
            border-gray-300 bg-white text-gray-700 hover:bg-gray-50 
            font-medium shadow-sm transition-colors"
            disabled={selected.length === 0}
          >
            Clear
          </button>


            to submit here 
          <button
            type="button"
            onClick={() =>
              alert(
                `You selected: ${
                  selected.length ? selected.join(", ") : "no seats"
                }`
              )
            }
            className="px-4 py-2 rounded-md border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 font-medium shadow-sm transition-colors"
            disabled={selected.length === 0}
          >
            Confirm Selection
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-6 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-md bg-white border border-gray-300"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-md bg-green-500"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-md bg-gray-300"></div>
          <span>Unavailable</span>
        </div>
      </div>
    </div>
  );
}