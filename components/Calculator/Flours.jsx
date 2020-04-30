import React, { Component } from "react";
import { InputAdornment, Input, IconButton, Select } from "@material-ui/core";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import { observer } from "mobx-react";
import ContentEditable from "react-contenteditable";
import { calculatorStore } from "../../stores/CalculatorStore";
import {
  sanitizedNumber,
  sanitizedString,
  AddButton,
  stripHTML,
} from "./Utils";

@observer
export class Flours extends Component {
  flourWeight = (flourIndex, flourPerc) =>
    Math.round(
      calculatorStore.computeWeight(flourPerc) -
        (flourIndex == calculatorStore.starterFlourIndex
          ? calculatorStore.starterWeight / 2
          : 0)
    );

  render() {
    return (
      <div className="columns is-multiline is-mobile">
        {calculatorStore.flours.map((ingredient, index) => (
          <React.Fragment key={`flour_${index}`}>
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
                  onClick={() => calculatorStore.removeFlour(index)}
                >
                  <RemoveCircleIcon fontSize="inherit" />
                </IconButton>
              )}
              <ContentEditable
                html={ingredient[0]}
                className="editable"
                disabled={false}
                onChange={(e) => {
                  const ingr = sanitizedString(e);
                  calculatorStore.flours[index] = [ingr, ingredient[1]];
                }}
              />
            </div>
            <div className="column is-half">
              <Input
                type="number"
                max="100"
                style={{ width: "100%" }}
                value={ingredient[1]}
                onChange={(e) => {
                  const num = sanitizedNumber(e);
                  calculatorStore.flours[index] = [ingredient[0], num];
                  calculatorStore.recomputeFlours();
                }}
                label="Percentage"
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
              />

              <div className="weight">
                {this.flourWeight(index, ingredient[1])} grams
              </div>
            </div>
          </React.Fragment>
        ))}
        <div className="column is-12 has-text-centered">
          <AddButton onClick={() => calculatorStore.addFlour()}>
            <AddCircleIcon style={{ marginRight: ".5rem" }} />
            Add Another Flour
          </AddButton>
        </div>
      </div>
    );
  }
}
