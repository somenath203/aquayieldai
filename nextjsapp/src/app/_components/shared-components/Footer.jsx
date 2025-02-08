const Footer = () => {
  return (
    <footer className="py-6 bg-gray-900 text-white mt-auto">

      <div className="container mx-auto px-6">

        <div className="flex flex-col items-center justify-center space-y-2 text-center">

          <p>&copy; {new Date().getFullYear()} AquaYield AI</p>

          <p className="text-gray-400">
            Made with <span className="text-red-500">❤️</span> by Somenath Choudhury
          </p>

        </div>

      </div>

    </footer>
  );
};


export default Footer;
