import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { Navbar } from "#/components/navbar";
import { Toaster } from "#/components/ui/sonner";
import { ourFileRouter } from "./api/uploadthing/core";

import "./styles.css";
import "@uploadthing/react/styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <Navbar />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
