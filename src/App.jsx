import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserNav } from '/components/nav/UserNav.jsx';
import { Home } from '/components/welcome/Home.jsx';
import { GettingStarted } from '/components/welcome/GettingStarted.jsx';
import { CatList } from '/components/Cats/CatList.jsx';
import { CatDetails } from '/components/Cats/CatDetails.jsx';

export const App = () =>  {
  return (
      <div className="App">
        <UserNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/getting-started" element={<GettingStarted />} />
          <Route path="/cat-list" element={<CatList />} />
          <Route path="/cat-details/:id" element={<CatDetails />} /> 
        </Routes>
      </div>

  );
}

export default App;