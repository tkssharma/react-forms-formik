import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.css";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        email: "",
        password: ""
      },
      formErrors: {
        email: "",
        password: ""
      },
      formValidity: {
        email: false,
        password: false
      },
      isSubmitting: false
    };
  }

  handleChange = ({ target }) => {
    const { formValues } = this.state;
    formValues[target.name] = target.value;
    this.setState({ formValues });
    this.handleValidation(target);
  };

  handleValidation = target => {
    const { name, value } = target;
    const fieldValidationErrors = this.state.formErrors;
    const validity = this.state.formValidity;
    const isEmail = name === "email";
    const isPassword = name === "password";
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    validity[name] = value.length > 0;
    fieldValidationErrors[name] = validity[name]
      ? ""
      : `${name} is required and cannot be empty`;

    if (validity[name]) {
      if (isEmail) {
        validity[name] = emailTest.test(value);
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} should be a valid email address`;
      }
      if (isPassword) {
        validity[name] = value.length >= 3;
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} should be 3 characters minimum`;
      }
    }

    this.setState({
      formErrors: fieldValidationErrors,
      formValidity: validity
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isSubmitting: true });
    const { formValues, formValidity } = this.state;
    if (Object.values(formValidity).every(Boolean)) {
      alert("Form is validated! Submitting the form...");
      this.setState({ isSubmitting: false });
    } else {
      for (let key in formValues) {
        let target = {
          name: key,
          value: formValues[key]
        };
        this.handleValidation(target);
      }
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    const { formValues, formErrors, isSubmitting } = this.state;
    return (
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-12 text-center">
            <h1 className="mt-5">Login Form</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${
                    formErrors.email ? "is-invalid" : ""
                  }`}
                  placeholder="Enter email"
                  onChange={this.handleChange}
                  value={formValues.email}
                />
                <div className="invalid-feedback">{formErrors.email}</div>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className={`form-control ${
                    formErrors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Password"
                  onChange={this.handleChange}
                  value={formValues.password}
                />
                <div className="invalid-feedback">{formErrors.password}</div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Please wait..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<LoginForm />, rootElement);
