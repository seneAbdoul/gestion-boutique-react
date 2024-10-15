import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Pagination from "../../../components/PagginationComponent";

interface Article {
  id: number;
  libelle: string;
  prix: number;
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

const DetailDettePage: React.FC = () => {
  const location = useLocation();
  const clientInfo = location.state?.client as ClientInfo;

  const dettes = clientInfo?.dettes || [];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Filtrage des dettes pour les afficher par pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDettes = dettes.slice(indexOfFirstItem, indexOfLastItem);

  const montantTotal = dettes.reduce((acc, dette) => acc + dette.montantDue, 0);
  const montantVerse = dettes.reduce((acc, dette) => acc + dette.montantVerser, 0);
  const montantRestant = montantTotal - montantVerse;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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

          {/* Carte Montants */}
          <div className="stat-card rounded-lg p-4 sm:p-6 text-white flex flex-col justify-between bg-gray-800">
            <p>Montant Total: {montantTotal.toLocaleString()} FCFA</p>
            <p>Montant Versé: {montantVerse.toLocaleString()} FCFA</p>
            <p>Montant Restant: {montantRestant.toLocaleString()} FCFA</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Liste des articles</h2>
          <div>
            <button className="bg-red-500 text-white px-4 py-2 rounded mr-2">Annuler</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 sm:mt-0">Enregistrer</button>
          </div>
        </div>

        <table className="w-full">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-2 text-center">DATE</th>
              <th className="p-2 text-center">ARTICLE</th>
              <th className="p-2 text-center">QUANTITE</th>
              <th className="p-2 text-center">PRIX</th>
              <th className="p-2 text-center">MONTANT</th>
            </tr>
          </thead>
          <tbody>
            {currentDettes.length > 0 ? (
              currentDettes.map((dette) =>
                dette.ArticleDette.map((articleDette) => (
                  <tr key={articleDette.articleId}>
                    <td className="p-2 text-center">{new Date(dette.date).toLocaleDateString()}</td>
                    <td className="p-2 text-center">{articleDette.article.libelle}</td>
                    <td className="p-2 text-center">{articleDette.quantiteArticleDette}</td>
                    <td className="p-2 text-center">{articleDette.article.prix} FCFA</td>
                    <td className="p-2 text-center">{(articleDette.quantiteArticleDette * articleDette.article.prix).toLocaleString()} FCFA</td>
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td className="p-2 text-center" colSpan={5}>Aucun article trouvé</td>
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

export default DetailDettePage;
