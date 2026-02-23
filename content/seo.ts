export type SeoContent = {
  siteName: string;
  siteUrl: string;
  titleDefault: string;
  titleTemplate: string;
  descriptionDefault: string;
  keywords: string[];
  canonicalPath: string;
  ogImagePath: string;
  twitterHandle?: string;
};

export const seoContent: SeoContent = {
  siteName: "Calcont",
  siteUrl: "https://calcont.com.br",
  titleDefault: "Calcont | Contabilidade corporativa estratégica",
  titleTemplate: "%s | Calcont",
  descriptionDefault:
    "Contabilidade corporativa com orientação clara para clientes atuais e novos clientes, unindo previsibilidade fiscal e apoio consultivo.",
  keywords: [
    "contabilidade maceio",
    "contabilidade marechal deodoro",
    "planejamento tributario",
    "consultoria fiscal",
    "contabilidade corporativa"
  ],
  canonicalPath: "/",
  ogImagePath: "/og/og-default.png",
  twitterHandle: ""
};
