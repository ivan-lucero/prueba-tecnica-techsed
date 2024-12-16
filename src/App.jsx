import Appbar from "./components/appbar/Appbar.tsx";
import "./index.css"
import ProductList from "./views/ProductList.tsx";

function App() {

  return <div className="min-h-screen ">
    <Appbar/>
    <ProductList/>
  </div>;
}

export default App;
