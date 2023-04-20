import React, { useEffect, useState } from 'react'



const ProfileStatusWhithHookst = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);


    useEffect(() => {
        setStatus(props.status);
    }, [props.status])
    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <span onClick={activateEditMode}>{props.status || "This Profile hasn`t status"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus onBlur={deactivateEditMode}
                        value={status} />
                </div>
            }
        </div>
    )

}

export default ProfileStatusWhithHookst