import React, { useEffect, useState } from 'react'

type PropsType = {
    status:string
    updateStatus: (status:string) => void
}

const ProfileStatusWhithHookst: React.FC<PropsType> = (props) => {
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

    const onStatusChange = (e:React.ChangeEvent<HTMLInputElement>) => {
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