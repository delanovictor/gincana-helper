import { useEffect, useState } from 'react';
import Table from './Table';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'gincana_storage'

function App() {

  useEffect(() => {
    document.body.classList.add(
      'bg-gray-900'
    );

  }, []);
  const storedTables = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

  const [tables, setTables] = useState(storedTables)

  //Save
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tables))
    // setTables()
  }, [tables])

  const addTable = () => {
    setTables([
      ...tables,
      {
        id: uuidv4(),
        rows: [],
        name: 'teste x'
      }
    ])
  }
  return (
    <>
      {tables.map(table => {
        return (
          <Table key={table.id} table={table} />
        )
      })}
      <div className='absolute top-1 right-1 text-gray-200'>
        <button onClick={addTable}>add</button>
      </div>
    </>
  );
}

export default App;