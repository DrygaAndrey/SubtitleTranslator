import './App.css';
import StartPage from './components/startPage/startPage';
import DetailsPage from './components/detailsPage/detailsPage';
import useStore from './store';
import Loading from './components/loading/loading';

function App() {
  const { file, loading } = useStore();
  return (
    <div className="App">
      {loading ? <Loading /> : <></>}
      {file === null ? <StartPage /> : <DetailsPage />}
    </div>
  );
}

export default App;
