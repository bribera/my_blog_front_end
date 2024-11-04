import React from 'react'
import FilterSearch from './FilterSearch'

const Nouveaute = () => {
  return (
    <div>
      <div className="pt-[160px] px-[60px]">
        <p className="font-semibold  text-[40px]">Tout les articles</p>
      </div>
      <div className="p-[60px] bg-slate-200 border border-slate-100 rounded-sm">
        <FilterSearch />
      </div>
    </div>
  )
}

export default Nouveaute
