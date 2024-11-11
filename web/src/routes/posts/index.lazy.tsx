import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/posts/')({
  component: Posts,
});

function Posts() {
  return 'Hello /posts!';
}
