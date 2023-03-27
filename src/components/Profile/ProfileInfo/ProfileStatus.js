import React, { useState } from 'react'

const ProfileStatus = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);

    }
    const localStatusUpdated = () => {
        props.updateStatus(status);
    }
    return (
        <div>
            {!editMode &&
                <div>
                    <span onClick={() => setEditMode(true)}>{status || "This Profile hasn`t status"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus onBlur={() => {setEditMode(false)
                    localStatusUpdated() } } value={status} />
                </div>
            }
        </div>
    )
}

export default ProfileStatus