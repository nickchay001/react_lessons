import React from "react"
import { GetStringKeys, Textarea, createField } from "../../common/FormsControls/FormsControls"
import { Input } from "../../common/FormsControls/FormsControls"
import { InjectedFormProps, reduxForm } from "redux-form"
import Classes from './ProfileInfo.module.css'
import { ProfileType } from "../../../types/types"


type PropsType ={ 
    profile: ProfileType
}
type ProfileTypeKeys = GetStringKeys<PropsType>

const ProfileDataForm:React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ profile, handleSubmit, error }) => {
    return (

        <form onSubmit={handleSubmit}>
            <div>
                <button >save</button>
            </div>
            {error &&
                <div className={Classes.formSummaryError}>
                    {error}
                </div>}
            <div>
                <b>Full name</b>: {createField("Full name", "fullName", [], Input)}
            </div>
            <div>
                <b>Looking for a job</b>:{createField("", "lookingForAJob", [], Input, { type: "checkbox" })}
            </div>
            <div>
                <b>My professional skills</b>:{createField("My professional skills", "lookingForAJobDescription", [], Textarea)}
            </div>
            <div>
                <b>About me</b>:{createField("About me", "aboutMe", [], Textarea)}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                    return (
                        <div key={key} className={Classes.contact}>
                            <b>{key} : {createField(key, "contacts." + key, [], Textarea)} </b>
                        </div>
                    )
                })}
            </div>
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({ form: 'edit-profile' })(ProfileDataForm)


export default ProfileDataFormReduxForm