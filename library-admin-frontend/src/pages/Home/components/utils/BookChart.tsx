import React, { useState } from 'react';
import { Box, Typography, Slider, FormControlLabel, Checkbox } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import BookModel from '../../../../models/BookModel';

interface BookData {
    name: string;
    count: number;
}

const BookChart: React.FC<{ books: BookModel[] }> = (props) => {
    const series: BookData[] = props.books.map((book) => ({
        name: book.name,
        count: book.inventory_number ?? 0,
    }));

    const [itemNb, setItemNb] = useState(5);
    const [skipAnimation, setSkipAnimation] = useState(false);

    const handleItemNbChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue !== 'number') {
            return;
        }
        setItemNb(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={series.slice(0, itemNb)} barSize={30}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" animationDuration={skipAnimation ? 0 : 1500} />
                </BarChart>
            </ResponsiveContainer>
            <FormControlLabel
                checked={skipAnimation}
                control={<Checkbox onChange={(event) => setSkipAnimation(event.target.checked)} />}
                label="skipAnimation"
                labelPlacement="end"
            />
            <Typography id="input-item-number" gutterBottom>
                Number of items
            </Typography>
            <Slider
                value={itemNb}
                onChange={handleItemNbChange}
                valueLabelDisplay="auto"
                min={1}
                max={20}
                aria-labelledby="input-item-number"
            />
        </Box>
    );
};

export default BookChart;
