import React from "react";
import ReactDOM from "react-dom";

import SignupForm from "./SignupForm";

function App() {
  return <SignupForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
