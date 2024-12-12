function LoadingSpinner() {
   return (
      <div className="relative -top-48 flex min-h-screen items-center justify-center">
         <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-blue-600"></div>
      </div>
   );
}

export default LoadingSpinner;
