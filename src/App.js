import { useEffect } from 'react';
import Table from './Table';
// const LOCAL_STORAGE_KEY = 'gincana_storage'
function App() {

  useEffect(() => {
    document.body.classList.add(
      'bg-gray-900'
    );

  }, []);

  const storedRows = JSON.parse(localStorage.getItem('teste'))

  return (
    <>
      <Table startRows={storedRows ? storedRows : []} />
    </>
  );
}

export default App;