import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserNav } from '/components/nav/UserNav.jsx';
import { Home } from '/components/welcome/Home.jsx';
import { GettingStarted } from '/components/welcome/GettingStarted.jsx';
import { CatList } from '/components/Cats/CatList.jsx';
import { CatDetails } from '/components/Cats/CatDetails.jsx';
import { CatForm } from '/components/Cats/CatForm.jsx';
import { CaretakerList } from '/components/Caretakers/CaretakerList.jsx'; // Import CaretakerList
import { CaretakerDetails } from '/components/Caretakers/CaretakerDetails.jsx'; // Import CaretakerDetails

export const App = () => {
  return (
    <div className="App">
      <UserNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getting-started" element={<GettingStarted />} />
        <Route path="/cat-list" element={<CatList />} />
        <Route path="/cat-details/:id" element={<CatDetails />} />
        <Route path="/cat-form" element={<CatForm />} />
        <Route path="/caretaker-list" element={<CaretakerList />} />
        <Route path="/caretaker-details/:id" element={<CaretakerDetails />} /> 
      </Routes>
    </div>
  );
};

export default App;
