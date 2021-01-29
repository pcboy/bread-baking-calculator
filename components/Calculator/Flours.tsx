import * as React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import { observer } from "mobx-react";
import ContentEditable from "react-contenteditable";
import { CalcStoreContext } from "../../stores/CalculatorStore";
import { sanitizedNumber, sanitizedString, AddButton } from "./Utils";

export const Flours: React.FC = observer(() => {
  const calcstore = React.useContext(CalcStoreContext);

  return (
    <div className="columns is-multiline is-mobile">
      {calcstore.flours.map((ingredient, index) => (
        <React.Fragment key={`flour_${index}`}>
          <div
            className="column is-half"
            style={{ position: "relative" }}
            data-testid="flour"
          >
            {index != 0 && (
              <IconButton
                aria-label="delete"
                size="small"
                style={{
                  position: "absolute",
                  left: "-2rem",
                  marginTop: "0.4rem",
                }}
                onClick={() => calcstore.removeFlour(index)}
              >
                <RemoveCircleIcon fontSize="inherit" />
              </IconButton>
            )}
            <ContentEditable
              html={ingredient.name}
              className="editable"
              disabled={false}
              onChange={(e) => {
                const ingr = sanitizedString(e);
                calcstore.replaceFlour(index, {
                  name: ingr,
                  dosage: ingredient.dosage,
                });
              }}
            />
          </div>
          <div className="column is-half" data-testid="flourValue">
            <Input
              type="number"
              style={{ width: "100%" }}
              value={ingredient.dosage}
              onClick={(e) => (e.target as HTMLInputElement)?.select()}
              onChange={(e) => {
                const num = sanitizedNumber(e);

                calcstore.replaceFlour(index, {
                  name: ingredient.name,
                  dosage: num,
                });
              }}
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
            />

            <div className="weight">
              {calcstore.flourWeight(index, ingredient.dosage)} grams
            </div>
          </div>
        </React.Fragment>
      ))}
      <div className="column is-12 has-text-centered">
        <AddButton
          data-testid="addAnotherFlour"
          onClick={() => calcstore.addFlour()}
        >
          <AddCircleIcon style={{ marginRight: ".5rem" }} />
          Add Another Flour
        </AddButton>
      </div>
    </div>
  );
});
