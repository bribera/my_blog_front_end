import React from 'react'

const Button = ({children, type = "button", onClick, disabled = false, className=""}) => {
  return (
    <div>
      <div className="">
        <button 
          type={type}
          disabled={disabled}
          onClick={onClick}
          className=" bg-gray-700 text-white px-3 py-2 text-[18px] font-medium rounded-md">
            {children}
        </button>
      </div>
    </div>
  )
}

export default Button
