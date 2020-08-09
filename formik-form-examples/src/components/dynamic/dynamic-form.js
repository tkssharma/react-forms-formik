import React, { useState, useEffect } from 'react';
import './App.css';
import { Form, TextField, SelectField, SubmitButton } from './FormElements';
import * as Yup from 'yup';

const formSchema = {
    name: {
        type: "text",
        label: "Name",
        required: true
    },
    email: {
        type: "email",
        label: "Email",
        required: true
    },
    role: {
        type: "select",
        label: "Role",
        required: true,
        options: [
            {
                label: "Admin",
                value: "admin"
            },
            {
                label: "User",
                value: "user"
            }
        ]
    }
}

const getFormElem = (elemName, elemSchema) => {
      const props = {
          name: elemName,
          label: elemSchema.label,
          options: elemSchema.options
      }
      if(elemSchema.type === "text" || elemSchema.type === "email"){
          return (
              <TextField {...props} />
          )
      }
      if (elemSchema.type === "select") {
        return <SelectField  {...props} />
    }
}

function App() {

    const [formData, setFormData] = useState({});
    const [validationSchema, setValidationSchema] = useState({});

    useEffect(() => {
         initForm(formSchema);
    }, [])

    const initForm = () => {
        let _formData = {};
        let _schemaData = {}
        
        for(var key of Object.keys(formSchema)){
            _formData[key] ="";
            if(formSchema[key].type === "text"){
                _schemaData[key] = Yup.string();
            } else if(formSchema[key].type === "text"){
                _schemaData[key] = Yup.string().email();
            } else if(formSchema[key].type === "select"){
                _schemaData[key] = Yup.string().oneOf(formSchema[key].options.map(o => o.value))
            }
            if(formSchema[key].required){
                _schemaData[key] = _schemaData[key].required('Required')
            }
        }
        setValidationSchema(Yup.object().shape(..._schemaData));
        setFormData(_formData);
    }
    return (
        <Form
           initialValues={formData}
           validationSchema={validationSchema}
           onSubmit={onSubmit}
        >   
        {Object.keys(formSchema).map((key , index) => {
             <div key={index}>
                 {getFormElem(key, formSchema[key])}
             </div>
        })}
        </Form>
    )
   
}

export default App;