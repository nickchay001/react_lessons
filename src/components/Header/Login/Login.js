import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../../utils/validators/validators'
import { Input } from '../../common/FormsControls/FormsControls'

let maxLength15 = maxLengthCreator(15)

const LoginForm = (props) => {
    console.log("Rerender")
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"} name={"login"} component={Input}
                    validate={[required, maxLength15]} />
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} component={Input}
                    validate={[required, maxLength15]} />
            </div>
            <div>
                <Field component={Input} name={"rememberMe"} type={"checkbox"}
                    validate={[required, maxLength15]} /> remember me
            </div>
            <div>
                <button>Log in</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>)

}




export default Login