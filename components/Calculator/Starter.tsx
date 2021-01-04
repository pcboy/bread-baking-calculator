import * as React from "react";
import {
  InputAdornment,
  Input,
  Select,
  FormControl,
  InputLabel
} from "@material-ui/core";
import { observer } from "mobx-react";
import { calculatorStore } from "../../stores/CalculatorStore";
import { handleChangeNumber, stripHTML } from "./Utils";

export const Starter = observer(() => (
  <div className="columns is-multiline is-mobile">
    <div className="column is-half">
      Starter in percentage of total weight (100% hydration starter)
    </div>
    <div className="column is-half">
      <Input
        type="number"
        style={{ width: "100%" }}
        value={calculatorStore.starterPerc}
        onClick={(e) => (e.target as HTMLInputElement)?.select()}
        onChange={(e) => handleChangeNumber(e, "starterPerc")}
        endAdornment={<InputAdornment position="end">%</InputAdornment>} />
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
));
