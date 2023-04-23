import React from 'react'
import { Field, InjectedFormProps, reduxForm } from "redux-form"
import { LoginFormValuesType } from '../../../Header/Login/Login'
import { maxLengthCreator, required } from '../../../../utils/validators/validators'
import { GetStringKeys, Input, createField } from '../../../common/FormsControls/FormsControls'

type PropsType = {

}


export type AddPostFormValuesType ={
    newPostText:string
  }
  


export type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

let AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
      {createField<AddPostFormValuesTypeKeys>("Your post", "newPostText", [required], Input)}
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  )
}

export const AddNewPostFormRedux = reduxForm<AddPostFormValuesType, PropsType>({ form: "profileAddNewPostForm" })(AddNewPostForm)

