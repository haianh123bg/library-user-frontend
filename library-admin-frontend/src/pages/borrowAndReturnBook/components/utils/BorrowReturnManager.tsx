import React, { useEffect, useState } from 'react';
import { BorrowTable } from './BorrowTable';
import { Box, Button, CircularProgress, IconButton, Snackbar } from '@mui/material';
import { ReturnTable } from './ReturnTable';
import BorrowingFormModel from '../../../../models/BorrowingFormModel';
import { GridCloseIcon } from '@mui/x-data-grid';
import ReturnSlipModel from '../../../../models/ReturnSlipModel';
import { BorrowOutOfDateTable } from './BorrowOutOfDateTable';
import { FormSendEmail } from './FormSendEmail';

export const BorrowReturnManager = () => {
    const [borrows, setBorrows] = React.useState<BorrowingFormModel[]>([]);
    const [isLoadingBorrows, setIsLoadingBorrows] = React.useState(true);
    const [errorBorrows, setErrorBorrows] = React.useState(null);

    const [returnBooks, setReturnBooks] = React.useState<ReturnSlipModel[]>([]);
    const [isLoadingReturnBooks, setIsLoadingReturnBooks] = React.useState(true);
    const [errorReturnBooks, setErrorReturnBooks] = React.useState(null);

    React.useEffect(() => {
        const fetchBorrows = async () => {
            const baseUrl: string = `http://localhost:8000/borrows`;

            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            const responseData = responseJson.result;

            const loadedBorrows: BorrowingFormModel[] = [];
            for (const key in responseData) {
                loadedBorrows.push({
                    id: responseData[key].borrowingFormId,
                    date: responseData[key].borrowingFormDate,
                    type: responseData[key].borrowingFormType,
                    deposit: responseData[key].borrowingFormDeposit,
                    due_date: responseData[key].borrowingFormDueDate,
                    user: {
                        user_name: responseData[key].user?.userName,
                        user_account_name: responseData[key].user?.userAccountName,
                    },
                    book: {
                        id: responseData[key].book?.id,
                        name: responseData[key].book?.name,
                    },
                });
            }

            setBorrows(loadedBorrows);
            console.log(loadedBorrows);

            setIsLoadingBorrows(false);
        };
        fetchBorrows().catch((error) => {
            console.log(error);
            setIsLoadingBorrows(false);
        });
    }, []);

    React.useEffect(() => {
        const fetchReturnBooks = async () => {
            const baseURL: string = `http://localhost:8000/returnBook`;

            const response = await fetch(baseURL);
            if (!response.ok) {
                setIsLoadingReturnBooks(false);
                throw new Error('Something went wrong!');
            }
            const responseJson = await response.json();

            const responseData = responseJson.result;
            const loadedReturnBooks: ReturnSlipModel[] = [];
            for (const key in responseData) {
                loadedReturnBooks.push({
                    book: {
                        id: responseData[key].book?.id,
                        name: responseData[key].book?.name,
                    },
                    borrow_date: responseData[key].borrowDate,
                    return_slip_id: responseData[key].returnSlipId,
                    return_slip_date: responseData[key].returnSlipDate,
                    user: {
                        user_account_name: responseData[key].user?.userAccountName,
                    },
                });
            }
            setReturnBooks(loadedReturnBooks);
            setIsLoadingReturnBooks(false);
        };
        fetchReturnBooks().catch((error) => {
            console.log(error.message);
            setIsLoadingReturnBooks(false);
        });
    }, []);
    //
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState({ id: 0, name: '' });

    const handleClick = (id: number, name: string) => {
        setMessage({ id, name });
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose} sx={{ color: 'white' }}>
                UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <GridCloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const [borrowsOutOfDate, setBorrowsOutOfDate] = useState<BorrowingFormModel[]>([]);
    const [isLoadingBorrowsOutOfDate, setIsLoadingBorrowsOutOfDate] = React.useState(true);
    const [httpErrorBorrowsOutOfDate, setHttpErrorBorrowsOutOfDate] = useState(null);

    useEffect(() => {
        const fetchBorrowsOutOfDate = async () => {
            const baseUrl: string = `http://localhost:8000/borrows/outofdate`;
            const response = await fetch(baseUrl);

            if (!response.ok) {
                setIsLoadingBorrowsOutOfDate(false);
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            const responseData = responseJson.result;

            const loadedBorrowsOutOfDate: BorrowingFormModel[] = [];
            for (const key in responseData) {
                loadedBorrowsOutOfDate.push({
                    id: responseData[key].borrowingFormId,
                    date: responseData[key].borrowingFormDate,
                    type: responseData[key].borrowingFormType,
                    deposit: responseData[key].borrowingFormDeposit,
                    due_date: responseData[key].borrowingFormDueDate,
                    user: {
                        user_name: responseData[key].user?.userName,
                        user_account_name: responseData[key].user?.userAccountName,
                    },
                    book: {
                        id: responseData[key].book?.id,
                        name: responseData[key].book?.name,
                    },
                });
            }
            setBorrowsOutOfDate(loadedBorrowsOutOfDate);
            setIsLoadingBorrowsOutOfDate(false);
        };
        fetchBorrowsOutOfDate().catch((error) => {
            console.log(error);
            setIsLoadingBorrowsOutOfDate(false);
        });
    }, []);
    return (
        <Box>
            <Box sx={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                {isLoadingBorrows ? (
                    <Box sx={{ width: '48%' }}>
                        <CircularProgress disableShrink />
                    </Box>
                ) : (
                    <BorrowTable handleClick={handleClick} borrows={borrows} />
                )}
                {isLoadingReturnBooks ? (
                    <Box sx={{ width: '48%' }}>
                        <CircularProgress disableShrink />
                    </Box>
                ) : (
                    <ReturnTable returnBooks={returnBooks} />
                )}
            </Box>
            <Box sx={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '4rem' }}>
                {isLoadingBorrowsOutOfDate ? (
                    <Box sx={{ width: '48%' }}>
                        <CircularProgress disableShrink />
                    </Box>
                ) : (
                    <BorrowOutOfDateTable handleClick={handleClick} borrows={borrowsOutOfDate} />
                )}
                <FormSendEmail />
            </Box>

            {/**
             *
             */}
            <div>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={message.name}
                    action={action}
                    ContentProps={{
                        style: {
                            backgroundColor: message.id == 1 ? 'green' : 'red',
                            color: 'white',
                        },
                    }}
                />
            </div>
        </Box>
    );
};
