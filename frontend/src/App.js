import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
// import Maps from "./pages/Maps.jsx";
import FileUploadForm from "./pages/FileUpload.jsx";
import Navbar from "./components/Navbar.jsx";
import Soil from "./pages/Soil.jsx";
import { CoordinateProvider } from "./utils/CoordinateContext.js";
import MapComponent from "./components/MapComponent.jsx";
function App() {
  return (
    <div className="">
      <CoordinateProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maps" element={<MapComponent/>}/>
        <Route path="/upload" element={<FileUploadForm />} />
        <Route path="/soil" element={<Soil/>}/>
      </Routes>
      </CoordinateProvider>
    </div>
  );
}

export default App;
