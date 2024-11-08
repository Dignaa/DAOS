import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/profile/')({
  component: RouteComponent,
});

function RouteComponent() {
  return 'Hello /profile/!';
}
