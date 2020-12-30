import * as React from "react";
import { InputAdornment, Input, IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { observer } from "mobx-react";
import ContentEditable from "react-contenteditable";

import { calculatorStore } from "../../stores/CalculatorStore";

import { sanitizedNumber, sanitizedString, AddButton } from "./Utils";

export const Ingredients = observer(() => {
  return (
    <div className="columns is-multiline is-mobile">
      {calculatorStore.ingredients.map((ingredient, index) => (
        <React.Fragment key={`ingredient_${index}`}>
          <div className="column is-half" style={{ position: "relative" }}>
            {index != 0 && (
              <IconButton
                aria-label="delete"
                size="small"
                style={{
                  position: "absolute",
                  left: "-2rem",
                  marginTop: "0.4rem",
                }}
                onClick={() => calculatorStore.removeIngredient(index)}
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
                calculatorStore.replaceIngredient(index, {
                  name: ingr,
                  dosage: ingredient.dosage,
                });
              }}
            />
          </div>
          <div className="column is-half">
            <Input
              type="number"
              max="100"
              value={ingredient.dosage}
              style={{ width: "100%" }}
              onClick={(e) => e.target?.select()}
              onChange={(e) => {
                const weight = sanitizedNumber(e);
                calculatorStore.replaceIngredient(index, {
                  name: ingredient.name,
                  dosage: weight,
                });
              }}
              label="Percentage"
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
            />
            <div className="weight">
              {calculatorStore.computeWeight(ingredient.dosage)} grams
            </div>
          </div>
        </React.Fragment>
      ))}
      <div className="column is-12 has-text-centered">
        <AddButton onClick={() => calculatorStore.addIngredient()}>
          <AddCircleIcon style={{ marginRight: ".5rem" }} />
          Add Other Ingredients
        </AddButton>
      </div>
    </div>
  );
});
