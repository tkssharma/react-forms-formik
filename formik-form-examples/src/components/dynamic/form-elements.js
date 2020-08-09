import React from 'react';
import {
    Formik,
    Form as FormikForm,
    Field,
    ErrorMessage,
    useFormikContext,
    useField,
    useFormik
} from 'formik';


export function Form(props) {
    return (
        <Formik {...props}>
            <Form>
                {props.children}
            </Form>
        </Formik>
    )
}

export function TextField(props) {
    const {name, label, placeholder, ...rest} = props;
    return (
        <>
        {label && <label for={name}>{label}</label>}
        <Field 
           className="form-control"
           type="password"
           name={name}
           placeholder={placeholder || ''}
           {...rest} >
        </Field>
        </>
    )
}

export function TextField(props) {
    const {name, label, placeholder, ...rest} = props;
    return (
        <>
        {label && <label for={name}>{label}</label>}
        <Field 
           className="form-control"
           type="text"
           name={name}
           placeholder={placeholder || ''}
           {...rest} >
        </Field>
        </>
    )
}

export function SelectField(props) {
    const {name, label, options, ...rest} = props;
    return (
        <>
        {label && <label for={name}>{label}</label>}
        <Field 
           component="select"
           id={name}
           className="form-control"
           name={name}>
            <option value="" >Choose...</option>
            {options.map((optn, index) => <option value={optn.value} label={optn.label || optn.value} />)}
        </Field>
        </>
    )
}


export function SubmitButton(props){
     const {title, ...rest} = props;
     const {isSubmitting} = useFormikContext();
     return (
        <button type="submit" {...rest} disabled={isSubmitting}>{isSubmitting ? 'loading' : title}</button> 
     )
}