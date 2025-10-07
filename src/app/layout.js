import "../assets/scss/theme.scss";
import 'react-circular-progressbar/dist/styles.css';
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-datetime/css/react-datetime.css";
import { AuthProvider } from "@/context/AuthContext";
import { UserProvider } from "@/context/UserContext";
import NavigationProvider from "@/contentApi/navigationProvider";
import SettingSideBarProvider from "@/contentApi/settingSideBarProvider";
import ThemeCustomizer from "@/components/shared/ThemeCustomizer";

export const metadata = {
  title: "Lead Magnate | Dashboard",
  description: "Lead Magnate is a admin Dashboard create for multipurpose,",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <UserProvider>
            <SettingSideBarProvider>
              <NavigationProvider>
                {children}
              </NavigationProvider>
            </SettingSideBarProvider>
          </UserProvider>
        </AuthProvider>
        <ThemeCustomizer />
      </body>
    </html>
  );
}
