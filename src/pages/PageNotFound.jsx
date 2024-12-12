import { Link } from 'react-router-dom';

function PageNotFound() {
   return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
         <div className="text-center">
            <h1 className="mb-4 text-6xl font-bold">404</h1>
            <p className="text-2xl">The desired page was not found</p>
            <Link
               to="/"
               className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white"
            >
               Back to the main page
            </Link>
         </div>
      </div>
   );
}

export default PageNotFound;
