import React, { useState } from 'react'
import Classes from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatusWhithHookst from './ProfileSatusWhithHooks'
import userPhoto from './../../../assets/images/user.jpg'
import ProfileDataForm from './ProfileDataForm'
import { ContactsType, ProfileType } from '../../../types/types'

type PropsType = {
    profile: ProfileType | null
    status:string
    updateStatus: (status:string) => void
    isOwner: boolean
    savePhoto:(file: File) => void
    saveProfile:(profile:ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {
    const [editMode, setEditMode] = useState(false)


    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData).then(
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
                <img alt='#' src={profile.photos.large || userPhoto} className={Classes.userImage} />
                <div>
                    {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
                </div>
                <div className={Classes.profileStatus}>
                    <ProfileStatusWhithHookst status={status} updateStatus={updateStatus} />
                </div>
                <div>
                    {editMode
                        ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                        : <ProfileData profile={profile} isOwner={isOwner}
                            goToEditMode={() => { setEditMode(true) }} />}
                </div>
                <div>
                    <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                    })}
                </div>
            </div>
        </div>
    )
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {
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
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map((key) => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
                })}
            </div>
        </div>
    )
}



type ContactsPropstype = {
    contactTitle:string
    contactValue:string
}
const Contact: React.FC<ContactsPropstype> = ({ contactTitle, contactValue }) => {
    return (
        <div className={Classes.contact}>
            <b>{contactTitle}</b>:{contactValue}
        </div>
    )
}

export default ProfileInfo