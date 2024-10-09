import { useLtrlCongruent } from "ltrl";

export function tester() {
  useLtrlCongruent([
    {
      key: "apple",
      fruit: "Apple",
      fuck: true,
    },
    {
      key: "banana",
      fruit: 111,
    },
  ]);
}
