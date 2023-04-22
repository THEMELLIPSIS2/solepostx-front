import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SearchField() {
  const router = useRouter();
  let [field, setField] = useState('');

  function handleChange(e) {
    setField(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    let qs = ``;
    qs += field !== '' ? `filter=${field}` : '';
    router.push(`../search?${qs}`);
  }

  return (
    <Box
      component="form"
      noValidate
      sx={{ display: 'flex', alignItems: 'flex-end', float: 'right' }}
    >
      <TextField
        id="input-with-sx"
        label="Search"
        variant="filled"
        value={field}
        onInput={handleChange}
      />
      <IconButton
        type="submit"
        onClick={handleSearch}
        sx={{ borderRadius: 1, height: '55px' }}
      >
        <SearchIcon
          sx={{ color: 'action.active', mr: 1, my: 0.5, alignSelf: 'center' }}
        />
      </IconButton>
    </Box>
  );
}
