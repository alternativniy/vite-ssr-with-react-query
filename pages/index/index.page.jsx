import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Counter } from './Counter'
import { getUsers } from '../../src/api/users'
import { usePageContext } from '../../renderer/usePageContext'

export { Page, prefetchQueries }

const prefetchQueries = {
  'users': {
    fn: getUsers,
  }
}

function Page({ users }) {
  const context = usePageContext();
  const { data } = useQuery(['users'], getUsers);

  //console.log(data)

  return (
    <>
      <h1>Welcome</h1>
      This page is:
      <ul>
        {data.map((user) => 
          <li key={user.id}>{user.name}</li>
        )}
      </ul>
    </>
  )
}
