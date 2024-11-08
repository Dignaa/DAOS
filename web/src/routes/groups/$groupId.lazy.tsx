import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/groups/$groupId')({
  component: GroupPage,
});

function GroupPage() {
  const { groupId } = Route.useParams();
  return <div>{groupId}</div>;
}
