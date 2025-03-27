import React from 'react'
import Sidebar from '../../components/cashier/sidebar'
import { Outlet } from 'react-router-dom' 
import  '../../styles/admin/admin-dashboard.css'

function AdminDashboard() {
  return (
    <div>
      {/* lagay mo n lng si sidebar dito */}
      <Outlet/>
    </div>
  )
}

export default AdminDashboard
