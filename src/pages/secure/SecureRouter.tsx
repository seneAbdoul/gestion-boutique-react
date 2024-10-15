import { Route, Routes } from "react-router-dom";
import { ArticlePage, DashboardPage, DettePage, ErrorPage, LayoutSecure } from "./Export";
import ListeDette from "./dettes/ListeDettePage";
import DetailPage from "./dettes/DetailPage";
import NouveauDette from "./dettes/NouvelleDette";
import ListeClient from "./clients/ListeClient";
import ListeDetteClientPage from "./clients/ListeDettePageClient";
import DemandePage from "./demande/DemandePage";
export default function SecureRouter(){
    return(
        <div>
         <Routes>
            <Route element={<LayoutSecure/>} >
               <Route index element={<ArticlePage/>} />
               <Route path='dashboard' element={<DashboardPage/>} />
               <Route path='article' element={<ArticlePage/>} />
               <Route path='dette' element={<DettePage/>} />
               <Route path='listedette' element={<ListeDette/>} />
               <Route path='detail' element={<DetailPage/>} />
               <Route path='nouvelle' element={<NouveauDette/>} />
               <Route path='client' element={<ListeClient/>} />
               <Route path='detteclient' element={<ListeDetteClientPage/>} />
               <Route path='demande' element={<DemandePage/>} />
            </Route>
            <Route path='*' element={<ErrorPage/>} />
         </Routes>
        </div>
    )
}