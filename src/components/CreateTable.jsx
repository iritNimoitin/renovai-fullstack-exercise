import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function CreateTable (props) {;
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        {...props}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        autoHeight
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}