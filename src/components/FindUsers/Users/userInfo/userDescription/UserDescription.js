import React from "react";

const UserDescription = ({isAuth, id, name, uniqueUrlName, status, followed}) => {

    const getText = (text, int) => {
        return text.length > int
            ? `${text.substr(0, int - 3)}...`
            : text;
    };

    return (
        <span>
            {isAuth && <div>{`id=${id}`}</div>}
            <div>{`name=${getText(name, 15)}`}</div>
            {isAuth && <div>{`uniqueUrlName=${uniqueUrlName}`}</div>}
            <div>{`status=${getText(name, 15)}`}</div>
            {isAuth && <div>{`followed=${followed}`}</div>}
        </span>
    )
};

export default UserDescription;