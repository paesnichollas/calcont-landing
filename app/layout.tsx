import type { Metadata } from "next";
import Script from "next/script";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans"
});

const DOMAIN = "https://calcont.com";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const OG_IMAGE = "/og-image.png";
const FAVICON = "/favicon.svg";

const sharedDescription = "Direcionamento claro para clientes atuais e novos clientes, com atendimento consultivo e foco em conversão.";

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),
  title: "Calcont | Contabilidade corporativa estratégica",
  description: sharedDescription,
  openGraph: {
    title: "Calcont | Contabilidade corporativa estratégica",
    description: sharedDescription,
    url: DOMAIN,
    siteName: "Calcont",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Calcont - contabilidade corporativa estratégica"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Calcont | Contabilidade corporativa estratégica",
    description: sharedDescription,
    images: [OG_IMAGE]
  },
  icons: {
    icon: FAVICON,
    shortcut: FAVICON,
    apple: FAVICON
  }
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${manrope.variable} font-sans`}>
        {GA_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag("js", new Date());
                gtag("config", "${GA_ID}", {
                  page_path: window.location.pathname
                });
              `}
            </Script>
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
