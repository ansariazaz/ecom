import React, { useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../layout/loader/Loader'
import { useNavigate } from 'react-router-dom'
import './profile.css'
const Profile = () => {
    const navigate = useNavigate()
    const { user, loading,isAuthenticated } = useSelector(state => state.user)
    useEffect(() => {
      if(isAuthenticated===false){
        navigate("/login")
      }
    }, [isAuthenticated,navigate])
    
   
    return (
        <>
            <MetaData title={`${user.user.name}'s Profile`} />
            {loading ? <Loader /> : (
                <div className='profileContainer'>
                    <div>
                        <h1>My Profile</h1>
                        <img src={user.user.avatar.url} alt={user.name} />
                        <Link to="/me/update">Edit Profile</Link>
                    </div>
                    <div>
                        <div>
                            <h4>Full Name</h4>
                            <p>{user.user.name}</p>
                        </div>
                        <div>
                            <h4>Email</h4>
                            <p>{user.user.email}</p>
                        </div>
                        <div>
                            <h4>Joined On</h4>
                            <p>{String(user.user.created_at).substr(0, 10)}</p>
                        </div>
                        <div>
                            <Link to="/orders">My Orders</Link>
                            <Link to="/password/update">Change Password</Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Profile