import * as React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import { observer } from "mobx-react";
import { CalcStoreContext } from "../../stores/CalculatorStore";
import { handleChangeNumber, stripHTML } from "./Utils";

export const Starter: React.FC = observer(() => {
  const calcstore = React.useContext(CalcStoreContext);

  return (
    <div className="columns is-multiline is-mobile">
      <div className="column is-half">
        Starter in percentage of total weight (100% hydration starter)
      </div>
      <div className="column is-half">
        <Input
          type="number"
          style={{ width: "100%" }}
          value={calcstore.starterPerc}
          onClick={(e) => (e.target as HTMLInputElement)?.select()}
          onChange={(e) =>
            calcstore.changeAttribute("starterPerc", handleChangeNumber(e))
          }
          endAdornment={<InputAdornment position="end">%</InputAdornment>}
        />
        <div className="weight">{calcstore.starterWeight} grams</div>
        <FormControl style={{ width: "100%" }}>
          <InputLabel htmlFor="age-native-simple">
            Which Flour did you use?
          </InputLabel>
          <Select
            data-testid="starterFlourSelect"
            native
            value={calcstore.starterFlourIndex}
            onChange={(e: React.ChangeEvent<any>) => {
              calcstore.starterFlour(parseInt(e.target.value));
            }}
          >
            {calcstore.flours.map((flour, index: number) => (
              <option key={`flour_${index}`} value={index}>
                {stripHTML(flour.name)}
              </option>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
});
