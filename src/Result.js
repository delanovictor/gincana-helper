import React from 'react'

export default function Result({ rows }) {

    function getResult() {
        let result = ''

        rows.forEach(item => {
            if (!item.content) {
                result += '_ '
                return
            }

            let subject = item.content.replace(/\s/g, "");
            let index = item.number

            if (!subject || index === '' || index === 0) {
                result += '_ '
                return
            }

            //Circular
            if (!subject[index - 1]) {
                index = (index % subject.length)

                if (index === 0)
                    index = subject.length
            }

            result += `${subject[index - 1]} `
        })

        return result
    }

    return (
        <>
            <div className='text-center text-xl text-gray-200 border-gray-700 border'>{getResult()}</div>
        </>

    )
}
