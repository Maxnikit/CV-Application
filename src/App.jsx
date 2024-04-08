import "./App.css";
import Header from "./components/Header";
import General from "./components/General";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Footer from "./components/Footer";


function App() {
  return (
    <>
      <Header />
      <div className="main"
        <General />
        <Education />
        <Experience />
      </div>
      <Footer />
    </>
  );
}

export default App;
