import React, { useState } from 'react'

const ProfileStatus = (props) => {
    const [editMode, setEditMode] = useState(false);
    debugger
    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={() => setEditMode(true)}>{props.status}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input autoFocus onBlur={() => setEditMode(false)} value={props.status} />
                </div>
            }
        </div>
    )
}

export default ProfileStatus