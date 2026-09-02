export const formatFileSizeDisplay = value => {
  if (value < 1024) {
    return `${value} KB`;
  }
  return `${parseFloat((value / 1024).toFixed(1))} MB`;
};

// Lottie stores colours as [r, g, b, a] floats in 0..1.
const rgbToHex = ([r, g, b]) =>
  "#" +
  [r, g, b]
    .map(channel =>
      Math.round(channel * 255)
        .toString(16)
        .padStart(2, "0")
    )
    .join("");

const hexToRgb = hex =>
  [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);

// Returns a copy of `animationData` with every static fill ("fl") and
// stroke ("st") whose colour is a key of `colorMap` (lower-case "#rrggbb")
// replaced by the mapped colour. Alpha and animated colours are untouched.
export const recolorLottie = (animationData, colorMap) => {
  const swap = node => {
    if (Array.isArray(node)) {
      return node.map(swap);
    }
    if (node === null || typeof node !== "object") {
      return node;
    }
    const copy = {};
    for (const key of Object.keys(node)) {
      copy[key] = swap(node[key]);
    }
    const isStaticPaint =
      (node.ty === "fl" || node.ty === "st") &&
      node.c &&
      node.c.a === 0 &&
      Array.isArray(node.c.k);
    if (isStaticPaint) {
      const target = colorMap[rgbToHex(node.c.k)];
      if (target) {
        copy.c = {...copy.c, k: [...hexToRgb(target), ...node.c.k.slice(3)]};
      }
    }
    return copy;
  };
  return swap(animationData);
};
