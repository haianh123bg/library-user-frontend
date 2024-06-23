import { Box, Button, Card, CardContent, CardMedia, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import AuthorModel from '../../../../models/AuthorModel';

export const AuthorFormAdd: React.FC<{
    author?: AuthorModel;
    handleClick?: any;
    handleTrigger?: any;
}> = (props) => {
    const [base64, setBase64] = useState(props.author ? props.author?.image : '');
    console.log(base64);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [name, setName] = useState(props.author ? props.author?.name : '');
    const [dateOfBirth, setDateOfBirth] = useState(props.author ? props.author?.date_of_birth : '');
    const [description, setDescription] = useState(props.author ? props.author?.description : '');

    const [errors, setErrors] = useState({
        name: '',
        dateOfBirth: '',
        description: '',
        selectedFile: '',
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const validate = () => {
        const newErrors = {
            name: '',
            dateOfBirth: '',
            description: '',
            selectedFile: '',
        };

        if (!name) newErrors.name = 'Tên tác giả là bắt buộc';
        if (!dateOfBirth) newErrors.dateOfBirth = 'Ngày sinh là bắt buộc';
        if (!description) newErrors.description = 'Mô tả là bắt buộc';
        if (!selectedFile) newErrors.selectedFile = 'Hình ảnh là bắt buộc';

        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === '');
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (validate()) {
            const fetchAddAuthor = async () => {
                const baseUrl: string = props.author
                    ? `http://localhost:8000/authors/${props.author.id}`
                    : `http://localhost:8000/authors`;

                const options = {
                    method: props.author ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name,
                        description: description,
                        image: base64,
                        dateOfBirth: dateOfBirth,
                    }),
                };
                const response = await fetch(baseUrl, options);
                if (!response.ok) {
                    console.log('Something went wrong!');
                    props.handleClick(0, 'Thêm tác giả không thành công');
                }

                props.handleClick(1, 'Thêm tác giả thành công');
                props.handleTrigger();
                setName('');
                setDateOfBirth('');
                setDescription('');
                setSelectedFile(null);
            };
            fetchAddAuthor().catch((error) => {
                console.log(error.message);
                props.handleClick(0, 'Thêm tác giả không thành công');
            });
        }
    };

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '100ch' },
                display: 'flex',
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Box
                sx={{
                    '& > :not(style)': { m: 1, width: '50ch' },
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <TextField
                    id="outlined-basic"
                    label="Tên tác giả"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <label htmlFor="dateofbirst" style={{ fontSize: '120%' }}>
                    Ngày sinh
                </label>
                <TextField
                    id="dateofbirst"
                    variant="outlined"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    error={!!errors.dateOfBirth}
                    helperText={errors.dateOfBirth}
                />
                <TextField
                    id="description"
                    label="Mô tả"
                    multiline
                    rows={8}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    error={!!errors.description}
                    helperText={errors.description}
                />
                <Button type="reset" variant="contained" color="warning" onClick={() => setSelectedFile(null)}>
                    Reset
                </Button>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </Box>
            <Box
                sx={{
                    '& > :not(style)': { m: 1, width: '50ch' },
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <label htmlFor="imageUpload" style={{ fontSize: 'larger' }}>
                    Chọn hình ảnh:
                </label>
                <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ fontSize: 'larger' }}
                />
                {errors.selectedFile && (
                    <Typography variant="body2" color="error">
                        {errors.selectedFile}
                    </Typography>
                )}
                {(selectedFile || base64) && (
                    <Card sx={{ maxWidth: 500 }}>
                        <img
                            src={selectedFile ? URL.createObjectURL(selectedFile) : base64}
                            alt="Selected File"
                            style={{ height: 200, width: '100%', objectFit: 'cover' }}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Selected file: {selectedFile ? selectedFile.name : 'Existing image'}
                            </Typography>
                        </CardContent>
                    </Card>
                )}
            </Box>
        </Box>
    );
};
