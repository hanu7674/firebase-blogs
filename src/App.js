import React from "react";
import Main from "./components/main";
import "bootstrap/dist/css/bootstrap.min.css";
import "rsuite/dist/rsuite.min.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./App.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  return (
    <>
      <Main />
    </>
  );
}

export default App;
