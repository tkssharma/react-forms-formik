import React, { useState } from "react";

export function NameForm(props) {
  const [name, setName] = useState("");
  
  const handleSubmit = (evt) => {
      evt.preventDefault();
      alert(`Submitting Name ${name}`)
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Frirst Name:
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

// example //
export function NameForm(props) {
  const [user, setUser] = useState({});
  
  const handleChange = (evt) => {
     const {name, value} =e.target;
     setUser({
       ...user, [name]: value
     })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // submit user Object
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Frirst Name:
        <input
          type="text"
          name="username"
          id="username"
          value={name}
          onChange={handleChange}
        />
        <input
          name="password"
          id="password"
          type="text"
          value={name}
          onChange={handleChange}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}