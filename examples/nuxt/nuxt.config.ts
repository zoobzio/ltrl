// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["nuxt-ltrl"],
  ltrl: {
    buttonVariants: ["primary", "outlined", "plain"],
    buttonLabels: {
      primary: "Primary",
      outlined: "Outlined",
      plain: "Plain",
    },
  },
});
