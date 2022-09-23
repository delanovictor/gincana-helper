import React from 'react'



export default function Row({ row, update, isLast, onEnter }) {

    function handleChange(e) {


        console.log(e.target.name)
        if (e.target.name === 'number') {
            let valid = true
            console.log(valid)

            console.log(valid)

            valid &= e.target.value >= 0
            console.log(valid)
            if (!valid) {
                e.target.value = 0
            }
        }



        console.log('handleChange')
        console.log(e.target.value)

        update({
            ...row,
            [e.target.name]: e.target.value
        })

    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault()

            onEnter()
        }
    }

    return (
        <div >
            <form id={row.id} className="py-1 grid-cols-12 inline-grid" >
                <input className="shadow appearance-none border rounded col-span-9 py-2 px-3 text-gray-200 bg-gray-700 border-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    onChange={handleChange}
                    defaultValue={row.content}
                    name="content"
                    id={`${row.id}-content`}
                    onKeyDown={handleKeyDown} />


                {/* <input type="color" onChange={handleChange} defaultValue={row.color} name="color" id={`${row.id}-color`} /> */}
                <input
                    className="shadow appearance-none border rounded col-span-3 py-2 px-3 text-gray-200 bg-gray-700 border-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    onChange={handleChange}
                    defaultValue={row.number}
                    name="number"
                    id={`${row.id}-number`}
                    onKeyDown={handleKeyDown} />

            </form>
        </div >


    )
}
