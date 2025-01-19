import { DeleteOutlined, Edit } from "@mui/icons-material";
import { Button, Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../../../services/isAdmin";
import { DataFrameProps } from "./DataFrame.model";
import { deleteFish } from "./DataFrame.service";

export const DataFrame = ({ rows, rerender }: DataFrameProps) => {
  const [admin, setAdmin] = useState(false);
  const paginationModel = { page: 0, pageSize: 5 };
  const navigate = useNavigate();

  useEffect(() => {
    isAdmin().then(admin => setAdmin(admin));
  });

  const columns: Array<GridColDef> = [
    { field: 'id', headerName: 'ID', width: 250 },
    {
      field: 'name',
      headerName: 'Name'
    },
    {
      field: 'type',
      headerName: 'Type'
    },
    {
      field: 'action',
      headerName: 'Action',
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      width: 150,
      renderCell: (params: any) => {
        const onDeleteClick = (e: BaseSyntheticEvent) => {
          e.stopPropagation();
          const row = params.row;
          deleteFish(row.id).then(_result => {
            rerender(true);
          }).catch(error => {
            console.error(error);
          })
        };

        const onEditClick = (e: BaseSyntheticEvent) => {
          e.stopPropagation();
          const row = params.row;
          navigate(`/editfish/${row.id}`)
        }

        return (
          <div>
            {admin ? <Button onClick={e => onEditClick(e)}><Edit /></Button> : <></>}
            {admin ? <Button onClick={e => onDeleteClick(e)}><DeleteOutlined /></Button> : <></>}
          </div>
        )
      }
    }

  ];

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          getRowId={(row) => row.id || -1}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  )
}