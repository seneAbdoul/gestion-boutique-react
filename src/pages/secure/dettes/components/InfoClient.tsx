import React, { useEffect } from 'react';
import QRCode from 'react-qr-code';

interface Client {
  nom: string;
  prenom: string;
  telephone: string;
  adresse: string;
  genre: string;
  photo: string; // URL de la photo en base64
}

interface InfoClientProps {
  client: Client | null; 
}

const InfoClient: React.FC<InfoClientProps> = ({ client }) => {
  const qrData = client
    ? `${client.nom}:${client.prenom}:${client.telephone}:${client.adresse}`
    : '';

  useEffect(() => {
    if (client) {
      console.log("QR Data:", qrData);
      console.log("Photo URL:", client.photo); // Pour vérifier la chaîne base64
    }
  }, [client, qrData]);

  return (
    <div className="flex flex-col items-center">
      {/* Photo de l'utilisateur */}
      <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-300 rounded-full overflow-hidden mb-4 flex items-center justify-center">
        {client && client.photo ? (
          <img src={client.photo} alt="Photo du client" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <i className="fas fa-user-circle text-4xl sm:text-6xl"></i>
          </div>
        )}
      </div>

      {/* Champs de saisie et Code QR */}
      <div className="w-full flex flex-col sm:flex-row justify-between gap-4" style={{ marginLeft: "10%" }}>
        <div className="space-y-2 flex-grow">
          <div>
            <label htmlFor="nom" className="block font-semibold text-gray-700 mb-1" style={{ marginRight: "75%" }}>
              <i className="fas fa-user mr-2"></i>Nom :
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={client ? client.nom : ""}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              readOnly
            />
          </div>
          <div>
            <label htmlFor="prenom" className="block font-semibold text-gray-700 mb-1" style={{ marginRight: "70%" }}>
              <i className="fas fa-user mr-2"></i>Prénom :
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={client ? client.prenom : ""}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              readOnly
            />
          </div>
          <div className="mb-2">
            <label htmlFor="adresse" className="block font-semibold text-gray-700 mb-1" style={{ marginRight: "70%" }}>
              <i className="fas fa-map-marker-alt mr-2"></i>Adresse :
            </label>
            <input
              type="text"
              id="adresse"
              name="adresse"
              value={client ? client.adresse : ""}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              readOnly
            />
          </div>
        </div>

        {/* Espace pour afficher le code QR */}
        <div className="flex items-center justify-center" style={{ marginLeft: "6%", marginTop: "2%" }}>
          <div id="qr-code" className="w-48 h-48 sm:w-56 sm:h-56 border border-gray-300 flex items-center justify-center">
            {client && (
              <QRCode value={qrData} size={200} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoClient;
