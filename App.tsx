import { Component } from "react";
import * as React from "react";
import Calculator from "./components/Calculator";
import { CalcStoreContext } from "./stores/CalculatorStore";

const App = ({ store }: { store: any }) => (
  <CalcStoreContext.Provider value={store}>
    <Calculator />
  </CalcStoreContext.Provider>
);

export default App;
