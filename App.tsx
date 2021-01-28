import * as React from "react";
import Calculator from "./components/Calculator";
import { CalcStoreContext } from "./stores/CalculatorStore";
import "bulma/bulma.sass";

const App = ({ store }: { store: any }) => (
  <CalcStoreContext.Provider value={store}>
    <Calculator />
  </CalcStoreContext.Provider>
);

export default App;
