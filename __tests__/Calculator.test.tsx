import * as React from "react";
import { mount } from "enzyme";
import Calculator from "../components/Calculator";
import calculatorStore, { CalculatorStore } from "../stores/CalculatorStore";
import { getSnapshot } from "mobx-state-tree";
import App from "../App";

describe("Calculator", () => {
  let store: ReturnType<typeof CalculatorStore.create>;
  beforeEach(() => {
    store = CalculatorStore.create({
      recipeName: "Bread Baking Calculator",
      flours: [{ name: "Bread Flour", dosage: 100 }],
      ingredients: [{ name: "Salt", dosage: 3 }],
      waterPerc: 75,
      totalWeight: 800,
      starterPerc: 20,
      starterFlourIndex: 0,
    });
  });

  it("renders without crashing", () => {
    const app = mount(<App store={store} />);

    expect(app.find({ "data-testid": "recipeName" }).text()).toEqual(
      store.recipeName
    );
  });

  it("can add other flours", () => {
    const app = mount(<App store={store} />);

    app
      .find({ "data-testid": "addAnotherFlour" })
      .find("button")
      .simulate("click");

    expect(store.flours.length).toBe(2);
    expect(app.find({ "data-testid": "flour" }).length).toEqual(
      store.flours.length
    );
  });

  it("can add other ingredients", () => {
    const app = mount(<App store={store} />);

    app
      .find({ "data-testid": "addIngredient" })
      .find("button")
      .simulate("click");

    expect(store.ingredients.length).toBe(2);

    expect(app.find({ "data-testid": "ingredient" }).length).toEqual(
      store.ingredients.length
    );
  });

  it("flours grams are recomputed properly", () => {
    const localStore = CalculatorStore.create({
      recipeName: "Bread Baking Calculator",
      flours: [{ name: "Bread Flour", dosage: 100 }],
      ingredients: [{ name: "Salt", dosage: 3 }],
      waterPerc: 75,
      totalWeight: 800,
      starterPerc: 20,
      starterFlourIndex: 0,
    });

    const app = mount(<App store={localStore} />);

    app
      .find({ "data-testid": "addAnotherFlour" })
      .find("button")
      .simulate("click");

    const previousValue = localStore.flourWeight(
      0,
      localStore.flours[0].dosage
    );
    localStore.replaceFlour(1, { name: "testFlour", dosage: 60 });

    expect(localStore.flours.length).toEqual(2);
    expect(localStore.flourWeight(0, localStore.flours[0].dosage)).toBeLessThan(
      previousValue
    );

    localStore.removeFlour(1);
    expect(localStore.flourWeight(0, localStore.flours[0].dosage)).toEqual(
      previousValue
    );

    localStore.addIngredient();
    localStore.replaceIngredient(1, { name: "ingredient1", dosage: 2 });
    expect(localStore.flourWeight(0, localStore.flours[0].dosage)).toBeLessThan(
      previousValue
    );
  });

  it("Can reflect the used flours in the levain selection", () => {
    const localStore = CalculatorStore.create({
      recipeName: "Bread Baking Calculator",
      flours: [
        { name: "Bread Flour", dosage: 100 },
        { name: "Whole wheat", dosage: 10 },
      ],
      ingredients: [{ name: "Salt", dosage: 3 }],
      waterPerc: 75,
      totalWeight: 800,
      starterPerc: 20,
      starterFlourIndex: 0,
    });

    const app = mount(<App store={localStore} />);

    const options = app
      .find({ "data-testid": "starterFlourSelect" })
      .find("option");

    expect(options.length).toEqual(2);
    expect(options.map((x) => x.text())).toEqual([
      "Bread Flour",
      "Whole wheat",
    ]);
  });

  it("returns proper results", () => {
    const store = CalculatorStore.create({
      recipeName: "Bread Baking Calculator",
      flours: [
        { name: "Bread Flour", dosage: 96 },
        { name: "Whole wheat", dosage: 4 },
      ],
      ingredients: [
        { name: "Salt", dosage: 3 },
        { name: "ingredient1", dosage: 1 },
      ],
      waterPerc: 75,
      totalWeight: 800,
      starterPerc: 20,
      starterFlourIndex: 0,
    });

    expect(store.flourWeight(0, store.flours[0].dosage)).toEqual(349);
    expect(store.flourWeight(1, store.flours[1].dosage)).toEqual(18);
    expect(store.waterWeight).toEqual(255);
    expect(store.computeWeight(store.ingredients[0].dosage)).toEqual(13);
    expect(store.computeWeight(store.ingredients[1].dosage)).toEqual(4);
    expect(store.starterWeight).toEqual(160);
  });
});
