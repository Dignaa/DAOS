import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/groups/')({
  component: Groups,
});

function Groups() {
  return 'Hello /groups!';
}
