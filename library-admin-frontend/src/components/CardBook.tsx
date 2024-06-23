import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import BookModel from '../models/BookModel';

export const CardBook: React.FC<{ book: BookModel }> = (props) => {
    const { book } = props;

    // Kiểm tra nếu images không tồn tại hoặc rỗng
    const imageSrc =
        book?.images && book.images.length > 0 && book.images[0]?.data
            ? book.images[0].data.startsWith('data:image')
                ? book.images[0].data
                : `data:image/jpeg;base64,${book.images[0].data}`
            : ''; // Nếu không có hình ảnh, sử dụng một chuỗi rỗng hoặc hình ảnh mặc định

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                {imageSrc && (
                    <CardMedia component="img" height="140" image={imageSrc} alt={book?.name || 'Book image'} />
                )}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {book?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <p>Danh mục: {book?.category?.name}</p>
                        <span>
                            Số sách còn trong kho{' '}
                            <span
                                style={{
                                    color: book?.inventory_number === 0 ? 'red' : 'green',
                                }}
                            >
                                {book?.inventory_number}
                            </span>
                        </span>
                        <p>
                            Giá tiền: <span style={{ color: 'red' }}>{props.book.price}</span>
                        </p>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
