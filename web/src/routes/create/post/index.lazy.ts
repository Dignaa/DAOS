import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/create/post/')({
  component: RouteComponent,
});

function RouteComponent() {
  return 'Hello /create/post/!';
}
