import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import AmbientFlow from "./components/AmbientFlow";
import { ReachOutProvider } from "./context/ReachOutContext";
import Home from "./pages/Home";
import Career from "./pages/Career";
import Projects from "./pages/Projects";
import Journal from "./pages/Journal";
import JournalPost from "./pages/JournalPost";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ReachOutProvider>
      <AmbientFlow />
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/career" element={<Career />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<JournalPost />} />
        </Routes>
      </main>
      <Footer />
    </ReachOutProvider>
  );
}

