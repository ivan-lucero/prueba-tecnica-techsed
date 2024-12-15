import Product from "./components/product/ProductItem.tsx";
import { products } from "./data/products.ts";
import "./index.css"
import ProductList from "./views/ProductList.tsx";

function App() {
  return <div className="min-h-screen ">
    <ProductList products={products}/>
  </div>;
}

export default App;
