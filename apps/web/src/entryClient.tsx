import React from "react";
import { hydrateRoot } from "react-dom/client";
import { App } from "./app/App.tsx";
import "./style.css"

const container = document.querySelector("#root");

const ClientEntry: React.FC = () => {
  return (
    <App />
  );
}

if (container !== null) {
  hydrateRoot(container, <ClientEntry />);
}
