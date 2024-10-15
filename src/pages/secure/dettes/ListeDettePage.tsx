import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../../components/PagginationComponent"; // Assurez-vous que le chemin est correct

interface Article {
  id: number;
  libelle: string;
}

interface ArticleDette {
  articleId: number;
  quantiteArticleDette: number;
  article: Article;
}

interface Dette {
  id: number;
  date: string;
  montantDue: number;
  montantVerser: number;
  ArticleDette: ArticleDette[];
}

interface ClientInfo {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  adresse: string;
  genre: string;
  photo: string;
  user: {
    mail: string;
    role: string;
  };
  dettes: Dette[];
}

const ListeDettePage: React.FC = () => {
  const location = useLocation();
  const clientInfo = location.state?.client as ClientInfo;
  const navigate = useNavigate();  // Ajout du hook useNavigate

  const dettes = clientInfo?.dettes || [];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Calculs de la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDettes = dettes.slice(indexOfFirstItem, indexOfLastItem);

  const calculateReste = (montantDue: number, montantVerser: number): number => montantDue - montantVerser;

  const montantTotal = dettes.reduce((acc, dette) => acc + dette.montantDue, 0);
  const montantVerse = dettes.reduce((acc, dette) => acc + dette.montantVerser, 0);
  const montantRestant = dettes.reduce((acc, dette) => acc + calculateReste(dette.montantDue, dette.montantVerser), 0);

  // Gestion de la page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Fonction pour naviguer vers la page de détail
const handleDetailsClick = (dette: Dette) => {
  navigate("/boutique/detail", { state: { dette, client: clientInfo } });
  console.log(clientInfo);
};








  return (
    <div className="product-list bg-white rounded-lg shadow w-full mt-12" style={{ marginLeft: "10%" }}>
      <div className="p-4 sm:p-4 md:p-4 mb-3 bg-gradient-to-r from-blue-700 to-gray-700">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Carte Total des Dettes */}
          <div className="stat-card rounded-lg p-4 sm:p-6 text-white flex flex-col justify-between bg-gray-800">
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-8">
                <img
                  src={clientInfo?.photo || "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2"}
                  alt="User Photo"
                  className="w-20 h-20 sm:w-30 sm:h-30 md:w-36 md:h-36 rounded-full"
                />
                <div className="flex flex-col justify-between h-full pb-4 text-center sm:text-left" style={{ height: "12em" }}>
                  <p>Prenom: {clientInfo?.prenom || "Prénom"}</p>
                  <p>Nom: {clientInfo?.nom || "Nom"}</p>
                  <p>Tel: {clientInfo?.telephone || "Téléphone"}</p>
                </div>
              </div>
              <p className="email text-center sm:text-left">Email: {clientInfo?.user.mail || "Email"}</p>
            </div>
          </div>

          {/* Carte Demandes en Cours */}
          <div className="stat-card rounded-lg p-4 sm:p-6 text-white flex flex-col justify-between bg-gray-800">
            <p>Montant Total: {montantTotal.toLocaleString()} FCFA</p>
            <p>Montant Versé: {montantVerse.toLocaleString()} FCFA</p>
            <p>Montant Restant: {montantRestant.toLocaleString()} FCFA</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Liste des dettes</h2>
          <div>
            <button className="bg-red-500 text-white px-4 py-2 rounded mr-2">Non soldées</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 sm:mt-0">Soldées</button>
          </div>
        </div>

        <table className="w-full">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-2 text-center">DATE</th>
              <th className="p-2 text-center">MONTANT</th>
              <th className="p-2 text-center">VERSER</th>
              <th className="p-2 text-center">RESTANT</th>
              <th className="p-2 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentDettes.length > 0 ? (
              currentDettes.map((dette) => (
                <tr key={dette.id}>
                  <td className="p-2 text-center">{new Date(dette.date).toLocaleDateString()}</td>
                  <td className="p-2 text-center">{dette.montantDue} FCFA</td>
                  <td className="p-2 text-center">{dette.montantVerser} FCFA</td>
                  <td className="p-2 text-center">{calculateReste(dette.montantDue, dette.montantVerser)} FCFA</td>
                  <td className="p-2 text-center">
                    <button onClick={() => handleDetailsClick(dette)} className="bg-blue-500 text-white px-4 py-1 rounded">Détails</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-2 text-center" colSpan={5}>Aucune dette trouvée</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <Pagination
          totalPages={Math.ceil(dettes.length / itemsPerPage)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ListeDettePage;
