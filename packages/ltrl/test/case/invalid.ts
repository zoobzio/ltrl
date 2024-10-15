// TODO more comprehensive test cases
export default [
  ["a", 1, true],
  [{ label: "true" }, { pineapple: true }],
  [
    {
      key: 1,
      label: "one",
      icon: true,
    },
    {
      key: 2,
      label: "two",
    },
  ],
  [
    {
      key: "on1",
      label: "One",
    },
    {
      key: 2,
      label: "two",
    },
  ],
  [[], ["a", "b", "c"]],
  [1, 2, 3, {}],
  {
    a: [1, 2, 3, false],
    b: false,
  },
];
