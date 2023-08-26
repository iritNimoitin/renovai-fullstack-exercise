import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const CreateTable = React.forwardRef((props, ref) => {;
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        ref={ref}
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
        {...props}
      />
    </Box>
  );
})

export default CreateTable;