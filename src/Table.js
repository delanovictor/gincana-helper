import { useEffect, useState } from 'react';
import Row from './Row';
import Result from './Result';
import { v4 as uuidv4 } from 'uuid';

export default function Table({ startRows = [] }) {

    const [rows, setRows] = useState(startRows)

    const addEmptyRow = (e) => {
        setRows(prevRows => {
            return [...prevRows, { id: uuidv4(), text: '', number: 1 }]
        })
    }

    const updateRow = (updatedRow) => {
        console.log('updateRow')
        console.log(updatedRow)
        const newRows = [...rows]

        const index = newRows.findIndex(row => row.id === updatedRow.id);

        newRows[index] = updatedRow

        setRows(newRows)
    }

    //Save
    useEffect(() => {
        console.log('save!')
        console.log(rows)
        localStorage.setItem('teste', JSON.stringify(rows))
    }, [rows])

    const clearTable = () => {
        setRows([])
    }

    const handlePaste = (e) => {

        if (e.target.name === 'content') {

            e.preventDefault()

            const content = e.clipboardData.getData('Text').split(/\r?\n|\r|\n/g);
            const targetRowIndex = rows.findIndex(item => item.id === e.target.parentElement.id)

            const isLastOffset = targetRowIndex === rows.length - 1 ? 1 : 0

            const newRows = content.map(item => {
                return {
                    text: item,
                    number: 1,
                    id: uuidv4()
                }
            })

            setRows(prevRows => {
                return [...prevRows.slice(0, targetRowIndex + isLastOffset), ...newRows, ...prevRows.slice(newRows.length + targetRowIndex)]
            })
        }
    }

    const setNumber = (e) => {
        console.log(e.target.value)
        const newRows = [...rows].map(item => {
            return {
                ...item,
                number: e.target.value
            }
        })

        setRows(newRows)
    }
    return (

        <div className='bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 inline-grid grid-cols-12 w-2/5 m-2 '>
            <div className='col-span-12 self-center w-full text-center pb-3 text-gray-200 text-xl '>
                Nome
            </div>
            < div className='col-span-8' onPaste={handlePaste} >
                {
                    rows.map((row, index) => {
                        return (
                            <Row key={row.id} row={row} update={updateRow} isLast={index === rows.length - 1} onEnter={addEmptyRow} />
                        )
                    })
                }
            </div >

            <div className='col-span-3 col-start-10'>
                <div className='mt-1'>
                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={addEmptyRow}>Add row</button>
                </div>

                <div className='mt-1'>
                    <label htmlFor="set-all-numbers"></label>
                    <input
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-200 bg-gray-700 border-gray-900 leading-tight focus:outline-none focus:shadow-outline w-full"
                        type="number"
                        name="set-all-numbers"
                        placeholder='Num'
                        onChange={setNumber}
                    />
                </div>

                <div className='mt-1'>
                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={clearTable}>Clear</button>
                </div>


            </div>

            <div className='col-span-12 self-center w-full text-center pt-3 text-gray-200 text-xl '>
                < Result rows={rows} />
            </div>

        </div >



    )
}
