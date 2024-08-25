import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {console.log("server redering")}
          <ThemeProvider>
            {children}
            {console.log("server redering")}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
