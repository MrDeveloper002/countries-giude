import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '../Features/countrySlice';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';

function CountriesCards() {
   const dispatch = useDispatch();
   const { darkMode, searchValue, filterValue, data, status, error } =
      useSelector((state) => state.country);

   useEffect(
      function () {
         if (status === 'idle') {
            dispatch(fetchCountries());
         }
      },
      [status, dispatch],
   );

   if (status === 'loading') return <LoadingSpinner />;

   if (error) return <ErrorMessage error={error} />;

   const regionNames = ['', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

   const getRegionNameFromFilterValue = (filterValue) => {
      return regionNames[filterValue - 1];
   };

   const filteredCountries = data.filter((country) => {
      const matchesFilter =
         filterValue === 1 ||
         country.region === getRegionNameFromFilterValue(filterValue);
      const matchesSearch =
         searchValue === '' ||
         country.name.common.toLowerCase().includes(searchValue.toLowerCase());
      return matchesSearch && matchesFilter;
   });

   return (
      <div className="flex flex-wrap justify-around gap-16">
         {status === 'succeeded' &&
            filteredCountries.map((country) => (
               <Link
                  key={country.name.common}
                  to={`/country/${country.name.common}`}
               >
                  <div
                     className={`h-[336px] w-64 overflow-hidden rounded-md ${darkMode ? 'shadow-2xl shadow-blue-200' : 'shadow-lg shadow-dark-gray-light-mode-input'} transition-all duration-500 ease-in-out hover:scale-105 hover:cursor-pointer`}
                  >
                     <div className="flex h-40 w-full items-center justify-center overflow-hidden">
                        <img
                           src={country.flags.svg}
                           alt=""
                           className="h-full w-full object-cover"
                        />
                     </div>
                     <div
                        className={`h-44 w-full px-6 pt-6 ${
                           darkMode
                              ? 'bg-dark-blue-dark-mode-elements text-very-light-gray-light-mode-background'
                              : 'bg-white text-very-dark-blue-light-mode-text'
                        } transition-all duration-500 ease-in-out`}
                     >
                        <div className="h-full w-full">
                           <h1 className="mb-3 font-extrabold">
                              {country.name.common}
                           </h1>
                           <p className="mb-1 text-sm">
                              <span className="font-bold">Population:</span>{' '}
                              {country.population.toLocaleString('en-US', {
                                 style: 'decimal',
                              })}
                           </p>
                           <p className="mb-1 text-sm">
                              <span className="font-bold">Region:</span>{' '}
                              {country.region}
                           </p>
                           <p className="mb-1 text-sm">
                              <span className="font-bold">Capital:</span>{' '}
                              {country.capital}
                           </p>
                        </div>
                     </div>
                  </div>
               </Link>
            ))}
      </div>
   );
}

export default CountriesCards;
