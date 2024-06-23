import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CategoryModel from '../../../../models/CategoryModel';
import BookIcon from '@mui/icons-material/Book';
import CategoryIcon from '@mui/icons-material/Category';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import BorrowingFormModel from '../../../../models/BorrowingFormModel';
import BookChart from './BookChart';

export const StatisticalAdmin = () => {
    const [bookCount, setBookCount] = useState(0);
    const [categories, setCategories] = useState<CategoryModel[]>();
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [usersCount, setUsersCount] = useState(0);

    const [borrows, setBorrows] = useState<BorrowingFormModel[]>([]);
    const [isLoadingBorrows, setIsLoadingBorrows] = useState(true);

    useEffect(() => {
        const fetchBookCount = async () => {
            const baseUrl: string = `http://localhost:8000/books/count`;

            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseJson = await response.json();
            const responseData = responseJson.result;
            setBookCount(responseData);
        };
        fetchBookCount().catch((error) => {
            console.log(error.message);
        });

        const fetchCategories = async () => {
            const baseUrl: string = `http://localhost:8000/categories`;
            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            const responseData = responseJson.result;
            const loadedCategories: CategoryModel[] = [];
            for (const key in responseData) {
                loadedCategories.push({
                    id: responseData[key].id,
                    name: responseData[key].name,
                    total_book: responseData[key].totalBooks,
                });
            }

            setCategories(loadedCategories);
            setIsLoadingCategories(false);
        };
        fetchCategories().catch((error) => {
            console.log(error.message);
            setIsLoadingCategories(false);
        });

        const fetchUsers = async () => {
            const baseUrl: string = `http://localhost:8000/user/count`;
            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseJson = await response.json();
            const responseData = responseJson.result;
            setUsersCount(responseData);
        };
        fetchUsers().catch((error) => {
            console.log(error.message);
        });

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

    return (
        <Box>
            <Box sx={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Card
                    sx={{
                        width: 'calc(20% - 16px)',
                        backgroundColor: '#f44336',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 2,
                    }}
                >
                    <Avatar sx={{ bgcolor: 'white', color: '#f44336', marginRight: 2 }}>
                        <BookIcon />
                    </Avatar>
                    <CardContent>
                        <Typography variant="h6">Số sách trong thư viện</Typography>
                        <Typography variant="h4">{bookCount}</Typography>
                    </CardContent>
                </Card>
                <Card
                    sx={{
                        width: 'calc(20% - 16px)',
                        backgroundColor: '#3f51b5',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 2,
                    }}
                >
                    <Avatar sx={{ bgcolor: 'white', color: '#3f51b5', marginRight: 2 }}>
                        <CategoryIcon />
                    </Avatar>
                    <CardContent>
                        <Typography variant="h6">Tổng số danh mục</Typography>
                        <Typography variant="h4">{categories?.length}</Typography>
                    </CardContent>
                </Card>
                <Card
                    sx={{
                        width: 'calc(20% - 16px)',
                        backgroundColor: '#4caf50',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 2,
                    }}
                >
                    <Avatar sx={{ bgcolor: 'white', color: '#4caf50', marginRight: 2 }}>
                        <FormatListNumberedIcon />
                    </Avatar>
                    <CardContent>
                        <Typography variant="h6">Tổng số tài khoản</Typography>
                        <Typography variant="h4">{usersCount}</Typography>
                    </CardContent>
                </Card>
                <Card
                    sx={{
                        width: 'calc(20% - 16px)',
                        backgroundColor: '#ff9800',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 2,
                    }}
                >
                    <Avatar sx={{ bgcolor: 'white', color: '#ff9800', marginRight: 2 }}>
                        <FormatListNumberedIcon />
                    </Avatar>
                    <CardContent>
                        <Typography variant="h6">Số lượng sách đang cho mượn</Typography>
                        <Typography variant="h4">{borrows.length}</Typography>
                    </CardContent>
                </Card>
            </Box>
            <Box sx={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
                <Card sx={{ width: '46%' }}>
                    <CardContent>
                        <Typography variant="h6">Bảng thống kế số lượng mỗi loại sách</Typography>
                        <BookChart />
                    </CardContent>
                </Card>
                <Card sx={{ width: '46%' }}>
                    <CardContent>
                        <Typography variant="h6">Số lượng sách đang cho mượn</Typography>
                        <BookChart />
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};
