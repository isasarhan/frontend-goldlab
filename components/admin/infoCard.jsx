import React from 'react'

const InfoCard = ({icon, data , title}) => {
  return (
    <div className='m-auto'><div className="card p-3 rounded-4">
    <div className="row align-items-center">
      <div className="col-md-4 text-center ">
        {icon}
      </div>
      <div className="col-md-8 ">
        <h5>{title}</h5>
        <h6>{data}</h6>
      </div>
    </div>
  </div></div>
  )
}

export default InfoCard