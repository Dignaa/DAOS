import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/users/$userId')({
  component: UserPage,
});

function UserPage() {
  const { userId } = Route.useParams();
  return <div>{userId}</div>;
}
