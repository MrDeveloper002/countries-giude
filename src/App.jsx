import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import Home from './pages/Home';
import CountryDetails from './pages/CountryDetails';

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:countryName" element={<CountryDetails />} />
            <Route path="*" element={<PageNotFound />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
