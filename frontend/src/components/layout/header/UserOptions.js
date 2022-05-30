import React, { useState } from 'react'
import './header.css'
import {SpeedDial,SpeedDialAction} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../Redux/features/userSlice';
const UserOptions = ({user}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const alert = useAlert()
  const [open, setOpen] = useState(false)
  const actions = [
    { icon: <ListAltIcon />, name: 'Orders',func:orders },
    { icon: <PersonIcon />, name: 'Profile',func:account },
    { icon: <ExitToAppIcon />, name: 'Logout',func:logoutUser },
  ];
  if (user.user.role ==="admin"){
    actions.unshift({ icon: <DashboardIcon />, name: 'Dashboard',func:dashboard },)
  }

  function dashboard(){
    navigate("./dashboard")
  }
  function orders(){
    navigate("./orders")
  }
  function account(){
    navigate("./account")
  }
  function logoutUser(){
    dispatch(logout())
    alert.success("Logout Successfully")
  }
  return (
    <>
    <SpeedDial
        ariaLabel="SpeedDial basic example"
        // sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<img src={user.user.avatar.url ? user.user.avatar.url : "/profile.png"} className='speedDialIcon' alt='profile'/>}
        onClose={()=>setOpen(false)}
        onOpen={()=>setOpen(true)}
        open={open}
        direction='down'
        className="speedDial"
        style={{zIndex:"11"}}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.func}
          />
        ))}
      </SpeedDial>
    
    
    </>
  )
}

export default UserOptions