import React, { FC } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../../utils/validators/validators'
import { createField, Input } from '../../common/FormsControls/FormsControls'
import { login } from '../../../redux/auth-reducer'
import Classes from './../../common/FormsControls/FormsControls.module.css'
import { AppStateType } from '../../../redux/redux-store'
//import { type } from '@testing-library/user-event/dist/type'

let maxLength50 = maxLengthCreator(50)


type LoginFormOwnProps = {
    captchaUrl:string | null
}

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> =
({ handleSubmit, error, captchaUrl }) => {
    console.log("Rerender")
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>("Email", "email", [required, maxLength50], Input)}
            {createField<LoginFormValuesTypeKeys>("Password", "password", [required, maxLength50], Input, { type: "password" })}
            {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, { type: "checkbox" }, "remember me")}

            {captchaUrl && <img alt=')' src={captchaUrl} />}
            {captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", [required], Input, {})}

            {error &&
                <div className={Classes.formSummaryError}>
                    {error}
                </div>}
            <div>
                <button>Log in</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm)


type MapStatePropsType = {
    captchaUrl:string | null
    isAuth:boolean
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: any) => void
}

export type LoginFormValuesType = {
    email:string
    password : string
    rememberMe:boolean
    captcha:string
}

type LoginFormValuesTypeKeys = Extract <keyof LoginFormValuesType, string>


const Login: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData:LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Navigate replace to="/profile" />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    )
}
const mapStateToProps = (state:AppStateType):MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
})



export default connect(mapStateToProps, { login })(Login)