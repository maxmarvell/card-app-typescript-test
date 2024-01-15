import React, { useContext } from "react";
import NavBar from './components/NavBar'
import AllEntries from './routes/AllEntries'
import NewEntry from './routes/NewEntry'
import EditEntry from './routes/EditEntry'
import { EntryProvider, SettingContext } from './utilities/globalContext'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default function App() {
  const darkMode = useContext(SettingContext)
  return (
    <section className={darkMode?.state ? "bg-slate-800 h-screen" : "h-screen"}>
      <Router>
        <EntryProvider>
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<AllEntries />}>
            </Route>
            <Route path="create" element={<NewEntry />}>
            </Route>
            <Route path="edit/:id" element={<EditEntry />}>
            </Route>
          </Routes>
        </EntryProvider>
      </Router>
    </section>
  );
}
