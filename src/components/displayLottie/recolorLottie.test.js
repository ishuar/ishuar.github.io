import {recolorLottie} from "./recolorLottie";

// Minimal Lottie-shaped fixture: one fill and one stroke in "ink" navy,
// one fill in a colour that must stay untouched.
const ink = [0.031, 0, 0.224, 1]; // #080039
const purple = [0.4, 0, 1, 1]; // #6600ff

const fixture = {
  v: "5.7.4",
  layers: [
    {
      shapes: [
        {ty: "gr", it: [{ty: "fl", c: {a: 0, k: ink}}]},
        {ty: "st", c: {a: 0, k: ink}},
        {ty: "fl", c: {a: 0, k: purple}}
      ]
    }
  ]
};

describe("recolorLottie", () => {
  it("replaces mapped fill and stroke colours", () => {
    const out = recolorLottie(fixture, {"#080039": "#d9dbdf"});
    const [group, stroke] = out.layers[0].shapes;
    const expected = [217 / 255, 219 / 255, 223 / 255, 1];
    expect(group.it[0].c.k).toEqual(expected);
    expect(stroke.c.k).toEqual(expected);
  });

  it("leaves unmapped colours alone", () => {
    const out = recolorLottie(fixture, {"#080039": "#d9dbdf"});
    expect(out.layers[0].shapes[2].c.k).toEqual(purple);
  });

  it("does not mutate the input", () => {
    const before = JSON.stringify(fixture);
    recolorLottie(fixture, {"#080039": "#d9dbdf"});
    expect(JSON.stringify(fixture)).toBe(before);
  });

  it("returns the input unchanged when the map is empty", () => {
    expect(recolorLottie(fixture, {})).toEqual(fixture);
  });

  it("skips animated colours", () => {
    const animated = {
      layers: [{shapes: [{ty: "fl", c: {a: 1, k: [{s: ink, t: 0}]}}]}]
    };
    expect(recolorLottie(animated, {"#080039": "#d9dbdf"})).toEqual(animated);
  });
});
