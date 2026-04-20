import React from "react";

export default function Card({data}) {
 const {firstName} = data;
console.log(data);

  return (
    <div className="w-full justify-center flex  ">
      <div className="card bg-gray-400   w-96 shadow-sm rounded-md ">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            className="rounded-md"
            alt="Shoes"
          />
        </figure>
        <div className=" w-full card-body mb-2 mt-2">
          <h2 className="card-title mb-2 ">{firstName}</h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className="w-full flex card-actions justify-center gap-2 mt-4">
            <button className="btn btn-primary rounded-md p-1 text-center bg-blue-700" >Interested</button>
            <button className="btn btn-primary rounded-md p-1 text-center bg-red-600">Ignored</button>
          </div>
        </div>
      </div>
    </div>
  );
}
