import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import "../src/css/metricsComponent.css"

function MetricsComponent() {
  const { authToken } = useAuth();
  const baseURL = process.env.API_URL ?? "http://localhost:8080";
  const [serverMetrics, setServerMetrics] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMetrics = useCallback(() => {
    setLoading(true);
    fetch(`${baseURL}/metrics`, {
      headers: {
        authorization: authToken,
      },
    })
      .then((response) => response.text())
      .then((data) => formatMetrics(data))
      .then((formattedData) => setServerMetrics(formattedData))
      .catch((error) => console.error("Error fetching metrics:", error))
      .finally(() => setLoading(false));
  }, [authToken, baseURL]);

  const formatMetrics = (data) => {
    const lines = data.split("\n");
    const formattedMetrics = [];

    for (const line of lines) {
        // Skip help / type lines
        if(!line.startsWith("#")){
            const [name, value] = line.split(" ");
    
            if (name && value) {
                formattedMetrics.push({ name: name.trim(), value: value.trim() });
            }
        }
    };
    return formattedMetrics;
}

  useEffect(
    () => {
      fetchMetrics();
    },
    [fetchMetrics]
  );

  return (
    <div className="metric-component">
      <h1>Metrics</h1>
      <div className="loading">{loading ? "Loading..." : null}</div>
      <ul>
        {serverMetrics.map((metric) => (
          <li key={metric.name}>
            <div className="metric"> <strong>{metric.name}: </strong>{metric.value}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MetricsComponent;
