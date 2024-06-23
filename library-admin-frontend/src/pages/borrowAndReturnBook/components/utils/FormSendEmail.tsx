import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Textarea from '@mui/joy/Textarea';
import { PersonInput } from './PersonInput';

interface Email {
    label: string;
}

export const FormSendEmail = () => {
    const [person, setPerson] = useState('');
    const [emails, setEmails] = useState<Email[]>([]);

    const [selectedEmails, setSelectedEmails] = useState<any>(emails.slice(0, 1));

    const handleEmailChange = (event: any, newValue: any) => {
        setSelectedEmails(newValue);
    };

    const sendEmail = () => {
        const fetchSendEmail = async () => {
            const baseUrl: string = `http://localhost:8000/`;
        };
    };

    useEffect(() => {
        const fetchAllEmail = async () => {
            const baseUrl: string = `http://localhost:8000/user/allemail`;
            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseJson = await response.json();
            const responseData = responseJson.result;
            const loadedEmails: Email[] = [];
            for (const key in responseData) {
                loadedEmails.push({
                    label: responseData[key],
                });
            }
            setEmails(loadedEmails);
        };
        fetchAllEmail().catch((error) => {
            console.log(error.message);
        });
    }, []);
    return (
        <Box
            sx={{
                height: 500,
                width: '48%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <Box sx={{ display: 'flex', gap: '16px', marginBottom: '10px' }}>
                <Typography variant="h5" sx={{ margin: '0' }}>
                    Gửi Email
                </Typography>
            </Box>
            <Box>
                <Card>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Typography sx={{ width: '100px' }}>Người nhận</Typography>
                            <PersonInput
                                handleEmailChange={handleEmailChange}
                                selectedEmails={selectedEmails}
                                emails={emails}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem  ' }}>
                            <Typography sx={{ width: '100px' }}>Tiêu đề</Typography>
                            <TextField id="filled-basic" label="Tiêu đề" variant="filled" style={{ width: '100%' }} />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                justifyContent: 'left',
                                marginTop: '1rem',
                            }}
                        >
                            <Typography sx={{ width: '100px' }}>Nội dung</Typography>
                            <Textarea placeholder="Type in here…" minRows={5} maxRows={8} style={{ width: '100%' }} />
                        </Box>
                        <Box sx={{ width: '100%', alignItems: 'center', marginTop: '1rem' }}>
                            <Box>
                                <Button variant="contained">Gửi Email</Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};
