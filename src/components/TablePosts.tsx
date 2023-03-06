import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { FC } from 'react'
import { IPost } from '../types/types'
import { TableRowPost } from './TableRowPost'

interface ITablePostsProps {
    posts: IPost[]
    onClick: (currentCol: keyof IPost) => void
}

export const TablePosts:FC<ITablePostsProps> = ({posts, onClick}) => {
    return (
        <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ background: '#474955' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff', cursor: 'pointer' }} onClick={() => onClick('id')}>ID</TableCell>
              <TableCell sx={{ color: '#fff', paddingLeft: 16, cursor: 'pointer' }} onClick={() => onClick('title')}>Заголовок</TableCell>
              <TableCell sx={{ color: '#fff', paddingLeft: 16, cursor: 'pointer' }} onClick={() => onClick('body')}>Описание</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              posts.map((post) => (
                <TableRowPost post={post} key={post.id}/>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
)
}