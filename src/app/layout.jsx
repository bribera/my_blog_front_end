import AuthLayout from "./components/AuthLayout";
import ClientLayout from "./components/ClientLayout";
import "./globals.css";


export const metadata = {
  title: "Create mon Blog",
  description: "Tout savoir sur moi",
};



export default function RootLayout({ children}) {
  return (
    <html lang="en">
      <body
        className="relative"
      >  
        <AuthLayout>
          
          <ClientLayout>

          {children}

          </ClientLayout>
        </AuthLayout> 
      </body>
    </html>
  );
}
