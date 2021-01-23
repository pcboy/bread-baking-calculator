import * as React from "react";

import { InputAdornment, Input } from "@material-ui/core";

import { observer } from "mobx-react";

import { calculatorStore } from "../../stores/CalculatorStore";
import { Ingredients } from "./Ingredients";
import { Flours } from "./Flours";
import { SCalculator } from "./SCalculator";
import { handleChangeNumber, stripHTML } from "./Utils";
import ContentEditable from "react-contenteditable";
import GithubCorner from "react-github-corner";
import { Starter } from "./Starter";
import { Tips } from "./Tips";
import Helmet from "react-helmet";

export const Calculator = observer(() => {
  React.useEffect(() => calculatorStore.loadHash(), []);

  return (
    <>
      <GithubCorner
        href={"https://github.com/pcboy/bread-baking-calculator"}
        bannerColor="#151513"
        octoColor="#fff"
        size={80}
        direction="right"
      />
      <Helmet>
        <title>{`${stripHTML(calculatorStore.recipeName)}`}</title>
      </Helmet>
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
                onClick={(e) => (e.target as HTMLInputElement)?.select()}
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
                onClick={(e) => (e.target as HTMLInputElement)?.select()}
                onChange={(e) => handleChangeNumber(e, "waterPerc")}
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
              />

              <div className="weight">{calculatorStore.waterWeight} grams</div>
            </div>
          </div>

          <Ingredients />
          <Starter />
        </SCalculator>
        <Tips />
      </div>
    </>
  );
});

export default Calculator;
