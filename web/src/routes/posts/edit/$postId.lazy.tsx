import * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/posts/edit/$postId')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /posts/edit/$postId!'
}
