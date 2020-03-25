import React from "react";

const UserDescription = ({id, name, uniqueUrlName, status, followed}) => {
    return (
        <span>
            <div>{`id=${id}`}</div>
            <div>{`name=${name}`}</div>
            <div>{`uniqueUrlName=${uniqueUrlName}`}</div>
            <div>{`status=${status}`}</div>
            <div>{`followed=${followed}`}</div>
        </span>
    )
};

export default UserDescription;