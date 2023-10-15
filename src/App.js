
import "./index.css"
import MainPage from './components/MainPage';
import ToDos from './components/ToDos';

function App() {
  return (
    <div className="App">
      <MainPage>
        <ToDos />
      </MainPage>
    </div>
  );
}

export default App;
