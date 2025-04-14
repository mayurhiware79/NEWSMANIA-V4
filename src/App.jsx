// DEFAULT LANDING PAGE
import React from "react";
import "./i18n";
import Hero from "./components/custom/Hero";

const App = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
      </main>
    </div>
  );
};

export default App;
