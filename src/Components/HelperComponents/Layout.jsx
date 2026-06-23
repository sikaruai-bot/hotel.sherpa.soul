import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Layout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  const isRoomOrBookPage = path.startsWith("/room/") ||  path.startsWith("/book")

  return (
    <>
      {!isRoomOrBookPage && <Navbar />}
      {children}
      {!isRoomOrBookPage && <Footer />}
    </>
  );
};

export default Layout;
