import ClientLayout from "./components/ClientLayout";
import "./globals.css";


export const metadata = {
  title: "Create mon Blog",
  description: "Tout savoir sur moi",
};



export default function RootLayout({ children,  }) {
  return (
    <html lang="en">
      <body
        className="relative"
      >
           <ClientLayout>

           {children}

           </ClientLayout>
      </body>
    </html>
  );
}
