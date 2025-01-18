import { BaseSyntheticEvent, MouseEvent, useEffect, useState } from "react";
import { DataFrameProps } from "./DataFrame.model";
import { isAdmin } from "../../../../services/isAdmin";
import { Button, Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DeleteOutlined } from "@mui/icons-material";
import { deleteCatch } from "./DataFrame.service";
import { InfoDialog } from "../../../../components/InfoDialog";
import { useNavigate } from "react-router-dom";

export const DataFrame = ({ rows, rerender }: DataFrameProps) => {
  const [admin, setAdmin] = useState(false);
  const paginationModel = { page: 0, pageSize: 5 };
  const navigate = useNavigate();
  // const [selectedTrackingId, setSelectedTrackingId] = useState('');
  // const [open, setOpen] = useState(false);

  // const handleClose = (_selectedValue: string) => {
  //   setOpen(false);
  // };

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
      width: 180,
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

        const onEditClick = (e: BaseSyntheticEvent) => {
          e.stopPropagation();
          const row = params.row;
          console.debug(row);
          navigate(`/editfish/${row.id}`)
        }

        // const onViewClick = (e: BaseSyntheticEvent) => {
        //   e.stopPropagation();
        //   const row = params.row;
        //   setSelectedTrackingId(row.trackingId);
        //   setOpen(true);
        // };


        return (
          <div>
            {/* <Button onClick={e => onViewClick(e)}>View</Button> */}
            {admin ? <Button onClick={e => onEditClick(e)}>Edit</Button> : <></>}
            {admin ? <Button onClick={e => onDeleteClick(e)}><DeleteOutlined /></Button> : <></>}
            {/* <InfoDialog
              selectedValue={selectedTrackingId}
              open={open}
              onClose={handleClose}
            /> */}
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