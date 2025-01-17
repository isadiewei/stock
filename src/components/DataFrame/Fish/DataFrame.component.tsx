
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { DeleteOutlined } from '@mui/icons-material';
import { DataFrameInput } from './DataFrame.model';
import { BaseSyntheticEvent, useState } from 'react';
import { isAdmin } from '../../../services/isAdmin';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { InfoDialog } from '../../InfoDialog/InfoDialog.component';
import { deleteCatch } from './DataFrame.service';

export const DataFrame = ({ rows, rerender }: DataFrameInput) => {
  const [admin, setAdmin] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedTrackingId, setSelectedTrackingId] = useState('');
  isAdmin().then(admin => setAdmin(admin));
  const navigate = useNavigate();

  const handleClose = (_selectedValue: string) => {
    setOpen(false);
  };

  const columns: Array<GridColDef> = [
    { field: 'id', headerName: 'ID', width: 130 },
    {
      field: 'date',
      headerName: 'Date',
      width: 200,
      valueFormatter: (params: any) =>
        dayjs(params?.value).format("DD/MM/YYYY hh:mm A"),
    },
    { field: 'location', headerName: 'Location', width: 130 },
    { field: 'weight', headerName: 'Weight', width: 100 },
    {
      field: 'trackingId',
      headerName: 'Tracking Id',
      width: 100,
    },
    {
      field: 'action',
      headerName: 'Action',
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      width: 250,
      renderCell: (params: any) => {
        const onDeleteClick = (e: BaseSyntheticEvent) => {
          e.stopPropagation();
          const row = params.row;
          deleteCatch(row.id).then(result => {
            console.debug(result);
            rerender(true);
          }).catch(error => {
            console.error(error);
          })
        };

        const onViewClick = (e: BaseSyntheticEvent) => {
          e.stopPropagation();
          const row = params.row;
          setSelectedTrackingId(row.trackingId);
          setOpen(true);
        };

        const onEditClick = (e: BaseSyntheticEvent) => {
          e.stopPropagation();
          const row = params.row;
          console.debug(row);
          navigate(`/editcatch/${row.id}`)
        }

        return (
          <div>
            <Button onClick={e => onViewClick(e)}>View</Button>
            {admin ? <Button onClick={e => onEditClick(e)}>Edit</Button> : <></>}
            {admin ? <Button onClick={e => onDeleteClick(e)}><DeleteOutlined /></Button> : <></>}
            <InfoDialog
              selectedValue={selectedTrackingId}
              open={open}
              onClose={handleClose}
            />
          </div>
        )
      }
    }
  ];


  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        getRowId={(row) => row.id}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
