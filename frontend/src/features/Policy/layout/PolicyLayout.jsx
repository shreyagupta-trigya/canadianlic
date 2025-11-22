import React from 'react'
import { Outlet } from 'react-router-dom'

const PolicyLayout = () => {
  return (
   <div>
      {/* Policy navbar/sidebar/etc. */}
      <Outlet />
    </div>
  )
}

export default PolicyLayout
