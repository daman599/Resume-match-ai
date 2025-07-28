const ErrorComponent = () =>{
  return (
  <div className="flex items-center justify-center h-screen w-screen">
    <div className="flex flex-col items-center justify-center space-y-2 text-center text-white">
      <p className="font-inter font-semibold text-xl">Something went wrong.</p>
      <p className="font-inter text-sm ">Try again later.</p>
    </div>
  </div>
  );
}

export default ErrorComponent;