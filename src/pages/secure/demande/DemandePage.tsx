import React from 'react';

const DemandePage: React.FC = () => {
  return (
    <main className="mt-8 mx-4 md:mr-8 rounded-xl bg-white p-4 shadow-sm flex flex-col"
    style={{ marginLeft: "11%", width: "75em", height: "15em" }}>
      <div className="product-lists">
        <div className="p-4 sm:p-6 md:p-8 mb-8" style={{ background: 'linear-gradient(to right, #2b6cb0, #2d3748)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Carte Total des Dettes */}
            <div className="stat-card rounded-lg p-4 sm:p-6 text-white font-semibold text-lg sm:text-xl md:text-2xl flex flex-col justify-between">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-8">
                  <img
                    src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2"
                    alt="User Photo"
                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full"
                  />
                  <div className="flex flex-col justify-between h-full pb-4 text-center sm:text-left">
                    <p>Prenom: Ibrahima Sory</p>
                    <p>Nom: Diallo</p>
                    <p>Tel: 785619115</p>
                  </div>
                </div>
                <p className="email text-center sm:text-left">Email: sorydiallo371@gmail.com</p>
              </div>
            </div>

            {/* Carte Demandes en Cours */}
            <div className="stat-card rounded-lg p-4 sm:p-6 font-semibold text-white text-lg sm:text-xl md:text-3xl flex flex-col justify-between">
              <p>Montant Total: 100.000 FCFA</p>
              <p>Montant Versé: 55.000 FCFA</p>
              <p>Montant Restant: 45.000 FCFA</p>
            </div>
          </div>
        </div>
        <div className="product-list bg-white rounded-lg shadow p-4 w-full">
          <div className="mb-4">
            <div className="text-xl font-bold mb-4">Liste des demandes</div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <label htmlFor="status" className="mr-2">
                  Statut :
                </label>
                <select id="status" className="border border-gray-300 rounded px-2 py-1">
                  <option>En cours</option>
                  <option>Annulé</option>
                  <option>Accepter</option>
                </select>
              </div>
              <a href="../Client/faireDemande.html">
                <button className="bg-blue-600 text-white hover:bg-blue-700 py-1 px-4 rounded">
                  Nouvelle
                </button>
              </a>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-2 px-4 text-center">DATE</th>
                  <th className="py-2 px-4 text-center">MONTANT DETTE</th>
                  <th className="py-2 px-4 text-center">MONTANT RESTANT</th>
                  <th className="py-2 px-4 text-center">STATUT</th>
                  <th className="py-2 px-4 text-center">ACTION</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr>
                  <td className="border-t border-gray-200 py-2 px-4 text-center">24-07-2024</td>
                  <td className="border-t border-gray-200 py-2 px-4 text-center">20.000 FCFA</td>
                  <td className="border-t border-gray-200 py-2 px-4 text-center">10.000F CFA</td>
                  <td className="border-t border-gray-200 py-2 px-4 text-center text-blue-600">En Cours</td>
                  <td className="border-t border-gray-200 py-2 px-4 text-center">
                    <a href="../Client/detailDette.html">
                      <button className="bg-gray-400 hover:bg-gray-500 text-green-500 py-1 px-4 rounded">
                        <i className="fas fa-eye"></i> Détails
                      </button>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="border-t border-gray-200 py-2 px-4 text-center">24-07-2024</td>
                  <td className="border-t border-gray-200 py-2 px-4 text-center">20.000 FCFA</td>
                  <td className="border-t border-gray-200 py-2 px-4 text-center">3.000F CFA</td>
                  <td className="border-t border-gray-200 py-2 px-4 text-center text-red-600">Annulé</td>
                  <td className="border-t border-gray-200 py-2 px-4 text-center">
                    <a href="../Client/detailDette.html">
                      <button className="bg-gray-400 hover:bg-gray-500 text-green-500 py-1 px-4 rounded">
                        <i className="fas fa-eye"></i> Détails
                      </button>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="border-t border-gray-200 py-2 px-4 text-center">24-07-2024</td>
                  <td className="border-t border-gray-200 py-2 px-4 text-center">20.000 FCFA</td>
                  <td className="border-t border-gray-200 py-2 px-4 text-center">12.000F CFA</td>
                  <td className="border-t border-gray-200 py-2 px-4 text-center text-green-600">Accepter</td>
                  <td className="border-t border-gray-200 py-2 px-4 text-center">
                    <a href="../Client/detailDette.html">
                      <button className="bg-gray-400 hover:bg-gray-500 text-green-500 py-1 px-4 rounded">
                        <i className="fas fa-eye"></i> Détails
                      </button>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full h-12 flex justify-end mt-4 flex-wrap">
            <div className="flex justify-center mt-4 mb-2 sm:mb-0">
              <button className="px-3 py-1 border rounded mr-1">&lt;</button>
              <button className="px-3 py-1 border rounded mr-1 bg-blue-500 text-white">1</button>
              <button className="px-3 py-1 border rounded mr-1">2</button>
              <button className="px-3 py-1 border rounded">&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DemandePage;
