import React from "react";
import "./css/App.css";
import TimeComponent from "./timeComponent";
import MetricsComponent from "./metricsComponent";

function App() {
    return (
      <div className="app-container">
        <div className="left-column">
          <TimeComponent />
        </div>
        <div className="right-column">
          <MetricsComponent />
        </div>
      </div>
    );
}

export default App;
