import React, { useState, useEffect } from 'react';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const filter = createFilterOptions();

export default function MultiSelectorAuto({
  options = [],
  getOptionLabel = null,
  label = '',
  helperText = '',
  limitSelection = null,
  defaultValue = [],
  setState = (state) => {},
  id = '',
  fullWidth = false,
  disabled = false,
  sx = {}
}) {
  useEffect(() => {
    setValue([...defaultValue]);
  }, [defaultValue]);

  const printLabel = label
    ? label
        .split(/[^\w]+/gm)
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .filter((word) => word != '')
        .join(' ')
    : '';

  const [value, setValue] = useState(defaultValue ? [...defaultValue] : []);

  const handleChange = (e, val) => {
    e.preventDefault();
    if (!limitSelection || val.length <= +limitSelection) {
      setValue(val);
      setState(val);
    }
  };
  return (
    <Autocomplete
      sx={sx}
      disabled={disabled}
      aria-label={`${printLabel} entry field`}
      fullWidth={fullWidth}
      multiple
      id={id}
      options={options.sort()}
      getOptionLabel={(op) => (getOptionLabel ? getOptionLabel(op) : {})}
      value={value}
      getOptionDisabled={(option) =>
        limitSelection && value.length === +limitSelection ? true : false
      }
      filterSelectedOptions
      onChange={(event, value) => handleChange(event, value)}
      renderInput={(params) => (
        <TextField
          color="secondary"
          {...params}
          label={printLabel}
          helperText={helperText}
          value={value}
          disabled={
            disabled || (limitSelection && value.length === +limitSelection)
          }
          size="small"
        />
      )}
    />
  );
}
