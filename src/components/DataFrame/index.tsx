/* eslint-disable react/prop-types */
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { DeleteOutlined } from '@mui/icons-material';
import { DataFrameInput } from './DataFrame.model';
import { BaseSyntheticEvent } from 'react';
import moment from 'moment';
import { ButtonGroup } from '@mui/material';

export const DataFrame = ({ rows }: DataFrameInput) => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'date',
      headerName: 'Date',
      width: 130,
      valueFormatter: (params: any) =>
        moment(params?.value).format("DD/MM/YYYY hh:mm A"),
    },
    { field: 'location', headerName: 'Location', width: 130 },
    { field: 'weight', headerName: 'Weight', width: 100 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params: any) => {
        const onDeleteClick = (e: BaseSyntheticEvent) => {
          e.stopPropagation();
          const row = params.row;
          console.debug(row.id);
        };

        const onViewClick = (e: BaseSyntheticEvent) => {
          e.stopPropagation();
          const row = params.row;
          console.debug(row)
        };

        return (
          <div>
            <ButtonGroup>
              <Button onClick={e => onViewClick(e)}>View</Button>
              <Button onClick={e => onDeleteClick(e)}><DeleteOutlined /></Button>
            </ButtonGroup>
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
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
