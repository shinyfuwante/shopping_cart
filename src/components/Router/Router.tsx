import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import StorePage from "../StorePage/StorePage";


export const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage></HomePage>}/>
            <Route path="/store" element={<StorePage></StorePage>}/>      
        </Routes>
    </BrowserRouter>
  )
}

