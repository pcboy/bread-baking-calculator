import * as React from "react";
import { InputAdornment, Input, IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { observer } from "mobx-react";
import ContentEditable from "react-contenteditable";

import { CalcStoreContext } from "../../stores/CalculatorStore";

import { sanitizedNumber, sanitizedString, AddButton } from "./Utils";

export const Ingredients = observer(() => {
  const calcstore = React.useContext(CalcStoreContext);

  return (
    <div className="columns is-multiline is-mobile">
      {calcstore.ingredients.map((ingredient, index) => (
        <React.Fragment key={`ingredient_${index}`}>
          <div
            data-testid="ingredient"
            className="column is-half"
            style={{ position: "relative" }}
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
                onClick={() => calcstore.removeIngredient(index)}
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
                calcstore.replaceIngredient(index, {
                  name: ingr,
                  dosage: ingredient.dosage,
                });
              }}
            />
          </div>
          <div className="column is-half">
            <Input
              type="number"
              value={ingredient.dosage}
              style={{ width: "100%" }}
              onClick={(e) => (e.target as HTMLInputElement)?.select()}
              onChange={(e) => {
                const weight = sanitizedNumber(e);
                calcstore.replaceIngredient(index, {
                  name: ingredient.name,
                  dosage: weight,
                });
              }}
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
            />
            <div className="weight">
              {calcstore.computeWeight(ingredient.dosage)} grams
            </div>
          </div>
        </React.Fragment>
      ))}
      <div className="column is-12 has-text-centered">
        <AddButton
          data-testid="addIngredient"
          onClick={() => calcstore.addIngredient()}
        >
          <AddCircleIcon style={{ marginRight: ".5rem" }} />
          Add Other Ingredients
        </AddButton>
      </div>
    </div>
  );
});
