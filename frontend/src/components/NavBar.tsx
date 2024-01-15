import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { SettingContext } from '../utilities/globalContext'
import sunIcon from '../icons/Sun.svg'
import moonIcon from '../icons/Moon_alt.svg'

export default function NavBar() {

  const darkMode = useContext(SettingContext);

  return (
    <nav className={`flex justify-center gap-5 ${darkMode?.state && "bg-slate-800"}`}>
      <NavLink className={`m-3 p-4 text-xl ${darkMode?.state
        ? " bg-slate-600 hover:ring-blue-500 hover:ring-2 rounded-md font-medium text-white"
        : " bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white"}`} to={'/'}>All Entries</NavLink>
      <NavLink className={`m-3 p-4 text-xl ${darkMode?.state
        ? " bg-slate-600 hover:ring-blue-500 hover:ring-2 rounded-md font-medium text-white"
        : " bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white"}`} to={'/create'}>New Entry</NavLink>
      <div className='flex flex-col'>
        <button className={`my-auto rounded-full border-2 p-1 ${!darkMode?.state && "bg-indigo-300"}`}
          onClick={(e) => darkMode?.handler(false)}>
          <img src={sunIcon} alt="light-mode" />
        </button>
      </div>
      <div className='flex flex-col'>
        <button className={`my-auto rounded-full border-2 p-1 ${darkMode?.state && "bg-indigo-600"}`}
          onClick={(e) => darkMode?.handler(true)}>
          <img src={moonIcon} alt="dark-mode" />
        </button>
      </div>
    </nav>
  )
}