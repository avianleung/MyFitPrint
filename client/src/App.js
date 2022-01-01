import Workout from "./components/Workout";
import "./App.css";
import Container from "@material-ui/core/Container";
import Navbar from "./components/Navbar";
import DateSelect from "./components/DatePicker";

function App() {
  return (
    <div className='App' style={{ height: "100vh" }}>
      <Navbar />
      <Container maxWidth='sm' style={{ marginTop: "3%" }}>
        <DateSelect />
      </Container>
    </div>
  );
}

export default App;
