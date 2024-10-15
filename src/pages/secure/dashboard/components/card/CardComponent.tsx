import { CardModel } from "../data";
import "./CardComponent.css"
interface Props{
  data:CardModel
}
export default function CardComponent({ data} : Props){
    return (
        <div className="stat-card rounded-lg p-2 text-white h-40">
              <div className="flex items-center">
                <div className="stat-icon w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <i className={data.icon}></i>
                </div>
                <h3 className="font-semibold text-lg">{data.text}</h3>
              </div>
              <p className="font-bold text-lg">{data.stat}</p>
              <div className="flex items-center text-sm">
                <i className="fas fa-arrow-up mr-1 text-green-400"></i>
                <span className="text-green-400">{data.pourcents}</span>
                <span className="ml-2 text-gray-300">{data.description}</span>
              </div>
        </div>

    );

}