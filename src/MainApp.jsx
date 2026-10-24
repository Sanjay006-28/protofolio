import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import FallbackSpinner from './components/FallbackSpinner';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './components/NotFound';
import endpoints from './constants/endpoints';

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="MainApp">
      <NavBar />
      <main className="main">
        {data ? (
          <Suspense fallback={<FallbackSpinner />}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              {data.sections.map((route) => {
                const SectionComponent = React.lazy(() => import(`./components/${route.component}.jsx`));
                return (
                  <Route
                    key={route.headerTitle}
                    path={route.path}
                    element={<SectionComponent header={route.headerTitle} />}
                  />
                );
              })}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        ) : (
          <FallbackSpinner />
        )}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default MainApp;
