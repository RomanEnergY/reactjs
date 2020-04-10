import styles from "./PaginationItems.module.css";
import React, {useState} from "react";
import cn from "classnames";

const PaginationItems = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    let [portionNumber, setPortionNumber] = useState(currentPage % portionSize === 0
        ? currentPage / portionSize
        : Math.floor(currentPage / portionSize) + 1
    );

    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount / portionSize);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 0.9;
    let rightPortionPageNumber = portionNumber * portionSize;

    const clickPortionNumber = (iterator) => {
        setPortionNumber(portionNumber + iterator)
    };

    return <div className={styles.paginator}>
        {portionNumber > 1 && <button onClick={() => clickPortionNumber(-1)}>PREV</button>}

        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
                return <span className={cn({[styles.selectedPage]: currentPage === p}, styles.pageNumber)}
                             key={p} onClick={(e) => {
                    onPageChanged(p);
                }}>{p}</span>
            })}

        {portionCount > portionNumber && <button onClick={() => clickPortionNumber(1)}>NEXT</button>}
    </div>
};

export default PaginationItems;