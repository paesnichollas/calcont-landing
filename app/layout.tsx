import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { seoContent } from "@/content/seo";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans"
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const FAVICON = "/favicon.svg";
const canonicalUrl = new URL(seoContent.canonicalPath, seoContent.siteUrl).toString();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#15110f" }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(seoContent.siteUrl),
  title: {
    default: seoContent.titleDefault,
    template: seoContent.titleTemplate
  },
  description: seoContent.descriptionDefault,
  keywords: seoContent.keywords,
  alternates: {
    canonical: canonicalUrl
  },
  openGraph: {
    title: seoContent.titleDefault,
    description: seoContent.descriptionDefault,
    url: canonicalUrl,
    siteName: seoContent.siteName,
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: seoContent.ogImagePath,
        width: 1200,
        height: 630,
        alt: `${seoContent.siteName} - contabilidade corporativa`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: seoContent.titleDefault,
    description: seoContent.descriptionDefault,
    images: [seoContent.ogImagePath],
    ...(seoContent.twitterHandle ? { creator: seoContent.twitterHandle, site: seoContent.twitterHandle } : {})
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
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${plusJakartaSans.variable} font-sans`}>
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="calcont-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
