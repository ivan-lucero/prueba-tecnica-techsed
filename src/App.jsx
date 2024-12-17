import "./index.css"
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes.tsx";

function App() {

  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  );
}

export default App;
