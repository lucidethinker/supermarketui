

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 p-4 text-center mt-7">
      &copy; {currentYear}  All rights reserved.
    </footer>
  );
};

export default Footer;