import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/(sign)/signin')({
  component: RouteComponent,
});

function RouteComponent() {
  return 'Hello /(sign)/signin!';
}
