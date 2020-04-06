import s from "./Pagination.module.css";
import React from "react";

const Pagination = ({totalUserCount, pageSize, currentPage, onPageChanged}) => {
    let pagination = [];

    for (let i = 1; i <= Math.ceil(totalUserCount / pageSize); i++)
        pagination.push(<button key={i}
                           className={currentPage === i ? s.selectedPage : ''}
                           onClick={(e) => onPageChanged(i)}>{i}</button>);
    return (
        <div>
            {pagination}
        </div>
    );
};

export default Pagination;