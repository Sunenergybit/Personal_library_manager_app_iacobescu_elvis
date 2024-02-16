import React, { FC } from 'react';
import { AppBar, Toolbar, Button, useTheme } from '@mui/material';
import bookOfDragons from '../imgs/bookOfDragons.png';

interface AppHeaderProps {
  addNew: () => void;
}

const AppHeader: FC<AppHeaderProps> = ({ addNew }) => {
  const theme = useTheme();

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(to right, #1c2f3d 0%, #51798d 100%)' }}>
      <Toolbar sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing(2),
      }}>
        <Button onClick={addNew} variant="contained">
            + Add new Book
        </Button>
        <img src={bookOfDragons} alt="Did you read today?" style={{ maxWidth: '50px', height: 'auto' }} />
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
