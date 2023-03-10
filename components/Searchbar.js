import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ThemeProvider } from 'styled-components';
import { theme } from '../util/theme';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
//need to figure out how the classes work - theme provider doesn't affect the searchbar. i can change the color of when it's selected but i don't know
//why it doesn't change the color to match the rest of the navbar.


  export default function SearchField() {
    return ( //vv temporary vv remove box sx entirely when the searchbar color is figured out.
      <Box component="form" 
      noValidate 
      sx={{bgcolor: 'background.paper',display: 'flex', alignItems: 'flex-end',float:'right'}}>
        <ThemeProvider theme={theme}>
        <TextField id="input-with-sx" label="Search" variant="filled" /> 
        <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5, alignSelf:'center'}}/>
        </ThemeProvider>
      </Box>
    );
  }