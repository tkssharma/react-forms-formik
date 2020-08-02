import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "bootstrap/dist/css/bootstrap.css";

class LoginForm extends React.Component {
  render() {
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return (
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-12 text-center">
            <h1 className="mt-5">Login Form</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={values => {
                let errors = {};
                if (values.email === "") {
                  errors.email = "Email is required";
                } else if (!emailTest.test(values.email)) {
                  errors.email = "Invalid email address format";
                }
                if (values.password === "") {
                  errors.password = "Password is required";
                } else if (values.password.length < 3) {
                  errors.password = "Password must be 3 characters at minimum";
                }
                return errors;
              }}
              onSubmit={({ setSubmitting }) => {
                alert("Form is validated! Submitting the form...");
                setSubmitting(false);
              }}
            >
              {({ touched, errors, isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      className={`form-control ${
                        touched.email && errors.email ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      className={`form-control ${
                        touched.password && errors.password ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="password"
                      className="invalid-feedback"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Please wait..." : "Submit"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<LoginForm />, rootElement);