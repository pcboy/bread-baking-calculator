import { observable, onBecomeObserved } from "mobx";
import { action, computed, runInAction, toJS } from "mobx";

import * as msgpack from "msgpack-lite";
import * as bs58 from "bs58";

class CalculatorStore {
  @observable flours: [string, number][] = [["Bread Flour", 100]];
  @observable ingredients: [string, number][] = [["Salt", 3]];

  @observable waterPerc: number = 85;
  @observable totalWeight: number = 800;
  @observable starterPerc: number = 10;
  @observable starterFlourIndex: number = 0;

  computeWeight = (ingredientPerc: number) => {
    return Math.round(
      ingredientPerc *
        (this.totalWeight /
          (this.ingredients.map((x) => x[1]).reduce((x, y) => x + y) +
            this.flours.map((x) => x[1]).reduce((x, y) => x + y) +
            this.waterPerc))
    );
  };

  @computed get starterFlour() {
    return this.flours[this.starterFlourIndex];
  }

  @computed get starterWeight() {
    return Math.round(this.totalWeight * (this.starterPerc / 100.0));
  }

  @action recomputeFlours() {
    const total = this.flours.map((x) => x[1]).reduce((x, y) => x + y, 0);
    if (total > 100) {
      this.flours[0][1] -= total - 100;
    } else if (total < 100) {
      this.flours[0][1] += 100 - total;
    }
    this.recomputeHash();
  }

  @action loadHash() {
    if (window.location.hash.length > 0) {
      try {
        const decoded = msgpack.decode(
          bs58.decode(window.location.hash.substring(1))
        );
        decoded.f && (this.flours = decoded.f);
        decoded.i && (this.ingredients = decoded.i);
        decoded.w && (this.waterPerc = decoded.w);
        decoded.tw && (this.totalWeight = decoded.tw);
        decoded.sp && (this.starterPerc = decoded.sp);
        decoded.sfi && (this.starterFlourIndex = decoded.sfi);
      } catch (err) {}
    }
  }

  @action recomputeHash() {
    window.location.hash = bs58.encode(
      msgpack.encode({
        f: this.flours,
        i: this.ingredients,
        w: this.waterPerc,
        tw: this.totalWeight,
        sp: this.starterPerc,
        sfi: this.starterFlourIndex,
      })
    );
  }

  @action addFlour() {
    this.flours = [...this.flours, ["Whole Wheat Flour", 0]];
    this.recomputeFlours();
  }

  @action removeFlour(index: number) {
    this.flours = this.flours.filter((value, i) => i != index);
    this.recomputeFlours();
  }

  @action addIngredient() {
    this.ingredients = [
      ...this.ingredients,
      ["Ingredient " + this.ingredients.length, 0],
    ];
    this.recomputeHash();
  }

  @action removeIngredient(index: number) {
    this.ingredients = this.ingredients.filter((value, i) => i != index);
    this.recomputeHash();
  }
}

export const calculatorStore = new CalculatorStore();
export default calculatorStore;
