import { Field, Form, Formik } from 'formik';
import React from 'react';
import { FilterType } from '../../redux/users-reduser';


const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type FormType = {
    term: string
    friend: 'true' | 'false' | 'null'
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}


export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

    const submit = (values: FilterType,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {

        const filter: FormType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        debugger
        props.onFilterChanged(filter)
        setSubmitting(false)
    }
    return (
        <>
            <Formik
                initialValues={{ term: '', friend:'null' }}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type='text' name='term' />
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    )
})


