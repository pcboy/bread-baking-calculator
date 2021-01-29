import * as React from "react";
import Calculator from "./components/Calculator";
import { CalcStoreContext } from "./stores/CalculatorStore";

const App: React.FC<{ store: any }> = ({ store }) => (
  <CalcStoreContext.Provider value={store}>
    <Calculator />
  </CalcStoreContext.Provider>
);

export default App;
