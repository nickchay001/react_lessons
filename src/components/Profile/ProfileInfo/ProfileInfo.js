import React, { useState } from 'react'
import Classes from './ProfileInfo.module.css'
import Preloader from './../../common/Preloader/Preloader'
import ProfileStatusWhithHookst from './ProfileSatusWhithHooks'
import userPhoto from './../../../assets/images/user.jpg'
import ProfileDataForm from './ProfileDataForm'

const ProfileInfo = (props) => {
    const [editMode, setEditMode] = useState(false)


    if (!props.profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        )
        //setEditMode(false);
    }

    return (
        <div>
            {/*<div className={Classes.bunner}>
                <img alt='#' src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png' />
            </div>*/}
            <div className={Classes.descriptiomBlock}>
                <img alt='#' src={props.profile.photos.large || userPhoto} className={Classes.userImage} />
                <div>
                    {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
                </div>
                <div className={Classes.profileStatus}>
                    <ProfileStatusWhithHookst status={props.status} updateStatus={props.updateStatus} />
                </div>
                <div>
                    {editMode
                        ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} />
                        : <ProfileData profile={props.profile} isOwner={props.isOwner}
                            goToEditMode={() => { setEditMode(true) }} />}
                </div>
                <div>
                    <b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {
                        return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
                    })}
                </div>
            </div>
        </div>
    )
}


const ProfileData = ({ profile, isOwner, goToEditMode }) => {
    return (
        <div>
            {isOwner &&
                <div>
                    <button onClick={goToEditMode}>edit</button>
                </div>
            }
            <div>
                <b>Full name</b>: {profile.fullName}
            </div>
            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
            </div>
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>
            <div>
                <b>About me</b>: {profile.aboutMe}
            </div>
        </div>
    )
}





const Contact = ({ contactTitle, contactValue }) => {
    return (
        <div className={Classes.contact}>
            <b>{contactTitle}</b>:{contactValue}
        </div>
    )
}

export default ProfileInfo