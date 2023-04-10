import React from 'react'
import Classes from './ProfileInfo.module.css'
import Preloader from './../../common/Preloader/Preloader'
import ProfileStatusWhithHookst from './ProfileSatusWhithHooks'
import userPhoto from './../../../assets/images/user.jpg'

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            {/*<div className={Classes.bunner}>
                <img alt='#' src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png' />
            </div>*/}
            <div className={Classes.descriptiomBlock}>
                <img alt='#' src={props.profile.photos.large || userPhoto} className={Classes.userImage} />
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                <ProfileStatusWhithHookst status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo