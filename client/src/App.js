import Workout from "./components/Workout";
import "./App.css";
import Container from "@material-ui/core/Container";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className='App' style={{ height: "100vh" }}>
      <Navbar />
      <Container maxWidth='sm'>
        <Workout />
      </Container>
    </div>
  );
}

export default App;
