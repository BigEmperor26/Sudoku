import { createBrowserRouter } from "react-router-dom";

import Sudoku2DComplete from "pages/Sudoku2DComplete";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sudoku2DComplete />,
  },
]);

export default router;
