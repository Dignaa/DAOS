import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/posts/$postId')({
  component: PostPage,
});

function PostPage() {
  const { postId } = Route.useParams();
  return <div>{postId}</div>;
}
