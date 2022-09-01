import React from 'react'

const Pagination = ({ twigletsPerPage, totalTwiglets, paginate, inc, dec, currentPage }) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalTwiglets/ twigletsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="paginate" >
            <ul className="d-flex flex-row-reverse justify-content-around align-items-center p-0 text-white list-unstyled mb-0">
                {/* {pageNumbers.map(number => (
                    <li key={number} >
                        <a href="#" onClick={() => paginate(number)} className="class-link">
                            {number}
                        </a>
                    </li>
                ))} */}
                <li>
                    <a href="#" onClick={() => inc()} className="class-link">
                        <i class="fa-solid fa-caret-right"></i>
                    </a>
                </li>
                <li>{currentPage}</li>
                <li>
                    <a href="#" onClick={() => dec()} className="class-link">
                        <i class="fa-solid fa-caret-left"></i>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Pagination;