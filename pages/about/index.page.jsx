import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../../src/api/users'

import './code.css'

export { Page, prefetchQueries }

const prefetchQueries = {
  'usersAbout': {
    fn: getUsers,
  }
}

function Page() {
  const { data } = useQuery(['usersAbout'], getUsers);

  return (
    <>
      <h1>About</h1>
      <p>
        Demo using <code>vite-plugin-ssr</code>.
      </p>
      <ul>
        {data.map((user) => 
          <li key={user.id}>{user.name}</li>
        )}
      </ul>
    </>
  )
}
