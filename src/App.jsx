import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserNav } from '/components/nav/UserNav.jsx';
import { Home } from '/components/welcome/Home.jsx';
import { GettingStarted } from '/components/welcome/GettingStarted.jsx';
import { CatList } from '/components/Cats/CatList.jsx';
import { CatDetails } from '/components/Cats/CatDetails.jsx';
import { CatForm } from '/components/Cats/CatForm.jsx';
import { CatEdit } from '../components/cats/CatEdit.jsx';
import { CaretakerList } from '/components/Caretakers/CaretakerList.jsx'; 
import { CaretakerDetails } from '/components/Caretakers/CaretakerDetails.jsx'; 
import { Resources } from '/components/welcome/Resources.jsx';
import { About } from '/components/welcome/About.jsx';
import { Login } from '/components/auth/Login.jsx';
import { Register } from '/components/auth/Register.jsx';
import { CaretakerEdit } from '../components/caretakers/CaretakerEdit.jsx';
import './App.css';

export const App = () => {
  return (
    <div className="App">
      <UserNav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/getting-started" element={<GettingStarted />} />
        <Route path="/cat-list" element={<CatList />} />
        <Route path="/cat-details/:id" element={<CatDetails />} />
        <Route path="/cat-form" element={<CatForm />} />
        <Route path="/cat-edit/:id" element={<CatEdit />} />
        <Route path="/caretaker-list" element={<CaretakerList />} />
        <Route path="/caretaker-details/:id" element={<CaretakerDetails />} /> 
        <Route path="/caretaker-edit/:id" element={<CaretakerEdit />} />

        <Route path="/resources" element={<Resources />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
