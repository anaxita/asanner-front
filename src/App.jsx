import {Route, Routes} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import {MainLayot} from './layouts/MainLayot';
import {Login} from './pages/Login';
import {Projects} from './pages/Projects';
import {OAuth} from "./pages/OAuth";
import {Project} from "./pages/Project";

export const App = () => {
    return (
        <Routes>
            {/*<Route path="/" element={<MainLayot/>}/>*/}
            <Route path="/" element={<Login/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="oauth/callback" element={<OAuth/>}/>
            <Route path="projects" element={<Projects/>}/>
            <Route path="projects/:id" element={<Project/>}/>
        </Routes>
    );
};
