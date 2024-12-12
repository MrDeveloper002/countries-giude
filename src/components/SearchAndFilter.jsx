import { useDispatch, useSelector } from 'react-redux';
import {
   filterValueByRegion,
   searchValueCountry,
} from '../Features/countrySlice';
import MagnifyGlass from '../assets/search-svgrepo-com.svg';
import MagnifyGlassWhite from '../assets/search-white-svgrepo-com.svg';
import XMark from '../assets/cross-svgrepo-com.svg';
import XMarkWhite from '../assets/cross-white-svgrepo-com.svg';
import DownArrow from '../assets/arrow-down-339-svgrepo-com.svg';
import DownArrowWhite from '../assets/arrow-down-339-white-svgrepo-com.svg';
import { useEffect, useRef, useState } from 'react';

function SearchAndFilter() {
   const [showFilter, setShowFilter] = useState(false);
   const { darkMode, searchValue, filterValue } = useSelector(
      (state) => state.country,
   );
   const dispatch = useDispatch();

   const inputEl = useRef(null);

   const filterOptions = [
      'All',
      'Africa',
      'Americas',
      'Asia',
      'Europe',
      'Oceania',
   ];

   function setSearchQuery(value) {
      dispatch(searchValueCountry(value));
   }

   function toggleFilterValue() {
      setShowFilter(!showFilter);
   }

   useEffect(function () {
      function callback(e) {
         if (document.activeElement === inputEl.current) return;

         if (e.code === 'Enter') {
            inputEl.current.focus();
         }
      }

      document.addEventListener('keydown', callback);
      return () => document.removeEventListener('keydown', callback);
   }, []);

   return (
      <>
         <div
            className={`flex w-full flex-col items-center justify-start custom-md:flex-row custom-md:items-start custom-md:justify-between ${darkMode ? 'text-gray-50' : 'text-very-dark-blue-light-mode-text'} mb-12`}
         >
            <div
               className={`relative mb-5 flex h-14 w-[98%] items-center justify-between sm:w-[440px] custom-md:mb-0 ${darkMode ? 'bg-dark-blue-dark-mode-elements shadow-blue-200' : 'bg-white shadow-dark-blue-dark-mode-elements'} overflow-hidden rounded-md shadow-2xl transition-all duration-500 ease-in-out`}
            >
               <img
                  src={MagnifyGlass}
                  className={`w-5 ${darkMode ? 'hidden' : 'inline'} absolute left-6`}
               />
               <img
                  src={MagnifyGlassWhite}
                  className={`w-5 ${darkMode ? 'inline' : 'hidden'} absolute left-6`}
               />
               <input
                  type="text"
                  placeholder="Search for a country..."
                  value={searchValue}
                  className="h-full w-full bg-transparent pl-14 outline-none"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  ref={inputEl}
               />
               <button
                  onClick={() => dispatch(searchValueCountry(''))}
                  className={`${searchValue !== '' ? 'inline' : 'hidden'} absolute right-6`}
               >
                  <img
                     src={XMark}
                     alt="close button"
                     className={`w-8 ${darkMode ? 'hidden' : 'inline'} `}
                  />
                  <img
                     src={XMarkWhite}
                     alt="close button"
                     className={`w-8 ${darkMode ? 'inline' : 'hidden'} `}
                  />
               </button>
            </div>

            <div
               className={`relative ml-36 h-14 w-48 rounded-md custom-md:mr-0 ${darkMode ? 'bg-dark-blue-dark-mode-elements shadow-blue-200' : 'bg-white shadow-dark-blue-dark-mode-elements'} shadow-2xl transition-all duration-500 ease-in-out`}
            >
               <button
                  className="flex h-full w-full items-center justify-between px-5"
                  onClick={toggleFilterValue}
               >
                  <span className="text-sm font-semibold">
                     Filter by Region
                  </span>
                  <img
                     src={DownArrow}
                     className={`w-3 transform transition-transform ${darkMode ? 'hidden' : 'inline'} ${showFilter ? 'rotate-180' : ''}`}
                  />
                  <img
                     src={DownArrowWhite}
                     className={`w-3 transform transition-transform ${darkMode ? 'inline' : 'hidden'} ${showFilter ? 'rotate-180' : ''}`}
                  />
               </button>
               <p className="absolute right-56 top-1/2 flex w-40 -translate-y-1/2 justify-end text-sm font-semibold">
                  Current Filter: {filterOptions[filterValue - 1]}
               </p>
               <div
                  className={`absolute top-16 z-50 h-56 w-full p-4 text-sm ${darkMode ? 'bg-dark-blue-dark-mode-elements text-gray-300' : 'bg-white text-very-dark-blue-light-mode-text'} ${showFilter ? 'flex' : 'hidden'} flex-col items-start justify-between rounded-md shadow-md transition-all duration-500 ease-in-out`}
               >
                  <button
                     onClick={() => dispatch(filterValueByRegion(1))}
                     className="w-full pl-1 text-left"
                  >
                     All
                  </button>
                  <button
                     onClick={() => dispatch(filterValueByRegion(2))}
                     className="w-full pl-1 text-left"
                  >
                     Africa
                  </button>
                  <button
                     onClick={() => dispatch(filterValueByRegion(3))}
                     className="w-full pl-1 text-left"
                  >
                     Americas
                  </button>
                  <button
                     onClick={() => dispatch(filterValueByRegion(4))}
                     className="w-full pl-1 text-left"
                  >
                     Asia
                  </button>
                  <button
                     onClick={() => dispatch(filterValueByRegion(5))}
                     className="w-full pl-1 text-left"
                  >
                     Europe
                  </button>
                  <button
                     onClick={() => dispatch(filterValueByRegion(6))}
                     className="w-full pl-1 text-left"
                  >
                     Oceania
                  </button>
                  {/* <button
                     onClick={() => dispatch(filterValueByRegion(7))}
                     className="w-full pl-1 text-left"
                  >
                     Polar
                  </button> */}
               </div>
            </div>
         </div>
      </>
   );
}

export default SearchAndFilter;
