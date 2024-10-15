import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoClient from "./InfoClient";
import { fetchClientByTelephone } from "../../../../services/ClientService";

const SuiviDette = () => {
  const [clientInfo, setClientInfo] = useState(null);
  const [telephone, setTelephone] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const client = await fetchClientByTelephone(telephone);
      setClientInfo(client);
    } catch (error) {
      console.error(error);
      alert("Client non trouvé");
    }
  };

  const handleDettesClick = () => {
    if (clientInfo) {
      navigate("/boutique/listedette", { state: { client: clientInfo } });
    }
  };

  const handleNouvelleClick = () => {
    if (clientInfo) {
      navigate("/boutique/nouvelle", { state: { client: clientInfo } });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6" style={{ width: "48em" }}>
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-blue-800">
        <i className="fas fa-search-dollar mr-2"></i>Suivi de Dette
      </h2>
      <form className="mb-4 flex flex-col sm:flex-row gap-2" onSubmit={handleSearch}>
        <label htmlFor="telephone" className="w-full sm:w-auto flex-shrink-0 font-semibold text-gray-700 flex items-center">
          <i className="fas fa-phone mr-2"></i>Tél :
        </label>
        <input
          type="tel"
          id="telephone"
          name="telephone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          className="input-shadow flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <button type="submit" className="btn bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-2 sm:mt-0">
          <i className="fas fa-search mr-2"></i>OK
        </button>
      </form>

      <div className="mb-4 flex flex-wrap justify-start gap-4 sm:gap-2">
        <button className="bg-red-500 text-white px-4 py-2 rounded flex items-center">
          <i className="fas fa-user mr-2"></i>Infos
        </button>
        <button onClick={handleDettesClick} className="bg-gray-300 text-gray-700 px-4 py-2 rounded flex items-center">
          <i className="fas fa-file-invoice-dollar mr-2"></i>Dettes
        </button>
        <button onClick={handleNouvelleClick} className="bg-gray-300 text-gray-700 px-4 py-2 rounded flex items-center">
          <i className="fas fa-plus mr-2"></i>Nouvelle
        </button>

        <div style={{ width: "90%" }}>
          <InfoClient client={clientInfo} />
        </div>
      </div>
    </div>
  );
};

export default SuiviDette;
