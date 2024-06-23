import { Box, Button, TextField } from '@mui/material';
import { CardBook } from '../../../../components/CardBook';
import BookModel from '../../../../models/BookModel';
import { useState } from 'react';
import UserModel from '../../../../models/UserModel';
import { CardUser } from '../../../../components/CardUser';

export const FormAddBorrow: React.FC<{ borrowResponseCreate?: any }> = (props) => {
    const [email, setEmail] = useState('');
    const [bookId, setBookId] = useState(0);
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
                <TextField id="outlined-basic" label="Tiền cọc" variant="outlined" />
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
    );
};
