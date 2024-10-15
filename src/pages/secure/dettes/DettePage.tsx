import React from "react";
import FormClient from "./components/FormClient";
import SuiviDette from "./components/SuiviDette"; // Assurez-vous que le chemin est correct

const DettePage = () => {
  return (
    <div style={{marginLeft:"10%",height:"30em"}}>
      <h1 className="text-3xl font-bold mb-6">Gestion des Dettes</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <FormClient />
        </div>
        <div className="flex-1">
          <SuiviDette />
        </div>
      </div>
    </div>
  );
};

export default DettePage;
