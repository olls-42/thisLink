import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <h1>Simple Links</h1>

      <Outlet />
    </React.Fragment>
  )
}
