// import { useSelector } from 'react-redux';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import SearchAndFilter from '../components/SearchAndFilter';
import CountriesCards from '../components/CountriesCards';

function Home() {
   const { darkMode } = useSelector((state) => state.country);

   return (
      <>
         <Header />
         <div
            className={`flex h-auto min-h-screen w-full flex-col px-4 pb-20 pt-32 sm:px-10 lg:px-24 ${darkMode ? 'bg-very-dark-blue-dark-mode-background text-white' : 'bg-very-light-gray-light-mode-background text-very-dark-blue-light-mode-text'} transition-all duration-500 ease-in-out`}
         >
            <SearchAndFilter />
            <CountriesCards />
         </div>
      </>
   );
}

export default Home;
