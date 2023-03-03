import React from 'react'
import { Outlet,Navigate} from 'react-router-dom'

export default function PrivateComponent({auth}) {


  
  
  return auth?<Outlet/>:<Navigate to='/login'/>
}
