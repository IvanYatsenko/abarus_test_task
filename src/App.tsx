import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { IPost, SortDirection } from './types/types'
import {
  Box,
  InputAdornment,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material'
import { BrowserRouter } from 'react-router-dom'

const POSTS_PER_PAGE = 10

function App() {
  const query = new URLSearchParams(window.location.search)
  const initPageNumber = Number(query.get('pageNumber'))

  const [posts, setPosts] = useState<IPost[]>([])
  const [postsFilterArr, setPostsFilterArr] = useState<IPost[]>([])
  const [sortState, setSortState] = useState<{ direction: SortDirection, currentCol: keyof IPost }>({
    direction: 'asc',
    currentCol: 'id'
  })
  const [pagesCount, setPageCount] = useState(0)
  const [currentNumberPage, setCurrentNumberPage] = useState(!isNaN(initPageNumber) && initPageNumber > 1 ? initPageNumber - 1 : 0)

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    try {
      const response = await axios.get<IPost[]>(`https://jsonplaceholder.typicode.com/posts`)
      console.log(response.data)
      setPosts(response.data)
      setPostsFilterArr(response.data)
      setPageCount(Math.ceil(response.data.length / 10))
    } catch (error) {
      alert(error)
    }
  }

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value.trim()
    const postFiltred = posts.filter(post => post.title.includes(value) || post.body.includes(value) || post.id.toString().includes(value))
    setPostsFilterArr(postFiltred)
    setCurrentNumberPage(0)
    setPageCount(Math.ceil(postFiltred.length / 10))
  }

  const sortPosts = (arg: keyof IPost, direction: SortDirection) => {
    if (direction === 'desc') {
      setPostsFilterArr((prevState) => [...prevState].sort((post1, post2) => post1[arg] < post2[arg] ? 1 : -1))
    } else {
      setPostsFilterArr((prevState) => [...prevState].sort((post1, post2) => post1[arg] > post2[arg] ? 1 : -1))
    }
  }

  const sortStateHandler = (colName: keyof IPost, direction: SortDirection) => {
    setSortState({ direction, currentCol: colName })
  }

  const sortHandler = (colName: keyof IPost) => {
    const direction: SortDirection = sortState.currentCol === colName && sortState.direction === 'asc' ? 'desc' : 'asc'
    sortPosts(colName, direction)
    sortStateHandler(colName, direction)
  }

  const displayPosts = useMemo(() => {
    const startIndex = currentNumberPage * POSTS_PER_PAGE
    const endIndex = startIndex + POSTS_PER_PAGE
    return postsFilterArr.slice(startIndex, endIndex)
  }, [currentNumberPage, postsFilterArr])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentNumberPage(value - 1)
    query.set('pageNumber', `${value}`)
    window.history.pushState(null, '', '?' + query.toString())
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
              <TableCell sx={{ color: '#fff', cursor: 'pointer' }} onClick={() => sortHandler('id')}>ID</TableCell>
              <TableCell sx={{ color: '#fff', paddingLeft: 16, cursor: 'pointer' }} onClick={() => sortHandler('title')}>Заголовок</TableCell>
              <TableCell sx={{ color: '#fff', paddingLeft: 16, cursor: 'pointer' }} onClick={() => sortHandler('body')}>Описание</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {


              displayPosts.map((post) => (
                <TableRow
                  key={post.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.body}</TableCell>
                </TableRow>
              ))


              
            }
          </TableBody>
        </Table>
      </TableContainer>


      <Pagination count={pagesCount} page={currentNumberPage + 1} onChange={handleChange} />


    </div>
  )
}

export default App