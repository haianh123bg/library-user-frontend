import React, { useState } from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import Stack from '@mui/joy/Stack';
import PersonIcon from '@mui/icons-material/Person';

export const PersonInput: React.FC<{ emails: any; selectedEmails: any; handleEmailChange: any }> = (props) => {
    return (
        <Stack spacing={2} sx={{ marginLeft: '-13px' }}>
            <Autocomplete
                multiple
                startDecorator={<PersonIcon />}
                placeholder="Chọn người nhận"
                options={props.emails}
                defaultValue={props.emails.slice(0, 1)}
                onChange={props.handleEmailChange}
                value={props.selectedEmails}
            />
        </Stack>
    );
};
