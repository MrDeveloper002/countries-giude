import { useDispatch, useSelector } from 'react-redux';
import { switchDarkMode } from '../Features/countrySlice';

function Header() {
   const { darkMode } = useSelector((state) => state.country);
   const dispatch = useDispatch();

   return (
      <header
         className={`fixed top-0 z-50 flex h-20 w-full items-center ${darkMode ? 'bg-dark-blue-dark-mode-elements text-gray-50' : 'text-very-dark-blue-dark-mode-text bg-white'} px-4 shadow-lg transition-all duration-500 ease-in-out sm:px-8 md:px-24`}
      >
         <div className="h-15 flex w-full items-center justify-between">
            <h1 className="text-xl font-extrabold sm:text-2xl md:text-3xl 2xl:text-4xl">
               Countries guide
            </h1>

            <button
               onClick={() => dispatch(switchDarkMode())}
               className="flex items-center px-3 py-2 font-semibold"
            >
               <i className="las la-moon mr-2 text-xl lg:text-2xl"></i>
               <span className="hidden text-base custom-sm:inline lg:text-lg">
                  Dark Mode
               </span>
            </button>
         </div>
      </header>
   );
}

export default Header;
