import { useState, useCallback } from "react";  // ← add useCallback
import Nav from "./assets/components/Nav/Nav"
import Banner from "./assets/components/Banner/Banner";
import Main from "./assets/components/MainSection/Main";
import Footer from "./assets/components/Footer/Footer";

export default function App() {
  const [stats, setStats] = useState({ inProgress: 0, resolved: 0 });

  // ✅ Stable reference — won't re-trigger the useEffect in Main
  const handleStatsChange = useCallback((newStats) => {
    setStats(newStats);
  }, []);

  return (
    <div style={{ background: "#060d1a", minHeight: "100vh" }}>
      <Nav />
      <Banner
        inProgress={stats.inProgress}
        resolved={stats.resolved}
      />
      <Main onStatsChange={handleStatsChange} />
      <Footer />
    </div>
  );
}