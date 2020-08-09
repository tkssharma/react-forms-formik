import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form, useField, useFormikContext } from 'formik';
import './styles.css';

const MyField = props => {
  const {
    values: { textA, textB },
    touched,
    setFieldValue,
  } = useFormikContext();
  const [field, meta] = useField(props);

  React.useEffect(() => {
    // set the value of textC, based on textA and textB
    if (
      textA.trim() !== '' &&
      textB.trim() !== '' &&
      touched.textA &&
      touched.textB
    ) {
      setFieldValue(props.name, `textA: ${textA}, textB: ${textB}`);
    }
  }, [textB, textA, touched.textA, touched.textB, setFieldValue, props.name]);

  return (
    <>
      <input {...props} {...field} />
      {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
    </>
  );
};

function App() {
  // Not that we provide initalValues all 3 fields.
  const initialValues = { textA: '', textB: '', textC: '' };
  return (
    <div className="App">
      <Formik
        initialValues={initialValues}
        onSubmit={async values => alert(JSON.stringify(values, null, 2))}
      >
        <div className="section">
          <h1>Dependent Formik Field Example</h1>
          <Form>
            <label>
              textA
              <Field name="textA" />
            </label>
            <label>
              textB
              <Field name="textB" />
            </label>
            <label>
              textC
              <MyField name="textC" />
            </label>
            <button type="submit">Submit</button>
          </Form>
        </div>
      </Formik>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
