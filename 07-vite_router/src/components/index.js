/*
export { default as Header } from './utils/Header';
export { default as Footer } from './utils/Footer';

export { default as Home } from './pages/Home';
export { default as About } from './pages/About';
export { default as Contact } from './pages/Contact';
*/

import Header from './marginals/Header';
import Footer from './marginals/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import User from './pages/User';
import Github from './pages/Github';

const marginals = { Header, Footer };
const pages = { Home, About, Contact, User, Github };

export { marginals, pages };