import { Route, Routes } from "react-router-dom";
import PageA from "./pages/PageA";
import PageB from "./pages/PageB";
import TestPage from "./pages/TestPage";
import Record from "./pages/Record";
import PageResult from "./pages/PageResult";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PageA />} />
        <Route path="/pageB" element={<PageB />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/record" element={<Record />} />
        <Route path="/result" element={<PageResult />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
