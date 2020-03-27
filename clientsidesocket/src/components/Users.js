import React from 'react'

const Users = ({users}) => {
    return (
        <div>
            {users && users.map(user=>{
                return (<span key={user.id} className="mr-3 text-danger">*{user.name}</span>)
            })}
        </div>
    )
}

export default Users
