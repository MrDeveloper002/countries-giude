import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { fetchCountries } from '../Features/countrySlice';
import { useEffect, useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';

function CountryDetails() {
   const { darkMode, status, error, data } = useSelector(
      (state) => state.country,
   );
   const navigate = useNavigate();
   const { countryName } = useParams();
   const dispatch = useDispatch();
   const [country, setCountry] = useState(null);

   useEffect(
      function () {
         const fetchDataFromAPI = async () => {
            dispatch(fetchCountries());
            const updatedData = JSON.parse(
               localStorage.getItem('countries') || '[]',
            );
            const foundCountry = updatedData.find(
               (item) =>
                  item.name.common.toLowerCase() === countryName.toLowerCase(),
            );
            setCountry(foundCountry);
         };
         if (!data || data.length === 0) {
            fetchDataFromAPI();
         } else {
            const foundCountry = data.find(
               (item) =>
                  item.name.common.toLowerCase() === countryName.toLowerCase(),
            );
            setCountry(foundCountry);
         }
      },
      [countryName, dispatch, data],
   );

   function getBorderCountry(borderCode) {
      if (!data) return null;
      const borderCountry = data.find((item) => item.cca3 === borderCode);
      return borderCountry ? borderCountry.name.common : borderCode;
   }

   if (status === 'loading') return <LoadingSpinner />;

   if (!country) {
      return (
         <p className="relative -top-48 flex min-h-screen items-center justify-center">
            Finding the desired country...
         </p>
      );
   }

   if (error) return <ErrorMessage error={error} />;

   return (
      <>
         <Header />

         <div
            className={`flex min-h-screen w-full flex-col px-8 pt-32 custom-lg:px-24 ${
               darkMode
                  ? 'bg-very-dark-blue-dark-mode-background text-white'
                  : 'bg-very-light-gray-light-mode-background text-very-dark-blue-light-mode-text transition-all duration-500 ease-in-out'
            } transition-all duration-500 ease-in-out`}
         >
            <div className="mb-14 w-full">
               <button
                  onClick={() => navigate('/')}
                  className={`h-10 w-32 ${darkMode ? 'bg-dark-blue-dark-mode-elements text-gray-100 shadow-blue-200' : 'bg-white text-very-dark-blue-light-mode-text shadow-dark-gray-light-mode-input'} rounded-md font-bold shadow-2xl transition-all duration-500 ease-in-out`}
               >
                  <i className="las la-arrow-left mr-3"></i>
                  Back
               </button>
            </div>

            <div
               className={`mb-32 flex w-full flex-col items-center justify-between xl:flex-row xl:items-start`}
               key={country.name.common}
            >
               <div className="relative h-auto w-[98%] sm:h-[400px] sm:w-[580px]">
                  <img
                     src={country.flags.svg}
                     alt=""
                     className="h-full w-full object-cover"
                  />
               </div>

               <div className="w-[98%] sm:w-[560px]">
                  <h2 className="mb-7 mt-10 text-3xl font-extrabold">
                     {country.name.common}
                  </h2>
                  <div className="flex w-full flex-col text-[0.82rem] font-medium sm:flex-row md:text-sm lg:text-base">
                     <div className="mb-8 flex w-full flex-col sm:w-1/2">
                        <p className="mb-2">
                           <span className="font-bold">Native Name:</span>{' '}
                           <span
                              className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                           >
                              {country.name.nativeName[
                                 Object.keys(country.name.nativeName)[0]
                              ].common || 'Not available'}
                           </span>
                        </p>
                        <p className="mb-2">
                           <span className="font-bold">Population:</span>{' '}
                           <span
                              className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                           >
                              {country.population.toLocaleString('en-US', {
                                 style: 'decimal',
                              })}
                           </span>
                        </p>
                        <p className="mb-2">
                           <span className="font-bold">Region:</span>{' '}
                           <span
                              className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                           >
                              {country.region}
                           </span>
                        </p>
                        <p className="mb-2">
                           <span className="font-bold">Sub Region:</span>{' '}
                           <span
                              className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                           >
                              {country.subregion}
                           </span>
                        </p>
                        <p className="mb-2">
                           <span className="font-bold">Capital:</span>{' '}
                           <span
                              className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                           >
                              {country.capital[0]}
                           </span>
                        </p>
                     </div>
                     <div>
                        <p className="mb-2">
                           <span className="font-bold">Top Level Domain:</span>{' '}
                           <span
                              className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                           >
                              {country.tld[0]}
                           </span>
                        </p>
                        <p className="mb-2">
                           <span className="font-bold">Currencies:</span>
                           &nbsp;
                           <span
                              className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                           >
                              {country.currencies[
                                 Object.keys(country.currencies)[0]
                              ].name || 'Not available'}
                           </span>
                        </p>

                        <p className="mb-2">
                           <span className="font-semibold">Languages:</span>
                           &nbsp;
                           <span
                              className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                           >
                              {Object.values(country.languages).join(', ')}
                           </span>
                        </p>
                     </div>
                  </div>
                  <div className="mt-16 flex w-full flex-col sm:flex-row">
                     <p className="mb-3 w-full font-semibold sm:w-[25%]">
                        Border Countries:
                     </p>
                     <ul className="flex w-full flex-wrap gap-2 sm:w-[75%] custom-md:gap-1">
                        {country.borders
                           ? country.borders.map((border, index) => (
                                <li
                                   className={`text-xs shadow-md custom-md:text-sm ${
                                      darkMode
                                         ? 'text-blue-200 shadow-blue-200 hover:text-white hover:shadow-white'
                                         : 'shadow-dark-gray-light-mode-input hover:bg-gray-300'
                                   } mb-3 mr-1 rounded-md px-4 py-1 transition-all duration-500 ease-in-out`}
                                   key={index}
                                >
                                   <Link
                                      to={`/country/${getBorderCountry(border).toLowerCase()}`}
                                   >
                                      {getBorderCountry(border)}
                                   </Link>
                                </li>
                             ))
                           : 'No bordering countries'}
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default CountryDetails;
