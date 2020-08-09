import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'react-redux'
import { withFormik } from 'formik'


class Basic extends React.Component {
  render() {
    const {
      errors,
      handleSubmit,
      isSubmitting,
      values,
      setFieldValue,
      setFieldTouched,
    } = this.props

    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={handleSubmit}>
          <input 
           value={values.email} 
           type="email" name="email" 
           onChange={setFieldValue} 
           onBlur={setFieldTouched}
          />
          <input
           value={values.password}
           type="password" 
           name="password" 
           onChange={setFieldValue} 
           onBlur={setFieldTouched}
          />
          <button type="submit" disabled={isSubmitting || errors}>
            Submit
          </button>
        </form>
      </div>
    )
  }
};
const Form = withFormik({
   validate(values) {

   },
   handleSubmit(values, {props, setSubmitting}) {
     const {loginUser} = props;
     const payload = {
       email: values.email, password: values.password
     }
     loginUser(payload).then(() => {
      setSubmitting(false);
     })
   }
})(Basic)

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loginUser
}, dispatch);

const  mapStateToProps = () => null;

const Redux = connect(mapStateToProps, mapDispatchToProps)(Form);

export default Redux;