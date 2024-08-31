import React, { useEffect, useState } from 'react';
import './App.css';
import About from './components/about/About';
import CourseHome from './components/allcourses/CourseHome';
import Blog from './components/blog/Blog';
import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import Contact from './components/contact/Contact';
import Home from './components/home/Home';
// import OnlineTest from "./components/onlineTest/OnlineTest";
import Pricing from './components/pricing/Pricing';
import Team from './components/team/Team';
import OnlineTest from './components/OnlineTest/OnlineTest';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const renderComponent = () => {
    switch (currentPath) {
      case '/onlinetest':
        return <OnlineTest />;
      case '/about':
        return <About />;
      case '/courses':
        return <CourseHome />;
      case '/team':
        return <Team />;
      case '/pricing':
        return <Pricing />;
      case '/journal':
        return <Blog />;
      case '/contact':
        return <Contact />;
      case '/':
      default:
        return <Home />;
    }
  };

  return (
    <>
      <Header navigate={navigate} />
      {renderComponent()}
      <Footer />
    </>
  );
}

export default App;

// https://github.com/Inamullah619///
