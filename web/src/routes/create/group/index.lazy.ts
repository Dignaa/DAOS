import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/create/group/')({
  component: RouteComponent,
});

function RouteComponent() {
  return 'Hello /create/group/!';
}
