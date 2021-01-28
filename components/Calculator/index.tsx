import * as React from "react";

import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";

import { observer } from "mobx-react";

import { CalcStoreContext } from "../../stores/CalculatorStore";
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
  const calcstore = React.useContext(CalcStoreContext);

  React.useEffect(() => calcstore.loadHash(), []);

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
        <title>{`${stripHTML(calcstore.recipeName)}`}</title>
      </Helmet>
      <div className="container" style={{ padding: "1rem" }}>
        <SCalculator>
          <h1 data-testid="recipeName">
            <ContentEditable
              html={calcstore.recipeName}
              className="editable"
              disabled={false}
              onChange={(e) => {
                calcstore.changeAttribute("recipeName", e.target.value);
              }}
            />
          </h1>
          <div className="columns is-multiline is-mobile">
            <div className="column is-half">Final Dough Weight</div>
            <div className="column is-half">
              <Input
                type="number"
                style={{ width: "100%" }}
                value={calcstore.totalWeight}
                onClick={(e) => (e.target as HTMLInputElement)?.select()}
                onChange={(e) =>
                  calcstore.changeAttribute(
                    "totalWeight",
                    handleChangeNumber(e)
                  )
                }
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
                value={calcstore.waterPerc}
                onClick={(e) => (e.target as HTMLInputElement)?.select()}
                onChange={(e) =>
                  calcstore.changeAttribute("waterPerc", handleChangeNumber(e))
                }
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
              />

              <div className="weight">{calcstore.waterWeight} grams</div>
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
