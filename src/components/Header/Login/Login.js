import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../../utils/validators/validators'
import { Input } from '../../common/FormsControls/FormsControls'
import { login } from './../../../redux/auth-reducer'
import Classes from './../../common/FormsControls/FormsControls.module.css'

let maxLength50 = maxLengthCreator(50)

const LoginForm = (props) => {
    console.log("Rerender")
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Email"} name={"email"} component={Input}
                    validate={[required, maxLength50]} />
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} component={Input} type={"password"}
                    validate={[required, maxLength50]} />
            </div>
            <div>
                <Field component={Input} name={"rememberMe"} type={"checkbox"} /> remember me
            </div>
            {props.error &&
                <div className={Classes.formSummaryError}>
                    {props.error}
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