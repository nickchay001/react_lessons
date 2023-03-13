import React from 'react'
import Classes from './ProfileInfo.module.css'
import Preloader from './../../common/Preloader/Preloader'

const ProfileInfo = (props) => {
    if(!props.profile) {
        return <Preloader/>
    }
  

    return (
        <div>
            <div className={Classes.bunner}>
                <img alt='#' src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png' />
            </div>
            <div className={Classes.descriptiomBlock}>
                <img alt='#' src={props.profile.photos.small}/>
                ava + description
            </div>
        </div>
    )
}

export default ProfileInfo