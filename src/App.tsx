import { RouterProvider } from "react-router-dom";
import lightTheme from "./assets/lightTheme";
import router from "routes/router";
import { ThemeProvider } from "@mui/material";

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
