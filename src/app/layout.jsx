import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";



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
        <Navbar />

        {children}

        <Footer />

      </body>
    </html>
  );
}
