function ErrorMessage(error) {
   let errorMessage = 'An unknown error occurred.';
   if (error.response) {
      errorMessage = `Error: ${error.response.status} - ${error.response.data.message}`;
   } else if (error.request) {
      errorMessage =
         'No response from the server. Please check your internet connection.';
   } else {
      errorMessage = `Request error: ${error.message}`;
   }

   return (
      <div
         className={`m-auto mt-12 w-[98%] rounded-md border-red-400 bg-red-100 px-4 py-2 text-center text-xs text-red-400 custom-sm:text-sm custom-md:w-3/4`}
      >
         {errorMessage}
      </div>
   );
}

export default ErrorMessage;
