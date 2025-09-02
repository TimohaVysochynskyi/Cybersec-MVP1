import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy loading компонентів
const LandingPage = lazy(() => import("./landing/LandingPage"));
const SimulationPage = lazy(() => import("./simulation/SimulationPage"));

// Компонент для завантаження
const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "18px",
    }}
  >
    Loading...
  </div>
);

export default function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/simulation" element={<SimulationPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
