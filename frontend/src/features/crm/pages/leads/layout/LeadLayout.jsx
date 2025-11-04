import React from 'react'
import { Outlet } from 'react-router-dom'

const LeadLayout = () => {
  return (
   <div>
      {/* CRM navbar/sidebar/etc. */}
      <Outlet />
    </div>
  )
}

export default LeadLayout