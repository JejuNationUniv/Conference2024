import { Route, Routes } from "react-router-dom";
import PageA from "./pages/PageA";
import PageB from "./pages/PageB";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PageA />} />
        <Route path="/pageB" element={<PageB />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
