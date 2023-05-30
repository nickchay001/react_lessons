import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../../utils/validators/validators'
import { createField, GetStringKeys, Input } from '../../common/FormsControls/FormsControls'
import { DispatchTypes, login } from '../../../redux/auth-reducer'
import Classes from './../../common/FormsControls/FormsControls.module.css'
import { AppStateType } from '../../../redux/redux-store'

//import { type } from '@testing-library/user-event/dist/type'

let maxLength50 = maxLengthCreator(50)




type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> =
    ({ handleSubmit, error, captchaUrl }) => {
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


export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

export type LoginFormValuesTypeKeys = GetStringKeys<keyof LoginFormValuesType>


export const LoginPage: FC = () => {

    const captchaUrl = useSelector((state:AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state:AppStateType) => state.auth.isAuth)
    const dispatch = useDispatch<DispatchTypes>()

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Navigate replace to="/profile" />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
    )
}




