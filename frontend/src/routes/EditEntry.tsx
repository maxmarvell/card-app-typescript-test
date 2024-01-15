import {useState, useContext, ChangeEvent, MouseEvent, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {EntryContext, SettingContext} from '../utilities/globalContext'
import {Entry, EntryContextType} from '../@types/context'

export default function EditEntry(){
    const {id} = useParams()
    const emptyEntry: Entry = {title: "", description: "", created_at: new Date().toISOString().split('T')[0], scheduled_for: new Date().toISOString().split('T')[0]}

    const { updateEntry, entries } = useContext(EntryContext) as EntryContextType
    const [newEntry,setNewEntry] = useState<Entry>(emptyEntry)

    useEffect(() =>{
        const entry = entries.filter(entry=> entry.id == id)[0]
        setNewEntry(entry)
    },[])
    const handleInputChange = (event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setNewEntry({
            ...newEntry,
            [event.target.name] : event.target.value
        })
    }
    const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
        updateEntry(id as string,newEntry)
    }

    const darkMode = useContext(SettingContext)

    return(
        <section className={`flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 bg-gray-300 p-8 rounded-md ${darkMode?.state && "bg-slate-700 text-white"}`}>
            <input className={`p-3 rounded-md ${darkMode?.state && "bg-slate-500 text-white"}`} type="text" placeholder="Title" name="title" value={newEntry.title} onChange={handleInputChange}/>
            <textarea className={`p-3 rounded-md ${darkMode?.state && "bg-slate-500 text-white"}`} placeholder="Description" name="description" value={newEntry.description} onChange={handleInputChange}/>
            <label htmlFor="created_at">
                Created On:
                <br/>
                <input className={`p-3 rounded-md ${darkMode?.state && "bg-slate-500 text-white"}`} type="date" name="created_at" id="created_at" value={(new Date(newEntry.created_at)).toISOString().split('T')[0]} onChange={handleInputChange}/>
            </label>
            <label htmlFor="scheduled_for">
                Scheduled For:
                <br/>
                <input className={`p-3 rounded-md ${darkMode?.state && "bg-slate-500 text-white"}`} type="date" name="scheduled_for" id="scheduled_for" value={(new Date(newEntry.scheduled_for)).toISOString().split('T')[0]} onChange={handleInputChange}/>
            </label>
            <button onClick={(e) => {handleSend(e)}} className="bg-blue-400 hover:bg-blue-600 font-semibold text-white p-3 rounded-md">Update</button>
        </section>
    )
}