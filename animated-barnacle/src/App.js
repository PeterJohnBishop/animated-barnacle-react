import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MainNavBar from './views/navBar';
import MainCarousel from './views/carousel';
import MainCards from './views/cards';
import MainFooter from "./views/footer";

function App() {
  return (
    <div className="App">
      <MainNavBar />
      <MainCarousel />
      <MainCards />
      <MainFooter />
    </div>
  );
}

export default App;
