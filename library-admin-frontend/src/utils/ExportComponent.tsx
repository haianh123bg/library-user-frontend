import * as React from 'react';
import { jsPDF } from 'jspdf';
import { Workbook } from 'exceljs';
import { Document, Packer, Paragraph, Table, TableCell, TableRow, AlignmentType, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { Button, Box, Tooltip } from '@mui/material';
import UpgradeIcon from '@mui/icons-material/Upgrade';

interface BookData {
    id: number;
    name: string;
    publishing_year: number;
    price: number;
    inventory_number: string;
    page_number: number;
    status: string;
    language: string;
    author: string;
    category: string;
    publisher: string;
    ratings_star: number;
    coupon_codes: string;
}

interface ExportComponentProps {
    data: BookData[];
}

const ExportComponent: React.FC<ExportComponentProps> = ({ data }) => {
    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text('Report', 10, 10);
        data.forEach((item, index) => {
            doc.text(
                `${item.id}. ${item.name}, ${item.publishing_year}, ${item.price}, ${item.inventory_number}, ${item.page_number}, ${item.status}, ${item.language}, ${item.author}, ${item.category}, ${item.publisher}, ${item.ratings_star}, ${item.coupon_codes}`,
                10,
                20 + index * 10,
            );
        });
        doc.save('report.pdf');
    };

    const exportExcel = () => {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Report');
        worksheet.addRow([
            'ID',
            'Name',
            'Publishing Year',
            'Price',
            'Inventory Number',
            'Page Number',
            'Status',
            'Language',
            'Author',
            'Category',
            'Publisher',
            'Ratings Star',
            'Coupon Codes',
        ]);
        data.forEach((item) => {
            worksheet.addRow([
                item.id,
                item.name,
                item.publishing_year,
                item.price,
                item.inventory_number,
                item.page_number,
                item.status,
                item.language,
                item.author,
                item.category,
                item.publisher,
                item.ratings_star,
                item.coupon_codes,
            ]);
        });

        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            saveAs(blob, 'report.xlsx');
        });
    };

    const exportDoc = () => {
        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        new Paragraph({
                            text: 'This is a report',
                            heading: HeadingLevel.HEADING_1,
                            alignment: AlignmentType.CENTER,
                        }),
                        new Table({
                            rows: [
                                new TableRow({
                                    children: [
                                        new TableCell({ children: [new Paragraph('ID')] }),
                                        new TableCell({ children: [new Paragraph('Name')] }),
                                        new TableCell({ children: [new Paragraph('Publishing Year')] }),
                                        new TableCell({ children: [new Paragraph('Price')] }),
                                        new TableCell({ children: [new Paragraph('Inventory Number')] }),
                                        new TableCell({ children: [new Paragraph('Page Number')] }),
                                        new TableCell({ children: [new Paragraph('Status')] }),
                                        new TableCell({ children: [new Paragraph('Language')] }),
                                        new TableCell({ children: [new Paragraph('Author')] }),
                                        new TableCell({ children: [new Paragraph('Category')] }),
                                        new TableCell({ children: [new Paragraph('Publisher')] }),
                                        new TableCell({ children: [new Paragraph('Ratings Star')] }),
                                        new TableCell({ children: [new Paragraph('Coupon Codes')] }),
                                    ],
                                }),
                                ...data.map(
                                    (item) =>
                                        new TableRow({
                                            children: [
                                                new TableCell({ children: [new Paragraph(item.id.toString())] }),
                                                new TableCell({ children: [new Paragraph(item.name)] }),
                                                new TableCell({
                                                    children: [new Paragraph(item.publishing_year.toString())],
                                                }),
                                                new TableCell({ children: [new Paragraph(item.price.toString())] }),
                                                new TableCell({ children: [new Paragraph(item.inventory_number)] }),
                                                new TableCell({
                                                    children: [new Paragraph(item.page_number.toString())],
                                                }),
                                                new TableCell({ children: [new Paragraph(item.status)] }),
                                                new TableCell({ children: [new Paragraph(item.language)] }),
                                                new TableCell({ children: [new Paragraph(item.author)] }),
                                                new TableCell({ children: [new Paragraph(item.category)] }),
                                                new TableCell({ children: [new Paragraph(item.publisher)] }),
                                                new TableCell({
                                                    children: [new Paragraph(item.ratings_star.toString())],
                                                }),
                                                new TableCell({ children: [new Paragraph(item.coupon_codes)] }),
                                            ],
                                        }),
                                ),
                            ],
                        }),
                    ],
                },
            ],
        });

        Packer.toBlob(doc).then((blob) => {
            saveAs(blob, 'report.docx');
        });
    };

    return (
        <Tooltip
            sx={{ backgroundColor: 'Highlight', color: 'white' }}
            PopperProps={{
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 1],
                        },
                    },
                ],
            }}
            title={
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Button sx={{ width: '100%' }} variant="contained" color="primary" onClick={exportPDF}>
                        Xuất PDF
                    </Button>
                    <Button sx={{ width: '100%' }} variant="contained" color="secondary" onClick={exportExcel}>
                        Xuất Excel
                    </Button>
                    <Button sx={{ width: '100%' }} variant="contained" color="success" onClick={exportDoc}>
                        Xuất DOC
                    </Button>
                </Box>
            }
        >
            <Button>
                Xuất báo cáo
                <UpgradeIcon />
            </Button>
        </Tooltip>
    );
};

export default ExportComponent;
