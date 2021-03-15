import React from 'react'

export default function Paginate({ onChange, pageNum, totalResults, resultsPerPage }) {

  function handlePageChange(value) {
    onChange(value)
  }

  // include pagination if there are multiple pages of results
  if (totalResults > resultsPerPage) {

    // create an array of pages that we can map over
    const pagesArray = []
    for (let i = 0; i < Math.ceil(totalResults / resultsPerPage); i++) {
      pagesArray.push(i + 1)
    }

    // map over the pages array to output the page number buttons
    return <div className='columns'>
      <div className='column'> Total results: {totalResults} </div>
      <div className='column has-text-right buttons'>

        {pagesArray.map((num, index) => {
          return <button index={index} onClick={() => handlePageChange(index + 1)} key={index} href='' className={pageNum === (index + 1) ? 'button is-primary is-small' : 'button is-small'}> {num} </button>
        })}
      </div>
    </div>

  } else {
    // if there is only one page, just show the number of results
    return <div>
      <p className='has-text-center'> Total results: {totalResults} </p>
    </div>
  }
}