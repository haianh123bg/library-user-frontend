import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import BorrowingFormModel from '../../../../models/BorrowingFormModel';
import BookModel from '../../../../models/BookModel';
import UserModel from '../../../../models/UserModel';
import { Box, TextField } from '@mui/material';
import { CardBook } from '../../../../components/CardBook';
import { CardUser } from '../../../../components/CardUser';

export const AlertDialogAddDialog: React.FC<{ handleClick?: any; children: any }> = (props) => {
    const [open, setOpen] = React.useState(false);
    const [borrowResponseCreate, setBorrorResponseCreate] = React.useState<BorrowingFormModel>();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreateBorrow = () => {
        const fetchBorrow = async () => {
            const baseUrl: string = `http://localhost:8000/borrows/create`;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: date,
                    dueDate: dateDue,
                    userAccountName: email,
                    userAccountPassword: 'haianh123',
                    moneyDeposit: moneyDeposit,
                    bookId: bookId,
                }),
            };
            const response = await fetch(baseUrl, options);
            if (!response.ok) {
                props.handleClick(0, 'Tạo phiếu thất bại');
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            const responseData = responseJson.result;
            const loadedBorrow: BorrowingFormModel = {
                id: responseData.borrowingFormId,
                book: {
                    id: responseData.book?.id,
                    name: responseData.book?.name,
                },
                user: {
                    user_account_name: responseData.user?.userAccountName,
                    user_name: responseData.user?.name,
                },
                date: responseData.borrowingFormDate,
                deposit: responseData.borrowingFormDeposit,
                due_date: responseData.borrowingFormDueDate,
                type: responseData.borrowingFormType,
            };
            setBorrorResponseCreate(loadedBorrow);
            props.handleClick(1, 'Tạo phiếu thành công');
            setEmail('');
            setBookId(0);
            setMoneyDeposit(0);
            setBook(undefined);
            setUser(undefined);
        };
        fetchBorrow().catch((error) => {
            console.log(error.message);
            props.handleClick(0, 'Tạo phiếu thất bại');
        });
    };

    const [email, setEmail] = useState('');
    const [bookId, setBookId] = useState(0);
    const [moneyDeposit, setMoneyDeposit] = useState(0);
    const [emailError, setEmailError] = useState('');
    const [bookIdError, setBookIdError] = useState('');

    const getDefaultDate = (day: number) => {
        const now = new Date();
        const futureDate = new Date(now.setDate(now.getDate() + day));
        const localDatetime = futureDate.toISOString().slice(0, 16);
        return localDatetime;
    };

    const [date, setDate] = useState<string>(getDefaultDate(0));
    const [dateDue, setDateDue] = useState<string>(getDefaultDate(30));

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const [book, setBook] = useState<BookModel>();
    const [isLoadingBook, setIsLoadingBook] = useState(false);
    const [errorIsLoadingBook, setErrorIsLoadingBook] = useState('');

    const findBook = (bookId: number) => {
        if (!bookId) {
            setBookIdError('Mã sách không được để trống');
            return;
        }
        setIsLoadingBook(true);
        setBookIdError('');
        const fetchBookById = async () => {
            const baseUrl: string = `http://localhost:8000/books/${bookId}`;

            const response = await fetch(baseUrl);
            if (!response.ok) {
                setIsLoadingBook(false);
                setErrorIsLoadingBook('Không có mã sách này');
                throw new Error('Something went wrong!');
            }
            const responseJson = await response.json();
            const responseData = responseJson.result;
            const loadedBook: BookModel = {
                id: responseData.id,
                name: responseData.name,
                inventory_number: responseData.inventoryNumber,
                category: {
                    id: responseData.category?.id,
                    name: responseData.category?.name,
                },
                price: responseData.price,
            };
            setBook(loadedBook);
            setIsLoadingBook(false);
        };
        fetchBookById().catch((error) => {
            console.log(error.message);
            setIsLoadingBook(false);
            setErrorIsLoadingBook('Không có mã sách này');
        });
    };

    const [user, setUser] = useState<UserModel>();
    const [isLoadingUser, setIsLoadingUser] = useState(false);
    const [errorIsLoadingUser, setErrorIsLoadingUser] = useState('');

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const findUser = (email: string) => {
        if (!validateEmail(email)) {
            setEmailError('Email không hợp lệ');
            return;
        }
        setIsLoadingUser(true);
        setEmailError('');
        const fetchUser = async () => {
            const baseUrl: string = `http://localhost:8000/user?email=${email}`;
            const response = await fetch(baseUrl);

            if (!response.ok) {
                setIsLoadingUser(false);
                setErrorIsLoadingUser('Không có tài khoản này');
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            const responseData = responseJson.result;
            const loadedUser: UserModel = {
                user_account_name: responseData.userAccountName,
                user_name: responseData.username,
                user_phone_number: responseData.userPhoneNumber ?? '',
            };
            setUser(loadedUser);
            setIsLoadingUser(false);
        };
        fetchUser().catch((error) => {
            console.log(error.message);
            setIsLoadingUser(false);
            setErrorIsLoadingUser('Không có tài khoản này');
        });
    };
    return (
        <React.Fragment>
            <Button onClick={handleClickOpen} variant="contained" color="success">
                {props.children}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="lg"
                fullWidth
                sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: '80%' } }}
            >
                <DialogTitle id="alert-dialog-title">{'Nhập thông tin phiếu mượn?'}</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { width: '50ch' },
                            display: 'flex',
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Box
                            sx={{
                                '& > :not(style)': { m: 1, width: '40ch' },
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                }}
                            >
                                <TextField
                                    id="outlined-basic"
                                    label="Email người mượn"
                                    variant="outlined"
                                    sx={{
                                        '& fieldset': {
                                            borderTopRightRadius: 0,
                                            borderBottomRightRadius: 0,
                                        },
                                    }}
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setUser(undefined);
                                        setErrorIsLoadingUser('');
                                    }}
                                    error={!!emailError}
                                    helperText={emailError}
                                />
                                <Button
                                    variant="contained"
                                    sx={{
                                        maxWidth: '50px',
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0,
                                    }}
                                    onClick={() => findUser(email)}
                                >
                                    Check
                                </Button>
                            </Box>
                            <label htmlFor="date" style={{ fontSize: '120%' }}>
                                Ngày mượn<span style={{ color: 'red' }}>*</span>
                            </label>
                            <TextField
                                id="date"
                                variant="outlined"
                                type="datetime-local"
                                value={date}
                                onChange={handleDateChange}
                            />

                            <label htmlFor="date_due" style={{ fontSize: '120%' }}>
                                Ngày hẹn trả<span style={{ color: 'red' }}>*</span>
                            </label>
                            <TextField
                                id="date_due"
                                variant="outlined"
                                type="datetime-local"
                                value={dateDue}
                                onChange={handleDateChange}
                            />
                        </Box>
                        <Box
                            sx={{
                                '& > :not(style)': { m: 1, width: '40ch' },
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                }}
                            >
                                <TextField
                                    id="outlined-basic"
                                    label="Mã sách"
                                    type="number"
                                    variant="outlined"
                                    sx={{
                                        '& fieldset': {
                                            borderTopRightRadius: 0,
                                            borderBottomRightRadius: 0,
                                        },
                                    }}
                                    value={bookId}
                                    onChange={(e) => {
                                        setBookId(Number(e.target.value));
                                        setBook(undefined);
                                        setErrorIsLoadingBook('');
                                    }}
                                    error={!!bookIdError}
                                    helperText={bookIdError}
                                />
                                <Button
                                    variant="contained"
                                    sx={{
                                        maxWidth: '50px',
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0,
                                    }}
                                    onClick={() => findBook(bookId)}
                                >
                                    Check
                                </Button>
                            </Box>
                            <TextField
                                id="outlined-basic"
                                label="Tiền cọc"
                                variant="filled"
                                type="number"
                                onChange={(e) => setMoneyDeposit(Number(e.target.value))}
                            />
                        </Box>
                        <Box
                            sx={{
                                '& > :not(style)': { m: 1, width: '40ch' },
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {book && <CardBook book={book} />}
                            {!book && errorIsLoadingBook && <h4>{errorIsLoadingBook}</h4>}

                            {user && <CardUser user={user} />}
                            {!user && errorIsLoadingUser && <h4>{errorIsLoadingUser}</h4>}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button
                        onClick={() => {
                            handleClose();
                            handleCreateBorrow();
                        }}
                        autoFocus
                    >
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
