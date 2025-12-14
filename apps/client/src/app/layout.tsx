import "@/styles";

import { GA_TRACKING_ID } from "@/lib/config/env";
import type { Metadata } from "next";
import MixpanelInitializer from "./MixpanelInitializer";
import Providers from "./providers";
import Script from "next/script";
import { QueryClient, dehydrate } from "@tanstack/react-query";

const BASE_URL = "https://doldol.wha1eson.co.kr";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: "모이면 완성되는 마음의 종이, 돌돌",
  description:
    "돌돌은 모두가 함께 만드는 온라인 롤링페이퍼입니다. 생일, 졸업, 이별, 감사의 순간을 따뜻하게 기억하세요.",
  icons: {
    icon: "/favicon/favicon.ico",
  },
  openGraph: {
    title: "모이면 완성되는 마음의 종이, 돌돌",
    description:
      "돌돌은 모두가 함께 만드는 온라인 롤링페이퍼입니다. 생일, 졸업, 이별, 감사의 순간을 따뜻하게 기억하세요.",
    url: BASE_URL,
    siteName: "돌돌",
    images: [
      {
        url: "https://i.ibb.co/MDQCjxbJ/symbol-incase-small.png",
        width: 1200,
        height: 630,
        alt: "돌돌 온라인 롤링페이퍼 메인 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="ko">
      <head>
        {process.env.NODE_ENV !== "development" && (
          <>
            <meta
              name="google-site-verification"
              content="Vycz5yefLMTxwxBupannWuFhhEaLpwDJHqAkhJHSyC8"
            />
            <meta
              name="naver-site-verification"
              content="4c866ffc8b459473303fac6e927343ab9eb30cf6"
            />
          </>
        )}

        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            strategy="afterInteractive"
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
                `,
            }}
          />
        </>
      </head>
      <body>
        <Providers state={dehydratedState}>
          <MixpanelInitializer />
          {children}
          <div id="modal-root"></div>
        </Providers>
      </body>
    </html>
  );
}
