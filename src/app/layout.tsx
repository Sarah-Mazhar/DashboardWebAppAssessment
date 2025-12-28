


/*
Root layout for the application.
All global providers are registered here.
*/
import "./globals.css";
import ReactQueryProvider from "@/lib/react-query";
import ReduxProvider from "@/lib/redux-provider";
import AppHeader from "@/components/layout/AppHeader";

/*
Root layout with global providers and shared UI.
*/

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        <ReduxProvider>
          <ReactQueryProvider>
            <AppHeader />
            {children}
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
