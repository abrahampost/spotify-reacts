import React from "react";
import './Loader.scss';

interface LoaderProps {
    text?: string;
}

export const Loader: React.FC<LoaderProps> = ({ text }) => {
    return (
        <div className="loader">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            {text ? text : 'Loading...'}
        </div>
    )
}