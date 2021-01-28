import { types, onSnapshot, getSnapshot } from "mobx-state-tree";

import * as msgpack from "msgpack-lite";
import * as bs58 from "bs58";

import * as React from "react";

const Ingredient = types.model("Ingredient", {
  name: types.string,
  dosage: types.number,
});

export const CalculatorStore = types
  .model("CalculatorStore", {
    recipeName: types.string,
    flours: types.array(Ingredient),
    ingredients: types.array(Ingredient),
    waterPerc: types.number,
    totalWeight: types.number,
    starterPerc: types.number,
    starterFlourIndex: types.number,
  })
  .views((self) => ({
    get starterFlour() {
      return self.flours[self.starterFlourIndex];
    },
    get starterWeight() {
      return Math.round(self.totalWeight * (self.starterPerc / 100.0));
    },
    get waterWeight() {
      return Math.round(
        this.computeWeight(self.waterPerc) - this.starterWeight / 2
      );
    },
    flourWeight(flourIndex: number, flourPerc: number) {
      return Math.round(
        this.computeWeight(flourPerc) -
          (flourIndex == self.starterFlourIndex ? this.starterWeight / 2 : 0)
      );
    },
    computeWeight(ingredientPerc: number) {
      return Math.round(
        ingredientPerc *
          (self.totalWeight /
            ([...self.ingredients, ...self.flours]
              .map((x) => x.dosage)
              .reduce((x, y) => x + y) +
              self.waterPerc))
      );
    },
  }))
  .actions((self) => ({
    recomputeFlours() {
      const total = self.flours.map((x) => x.dosage).reduce((x, y) => x + y, 0);
      if (total > 100) {
        self.flours[0].dosage -= total - 100;
      } else if (total < 100) {
        self.flours[0].dosage += 100 - total;
      }
    },
    loadHashDeprecated(decoded: any) {
      decoded.f &&
        self.flours.replace(
          decoded.f.map((x: [string, number]) => ({
            name: x[0],
            dosage: x[1],
          }))
        );
      decoded.i &&
        self.ingredients.replace(
          decoded.i.map((x: [string, number]) => ({
            name: x[0],
            dosage: x[1],
          }))
        );
      decoded.w && (self.waterPerc = decoded.w);
      decoded.tw && (self.totalWeight = decoded.tw);
      decoded.sp && (self.starterPerc = decoded.sp);
      decoded.sfi && (self.starterFlourIndex = decoded.sfi);
    },
    loadHash() {
      if (window.location.hash.length > 0) {
        try {
          const decoded = msgpack.decode(
            bs58.decode(window.location.hash.substring(1))
          );
          // New version. Old one is deprecated
          if (decoded.ver) {
            decoded.f && self.flours.replace(decoded.f);
            decoded.i && self.ingredients.replace(decoded.i);
            decoded.w && (self.waterPerc = decoded.w);
            decoded.tw && (self.totalWeight = decoded.tw);
            decoded.sp && (self.starterPerc = decoded.sp);
            decoded.sfi && (self.starterFlourIndex = decoded.sfi);
            decoded.rn && (self.recipeName = decoded.rn);
          } else {
            this.loadHashDeprecated(decoded);
          }
        } catch (err) {}
      }
    },
    recomputeHash() {
      const snap = getSnapshot(self);
      window.location.hash = bs58.encode(
        msgpack.encode({
          ver: 1,
          rn: snap.recipeName,
          f: snap.flours,
          i: snap.ingredients,
          w: snap.waterPerc,
          tw: snap.totalWeight,
          sp: snap.starterPerc,
          sfi: snap.starterFlourIndex,
        })
      );
    },
    changeAttribute(attribute: string, value: number | string) {
      (self as any)[attribute] = value;
    },
    addFlour() {
      self.flours.push({ name: "Whole Wheat Flour", dosage: 0 });
    },
    removeFlour(index: number) {
      self.flours.replace(self.flours.filter((value, i) => i != index));
    },
    replaceFlour(index: number, flour: { name: string; dosage: number }) {
      self.flours[index] = flour;
    },
    starterFlour(index: number) {
      self.starterFlourIndex = index;
    },
    replaceIngredient(
      index: number,
      ingredient: { name: string; dosage: number }
    ) {
      self.ingredients[index] = ingredient;
    },
    addIngredient() {
      self.ingredients.push({
        name: "Ingredient " + self.ingredients.length,
        dosage: 0,
      });
    },
    removeIngredient(index: number) {
      self.ingredients.replace(
        self.ingredients.filter((value, i) => i != index)
      );
    },
  }));

export const calculatorStore = CalculatorStore.create({
  recipeName: "Bread Baking Calculator",
  flours: [{ name: "Bread Flour", dosage: 100 }],
  ingredients: [{ name: "Salt", dosage: 3 }],
  waterPerc: 75,
  totalWeight: 800,
  starterPerc: 20,
  starterFlourIndex: 0,
});

onSnapshot(calculatorStore, (newSnapshot) => {
  calculatorStore.recomputeFlours();
  calculatorStore.recomputeHash();
});

export const CalcStoreContext = React.createContext(calculatorStore);
export default calculatorStore;
