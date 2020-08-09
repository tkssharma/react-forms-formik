import React, { useEffect } from 'react';
import { Formik, Form, Field, useFormikContext } from 'formik';

const AutoSubmitToken = () => {
  const {values, submitForm} = useFormikContext();

  useEffect(() => {
     // erros 
     if(values && values.token && values.token.length === 6){
       submitForm();
     }
  },[values, submitForm])
  return <></>
}
const TwoFactorVerificationForm = () => (
  <div>
    <h1>2-step Verification</h1>
    <p>Please enter the 6 digit code sent to your device</p>
    <Formik
      initialValues={{ token: '' }}
      validate={values => {
        const errors = {};
        if (values.token.length < 5) {
          errors.token = 'Invalid code. Too short.'
        }
        return errors
      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      <Form>
        <Field name="token" type="tel" />
        <AutoSubmitToken />
      </Form>
    </Formik>
  </div>
);