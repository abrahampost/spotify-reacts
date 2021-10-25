import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { Snackbar } from '@material-ui/core';


interface SnackBarProps {
    message: string;
    severity: 'error' | 'warning' | 'info' | 'success';
    dismissAfter?: number;
    children: React.ReactNode;
}

export const SnackBar: React.FC<SnackBarProps> = ({message, severity, dismissAfter, children}) => {
    const [ open, setOpen ] = useState(false);
    const handleClose = () => setOpen(false);
    
    useEffect(() => {
        if (message) {
            setOpen(true);
        }
    }, [ message ]);

    return (
        <Snackbar open={open} autoHideDuration={dismissAfter ? dismissAfter * 1000 : undefined} onClose={handleClose}>
            <div className={`alert ${severity}`}>{message}</div>
        </Snackbar>
    )
}