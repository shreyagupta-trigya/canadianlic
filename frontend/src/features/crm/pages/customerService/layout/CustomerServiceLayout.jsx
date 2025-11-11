import React from 'react'
import { Outlet } from 'react-router-dom'

const CustomerServiceLayout = () => {
  return (
   <div>
      {/* CRM navbar/sidebar/etc. */}
      <Outlet />
    </div>
  )
}

export default CustomerServiceLayout
