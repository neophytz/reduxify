import React, { memo, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Loading } from '../components/Loading';
import { getTodosAysnc, getUserAsync, selectTodos, selectUsers, selectUserStatus } from '../features/userTodo/userTodoSlice';
import { getTodos, getUsers } from '../services/user.service';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const Users = () => {
  // const users = useQuery('getUsers', getUsers).data;
  const todos = useSelector(selectTodos)
  // const categories = useAppSelector(productCategories);
  const users = useSelector(selectUsers)
  const userStatus = useSelector(selectUserStatus)
  const dispatch = useAppDispatch();

  const [currentUserID, setCurrentUserID] = useState(-1)

  console.log('rerender?')
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

  // console.log(categories)

  return (
    <div className='mx-auto container py-5'>
      <select
        onChange={e => setCurrentUserID(parseInt(e.target.value))}
        className='p-3 rounded-lg bg-blue-100 border border-blue-200 hover:bg-blue-200 cursor-pointer'
      >
        <option selected value="">--Option--</option>
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