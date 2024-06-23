import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import UserModel from '../models/UserModel';

export const CardUser: React.FC<{ user: UserModel }> = (props) => {
    const { user } = props;

    return (
        <Card sx={{ maxWidth: 345, backgroundColor: props.user ? '' : 'red' }}>
            <CardActionArea>
                {/**
                 *  <CardMedia component="img" height="140" image={''} alt={'User image'} />
                 */}
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <p style={{ fontWeight: 'bold' }}> Tên người dùng: {user?.user_name}</p>
                        <p>SĐT: {user?.user_phone_number}</p>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
