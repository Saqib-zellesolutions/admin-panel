import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AppRouter from "./config/route";
import ThemeProviderWrapper from "./config/themeProvider";
import Signup from "./component/signup";
function App() {
  return (
    <ThemeProviderWrapper>
      {/* <Signup /> */}
      <AppRouter />
      <ToastContainer />
    </ThemeProviderWrapper>
  );
}

export default App;
