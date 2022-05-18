import React from 'react'
import { IUser } from '../../store/types/userTypes';
import moment from 'moment'

interface IUserProp {
    user: IUser,
    lp?: number
}

const UserTable: React.FC<IUserProp> = ({user}) => {
  return (
    <React.Fragment>
      <td>{user._id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{moment(user.lastLogin).fromNow()}</td>
      <td>{user.isBlocked === true ?<div className="alert alert-danger text-center" >BLOKED</div> :  
      <div className="alert alert-success text-center">ACTIVE </div>}</td>
      <td>{user.isAdmin === true ? 
      <div className="alert alert-warning text-center" role="alert">
      ADMIN
     </div>
      : 
      <div className="alert alert-primary text-center" role="alert">
      USER
        </div>
      }</td>
         </React.Fragment>
  )
}

export default UserTable