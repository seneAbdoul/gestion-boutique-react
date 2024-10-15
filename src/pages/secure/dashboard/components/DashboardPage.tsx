import { Card } from "flowbite-react";
import datasCard from "./data";
import CardComponent from "./card/CardComponent";
import "./DashboardPage.css"
export default function DashboardPage() {
  return (
    <main className="ping2  bg-white p-4 shadow-sm flex flex-col mt-7">
      <div className="p-8" style={{ background: 'linear-gradient(to right, #2b6cb0, #2d3748)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-4 gap-6" style={{ height: "80%" }}>
          {
            datasCard.map((card, index) =>
              <CardComponent key={index} data={card} />
            )
          }
        </div>
      </div>

      <div className="product-lists mt-2 flex justify-around">

        
        <div className="product-list-2 bg-white rounded-lg shadow p-4 mb-4 w-full max-w-2xl mx-2">
          <h3 className="text-xl font-bold mb-4">Lister les Produits</h3>
          <div className="overflow-x-auto">
            <table className="bg-white shadow-lg rounded-lg w-full">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="py-3 px-6 text-center">Nom</th>
                  <th className="py-3 px-6 text-center">Prenom</th>
                  <th className="py-3 px-6 text-center">Téléphone</th>
                  <th className="py-3 px-6 text-center">Montant</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-6 text-center">John Doe</td>
                  <td className="py-3 px-6 text-center">Jane Smith</td>
                  <td className="py-3 px-6 text-center">555-555-5555</td>
                  <td className="py-3 px-6 text-center">$1,000.00</td>
                </tr>
                <tr>
                  <td className="py-3 px-6 text-center">John Doe</td>
                  <td className="py-3 px-6 text-center">Jane Smith</td>
                  <td className="py-3 px-6 text-center">555-555-5555</td>
                  <td className="py-3 px-6 text-center">$1,000.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Deuxième tableau */}
        <div className="product-list-2 bg-white rounded-lg shadow p-4 mb-4 w-full max-w-2xl mx-2">
          <h3 className="text-xl font-bold mb-4">Lister les Produits</h3>
          <div className="overflow-x-auto">
            <table className="bg-white shadow-lg rounded-lg w-full">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="py-3 px-6 text-center">Article</th>
                  <th className="py-3 px-6 text-center">Quantité</th>
                  <th className="py-3 px-6 text-center">Prix</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-6 text-center">Produit 1</td>
                  <td className="py-3 px-6 text-center">10</td>
                  <td className="py-3 px-6 text-center">$10.00</td>
                </tr>
                <tr>
                  <td className="py-3 px-6 text-center">Produit 1</td>
                  <td className="py-3 px-6 text-center">10</td>
                  <td className="py-3 px-6 text-center">$10.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
