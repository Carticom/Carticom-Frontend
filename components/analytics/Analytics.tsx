"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { getGaId, isAnalyticsEnabled, trackPageView } from "@/lib/analytics";

export function Analytics() {
  const pathname = usePathname();
  const gaId = isAnalyticsEnabled() ? getGaId() : undefined;

  useEffect(() => {
    if (pathname) trackPageView(pathname);
  }, [pathname]);

  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
