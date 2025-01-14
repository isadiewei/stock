/* eslint-disable react/prop-types */
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { DeleteOutlined } from '@mui/icons-material';
import { DataFrameInput } from './DataFrame.model';
import { BaseSyntheticEvent } from 'react';

export const DataFrame = ({ rows }: DataFrameInput) => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'location', headerName: 'Location', width: 130 },
    { field: 'weight', headerName: 'Weight', width: 70 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params: any) => {
        const onClick = (e: BaseSyntheticEvent) => {
          e.stopPropagation(); 
          const row = params.row.todoId;
          console.debug(row);
        };

        return (
          <div>
            <Button onClick={e => onClick(e)}><DeleteOutlined /></Button>
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
        getRowId={(row) => row.todoId}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
