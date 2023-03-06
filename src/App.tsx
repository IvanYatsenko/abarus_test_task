import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { IPost, SortDirection } from './types/types'
import { Pagination } from '@mui/material'
import { POSTS_PER_PAGE, URL_FETCH_STR } from './constants/constans'
import { SearchInput } from './components/SearchInput'
import { TablePosts } from './components/TablePosts'

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

  const fetchPosts = async () => {
    try {
      const response = await axios.get<IPost[]>(URL_FETCH_STR)
      setPosts(response.data)
      setPostsFilterArr(response.data)
      setPageCount(Math.ceil(response.data.length / 10))
    } catch (error) {
      alert(error)
    }
  }

  const changeInputSearchHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const paginationHandler = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentNumberPage(value - 1)
    query.set('pageNumber', `${value}`)
    window.history.pushState(null, '', '?' + query.toString())
  }

  return (
    <div className='main-container'>
      <SearchInput onChange={(event) => changeInputSearchHandler(event)} />
      <TablePosts onClick={sortHandler} posts={displayPosts} />
      <Pagination sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '24px 0'}} count={pagesCount} page={currentNumberPage + 1} onChange={paginationHandler} />
    </div>
  )
}

export default App