import { Box, InputAdornment, TextField } from '@mui/material'
import { FC } from 'react'
import SearchIcon from '@mui/icons-material/Search'

interface ISearchInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const SearchInput: FC<ISearchInputProps> = ({ onChange }) => {
  return (
    <Box sx={{
      p: '0',
      display: 'flex',
      alignItems: 'center',
      width: 631,
      background:
        '#5A5C66',
      color: '#fff',
      marginBottom: '15px'
    }}>
      <TextField
        sx={{ flex: 1, color: '#fff' }}
        placeholder='Поиск'
        id="search"
        type="text"
        fullWidth
        InputProps={{ endAdornment: <InputAdornment position='end'><SearchIcon sx={{ color: '#fff' }} /></InputAdornment> }}
        onChange={(event) => onChange(event)}
      />
    </Box>
  )
}