import {
  Input,
  InputLabel,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Checkbox,
  Container,
  Select,
  MenuItem,
  Paper,
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormGroup,
  FormControlLabel,
  Autocomplete,
  TextField,
  ButtonGroup
} from '@mui/material';
import MultiSelectorAuto from '../MultiSelectorAuto';
import { Check, Search } from '@mui/icons-material';
import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';

export const SearchIndex = ({ categories, tags }) => {
  const router = useRouter();

  const [filter, setFilter] = useState('');
  const [useCategory, setUseCategory] = useState(false);
  const [cat, setCat] = useState(null);
  const [useTag, setUseTag] = useState(false);
  const [tag, setTag] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let qs = ``;
    qs += filter !== '' ? `filter=${filter}` : '';
    qs += useCategory ? `&category=${cat.attributes.slug}` : '';
    qs += useTag
      ? `&tag=${tag
          .map((t) => {
            return t.attributes.slug;
          })
          .join(',')}`
      : '';
    router.push(`search?${qs}`);
  };

  const handleClear = () => {
    setFilter('');
    setUseCategory(false);
    setCat(null);
    setUseTag(false);
    setTag([]);
  };

  return (
    <Container>
      <Card sx={{ p: 2, m: 2, gap: 2 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Search sx={{ width: '25px' }} />
              <Input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                type="search"
                sx={{ p: 1, m: 1, width: '100%' }}
                placeholder="Search..."
              ></Input>
            </Box>
            <Accordion variant="outlined">
              <AccordionSummary>Advanced Filters</AccordionSummary>
              <AccordionDetails
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Checkbox
                    checked={useCategory}
                    onChange={(e) => {
                      setUseCategory(e.target.checked);
                    }}
                    color="secondary"
                  />
                  <Autocomplete
                    value={cat}
                    onChange={(e, val) => setCat(val)}
                    fullWidth
                    size="small"
                    disabled={!useCategory}
                    options={categories.data}
                    getOptionLabel={(op) => {
                      return op.attributes.name
                        .split(' ')
                        .map((o) => {
                          return `${o[0].toUpperCase()}${o.slice(1)}`;
                        })
                        .join(' ');
                    }}
                    label="Category"
                    renderInput={(params) => (
                      <TextField
                        color="secondary"
                        {...params}
                        label="Category"
                      />
                    )}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Checkbox
                    checked={useTag}
                    onChange={(e) => {
                      setUseTag(e.target.checked);
                    }}
                    color="secondary"
                  />
                  <MultiSelectorAuto
                    disabled={!useTag}
                    fullWidth
                    options={tags.data}
                    label="Tags"
                    defaultValue={tag}
                    setState={(val) => setTag(val)}
                    getOptionLabel={(op) => {
                      return op.attributes.name
                        .split(' ')
                        .map((o) => {
                          return `${o[0].toUpperCase()}${o.slice(1)}`;
                        })
                        .join(' ');
                    }}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>
            <Box sx={{ alignSelf: 'flex-end', gap: 1, display: 'flex' }}>
              <Button onClick={handleClear} variant="contained" color="error">
                Clear
              </Button>
              <Button variant="contained" type="submit" color="secondary">
                Search
              </Button>
            </Box>
          </Box>
        </form>
      </Card>
    </Container>
  );
};
