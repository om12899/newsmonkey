import Navbar from "./components/Navbar";
import NewsComponent from "./components/NewsComponent";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <NewsComponent  country = {'in'} pageSize = {5}/>
    </div>
  );
}

export default App;
