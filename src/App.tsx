import React from "react";
import "./App.css";
import RevisionHistogramPage from "./pages/RevisionHistogram";

console.log("RevisionHistogramPage", RevisionHistogramPage);

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <RevisionHistogramPage />
      </header>
    </div>
  );
};

export default App;
