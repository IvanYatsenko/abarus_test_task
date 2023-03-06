import { TableCell, TableRow } from '@mui/material'
import { FC } from 'react'
import { IPost } from '../types/types'

interface ITableRowPostProps {
  post: IPost
}

export const TableRowPost: FC<ITableRowPostProps> = ({ post }) => {
  return (
    <TableRow
      key={post.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>{post.id}</TableCell>
      <TableCell>{post.title}</TableCell>
      <TableCell>{post.body}</TableCell>
    </TableRow>
  )
}