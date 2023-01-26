import React, { memo, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Loading } from '../components/Loading';
import { getTodosAysnc, getUserAsync, selectTodos, selectTodoStatus, selectUsers, selectUserStatus } from '../features/userTodo/userTodoSlice';
import { getUsers } from '../services/user.service';
import { useAppDispatch } from '../store/hooks';

const Users = () => {
  // const todos = useSelector(selectTodos)
  const users = useSelector(selectUsers)
  const todos = useSelector(selectTodos)
  const userStatus = useSelector(selectUserStatus)
  const dispatch = useAppDispatch();

  const [currentUserID, setCurrentUserID] = useState(-1)

  useEffect(() => {
    dispatch(getUserAsync())
  }, [])
  
  useEffect(() => {
    if(currentUserID !== -1) {
      dispatch(getTodosAysnc(currentUserID))
    }
  }, [currentUserID])

  if (userStatus === 'loading') {
    return <Loading />
  }

  return (
    <div className='mx-auto container py-5'>
      <select
        onChange={e => setCurrentUserID(parseInt(e.target.value))}
        className='p-3 rounded-lg bg-blue-100 border border-blue-200 hover:bg-blue-200 cursor-pointer'
      >
        {users?.map(user => (
          <option key={user.name} value={user.id}>{user.name}</option>
        ))}
      </select>

      <div className='px-3 bg-gray-50 min-h-[320px] rounded-lg my-2'>
        {
          todos.map(todo => (
            <p key={todo.id} className='p-2 bg-white text-dark my-2'>{todo.title}</p>
          ))
        }
      </div>
    </div>
  )
}

export default memo(Users);