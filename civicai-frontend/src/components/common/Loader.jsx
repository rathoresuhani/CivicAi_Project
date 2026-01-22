const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12">
      <div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-black animate-spin" />
      <p className="mt-4 text-sm text-gray-600">{text}</p>
    </div>
  );
};

export default Loader;