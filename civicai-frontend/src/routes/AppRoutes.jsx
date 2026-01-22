import { Routes, Route } from "react-router-dom";
import ComponentPreview from "../pages/ComponentPreview";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/preview" element={<ComponentPreview />} />
    </Routes>
  );
};

export default AppRoutes;
