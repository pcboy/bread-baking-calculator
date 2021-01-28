import * as React from 'react';
import ReactDOM from 'react-dom'
import App from "./App";
import calculatorStore from './stores/CalculatorStore';


ReactDOM.render(<App store={calculatorStore} />, document.getElementById("root"));
