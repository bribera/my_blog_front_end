import React from 'react'

const Button = ({children}) => {
  return (
    <div>
      <div className="">
        <button type="button" className="bg-white px-3 py-2 text-[18px] font-medium rounded-md">
            {children}
        </button>
      </div>
    </div>
  )
}

export default Button
