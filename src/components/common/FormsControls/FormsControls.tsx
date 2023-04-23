import React, { FC } from "react"
import { Field, WrappedFieldMetaProps, WrappedFieldsProps } from "redux-form"
import Classes from './FormsControls.module.css'
import { FielValidatorType } from "../../../utils/validators/validators"

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    children: any
}


const FormControl: FC<FormControlPropsType> = ({ meta: { touched, error }, children }) => {
    const hasError = touched && error;
    return (
        <div className={Classes.formControl + " " + (hasError ? Classes.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}


export const Textarea: FC<WrappedFieldsProps> = (props) => {
    //const { input, meta, child, ...restProps } = props
    const { input, meta, ...restProps } = props
    return (
        <FormControl {...props}><textarea {...input} {...restProps}  /></FormControl>
    )
}

export const Input: FC<WrappedFieldsProps> = (props) => {
    //const { input, meta, child, ...restProps } = props
    const { input, meta, ...restProps } = props
    return (
        <FormControl {...props}> <input {...input} {...restProps} /></FormControl>

    )
}



export function createField<FormKeysType extends string>(placeholder: string | undefined,
    name: FormKeysType,
    validators: Array<FielValidatorType>,
    component: FC<WrappedFieldsProps>,
    props = {}, text = "") {
    return <div>
        <Field placeholder={placeholder}
            name={name}
            component={component}
            validate={validators}
            {...props} />{text}
    </div>
}

export type GetStringKeys<T> = Extract <keyof T, string>