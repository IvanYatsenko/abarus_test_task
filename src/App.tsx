import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { IPost } from './types/types'
import {
  Box,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material'

function App() {
  const [posts, setPosts] = useState<IPost[]>([])
  const [postsFilterArr, setPostsFilterArr] = useState<IPost[]>([])

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    try {
      const response = await axios.get<IPost[]>(`https://jsonplaceholder.typicode.com/posts`)
      console.log(response.data)
      setPosts(response.data)
      setPostsFilterArr(response.data)
    } catch (error) {
      alert(error)
    }
  }

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(event.target.value.trim()) {
      setPostsFilterArr(posts.filter(post => post.title.includes(event.target.value.trim())))
    } else {
      setPostsFilterArr(posts)
    }
    
  }

  return (
    <div className='main-container'>
      <Box sx={{ p: '0', display: 'flex', alignItems: 'center', width: 631, background: '#5A5C66', color: '#fff', marginBottom: '15px' }}>
        <TextField
          sx={{ flex: 1, color: '#fff' }}
          placeholder='Поиск'
          id="search"
          type="text"
          fullWidth
          InputProps={{ endAdornment: <InputAdornment position='end'><SearchIcon sx={{ color: '#fff' }} /></InputAdornment> }}
          onChange={(event) => changeHandler(event)}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ background: '#474955' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>ID</TableCell>
              <TableCell sx={{ color: '#fff', paddingLeft: '16px' }}>Заголовок</TableCell>
              <TableCell sx={{ color: '#fff', paddingLeft: '16px' }}>Описание</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postsFilterArr.map((post) => (
              <TableRow
                key={post.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.body}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default App