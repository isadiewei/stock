import { DeleteOutlined, Edit, Visibility } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Timestamp } from 'firebase/firestore';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InfoDialog } from '../../../../components';
import { isAdmin } from '../../../../services/isAdmin';
import { DataFrameInput } from './DataFrame.model';
import { deleteCatch } from './DataFrame.service';

export const DataFrame = ({ rows, rerender }: DataFrameInput) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [selectedTrackingId, setSelectedTrackingId] = useState('');

  useEffect(() => {
    isAdmin().then(admin => setAdmin(admin));
  })

  useEffect(() => {
    rerender(true);
  }, [])

  const columns: Array<GridColDef> = [
    { field: 'id', headerName: 'ID', width: 130 },
    {
      field: 'date',
      headerName: 'Date',
      width: 200,
      valueFormatter: (params: Timestamp) => {
        const timestamp = params.toDate();
        return `${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}`;
      }
    },
    { field: 'location', headerName: 'Location', width: 100 },
    { field: 'lure', headerName: 'Lure', width: 100 },
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
      align: 'center',
      sortable: false,
      filterable: false,
      width: 200,
      renderCell: (params: any) => {
        const onDeleteClick = (e: BaseSyntheticEvent) => {
          e.stopPropagation();
          const row = params.row;
          deleteCatch(row.id).then(_result => {
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
            <Button onClick={e => onViewClick(e)}><Visibility /></Button>
            {admin ? <Button onClick={e => onEditClick(e)}><Edit /></Button> : <></>}
            {admin ? <Button onClick={e => onDeleteClick(e)}><DeleteOutlined /></Button> : <></>}
            <InfoDialog
              selectedValue={selectedTrackingId}
              open={open}
              onClose={_ => setOpen(false)}
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
