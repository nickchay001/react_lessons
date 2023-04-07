import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../../utils/validators/validators'
import { createField, Input } from '../../common/FormsControls/FormsControls'
import { login } from './../../../redux/auth-reducer'
import Classes from './../../common/FormsControls/FormsControls.module.css'

let maxLength50 = maxLengthCreator(50)

const LoginForm = ({ handleSubmit, error }) => {
    console.log("Rerender")
    return (
        <form onSubmit={handleSubmit}>
            {createField("Email", "email", [required, maxLength50], Input)}
            {createField("Password", "password", [required, maxLength50], Input, { type: "password" })}
            {createField(null, "rememberMe", null, Input, { type: "checkbox" }, "remember me")}
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

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Navigate replace to="/profile" />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>)

}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})



export default connect(mapStateToProps, { login })(Login)