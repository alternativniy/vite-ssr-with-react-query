import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../../api/users'

import { User } from '../../types/api/User'

import './code.css'

export { Page, prefetchQueries }

const prefetchQueries = {
  'usersAbout': {
    fn: getUsers,
  }
}

function Page() {
  const { data } = useQuery<User[]>(['usersAbout'], getUsers);

  return (
    <>
      <h1>About</h1>
      <p>
        Demo using <code>vite-plugin-ssr</code>.
      </p>
      <ul>
        {data?.map((user) => 
          <li key={user.id}>{user.name}</li>
        )}
      </ul>
    </>
  )
}
