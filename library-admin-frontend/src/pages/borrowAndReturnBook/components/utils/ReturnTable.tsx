import * as React from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import {
    GridRowsProp,
    GridRowModesModel,
    DataGrid,
    GridColDef,
    GridActionsCellItem,
    GridEventListener,
    GridRowModel,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';
import ReturnSlipModel from '../../../../models/ReturnSlipModel';

export const ReturnTable: React.FC<{ returnBooks: ReturnSlipModel[] }> = (props) => {
    const initialRows: GridRowsProp = props.returnBooks.map((returnBook) => ({
        id: returnBook.return_slip_id,
        book: returnBook.book?.name,
        user: returnBook.user?.user_account_name,
        returnSlipDate: returnBook.return_slip_date,
    }));
    console.log(initialRows);

    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', type: 'number', width: 50 },
        {
            field: 'book',
            headerName: 'Tên sách',
            type: 'string',
            width: 180,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'user',
            headerName: 'Email',
            type: 'string',
            width: 180,
        },
        {
            field: 'returnSlipDate',
            headerName: 'Ngày trả',
            type: 'string',
            width: 180,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem icon={<EditIcon />} label="Edit" className="textPrimary" color="inherit" />,
                    <GridActionsCellItem icon={<DeleteIcon />} label="Delete" color="inherit" />,
                ];
            },
        },
    ];

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
                    Bảng Phiếu Trả
                </Typography>
                <Button variant="contained">
                    Xuất báo cáo
                    <UpgradeIcon />
                </Button>
            </Box>
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
            />
        </Box>
    );
};
