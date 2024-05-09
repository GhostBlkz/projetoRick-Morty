import * as React from 'react';
import {AppBar, Box, Toolbar} from '@mui/material';

import AuthControl from './AuthControl';

export default function HeaderBar() {
    return (
        <Box sx={{ 
            flexGrow: 1,
            width: '100%',
            position: 'fixed',
            }}>
          <AppBar position="fixed" >
            <Toolbar sx={{justifyContent: 'flex-end'}}>
              <AuthControl/>
            </Toolbar>
          </AppBar>
        </Box>
      );
    
  }
