import * as React from "react";

import {
  InputAdornment,
  Input,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";

import { observer } from "mobx-react";

import { calculatorStore } from "../../stores/CalculatorStore";
import { Ingredients } from "./Ingredients";
import { Flours } from "./Flours";
import { SCalculator } from "./SCalculator";
import { handleChangeNumber, stripHTML } from "./Utils";
import ContentEditable from "react-contenteditable";

const Calculator = observer(() => {
  React.useEffect(() => calculatorStore.loadHash(), []);

  const waterWeight = () =>
    Math.round(
      calculatorStore.computeWeight(calculatorStore.waterPerc) -
        calculatorStore.starterWeight / 2
    );

  return (
    <div className="container" style={{ padding: "1rem" }}>
      <SCalculator>
        <h1>
          <ContentEditable
            html={calculatorStore.recipeName}
            className="editable"
            disabled={false}
            onChange={(e) => {
              calculatorStore.changeAttribute("recipeName", e.target.value);
            }}
          />
        </h1>
        <div className="columns is-multiline is-mobile">
          <div className="column is-half">Final Dough Weight</div>
          <div className="column is-half">
            <Input
              type="number"
              style={{ width: "100%" }}
              value={calculatorStore.totalWeight}
              onClick={(e) => e.target?.select()}
              onChange={(e) => handleChangeNumber(e, "totalWeight")}
              endAdornment={<InputAdornment position="end">g</InputAdornment>}
            />
          </div>
        </div>
        <Flours />

        <div className="columns is-multiline is-mobile">
          <div className="column is-half">Water</div>
          <div className="column is-half">
            <Input
              type="number"
              style={{ width: "100%" }}
              value={calculatorStore.waterPerc}
              onClick={(e) => e.target?.select()}
              onChange={(e) => handleChangeNumber(e, "waterPerc")}
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
            />

            <div className="weight">{waterWeight()} grams</div>
          </div>
        </div>

        <Ingredients />

        <div className="columns is-multiline is-mobile">
          <div className="column is-half">
            Starter in percentage of total weight (100% hydration starter)
          </div>
          <div className="column is-half">
            <Input
              type="number"
              style={{ width: "100%" }}
              value={calculatorStore.starterPerc}
              onClick={(e) => e.target?.select()}
              onChange={(e) => handleChangeNumber(e, "starterPerc")}
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
            />
            <div className="weight">{calculatorStore.starterWeight} grams</div>
            <FormControl style={{ width: "100%" }}>
              <InputLabel htmlFor="age-native-simple">
                Which Flour did you use?
              </InputLabel>
              <Select
                native
                value={calculatorStore.starterFlourIndex}
                onChange={(e: React.ChangeEvent<any>) => {
                  calculatorStore.starterFlour(parseInt(e.target.value));
                }}
              >
                {calculatorStore.flours.map((flour, index: number) => (
                  <option key={`flour_${index}`} value={index}>
                    {stripHTML(flour.name)}
                  </option>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </SCalculator>
    </div>
  );
});

export default Calculator;
