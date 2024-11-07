import styles from './PostGrid.module.css';
import Post from './Post';

interface PostProps {
  id: string;
  title: string;
  user: string;
  instrument: string;
  date: string;
  address: string;
}

interface PostGridProps {
  posts: PostProps[];
}

export default function PostGrid({ posts }: PostGridProps) {
  return (
    <ul className={styles.grid}>
      {posts.map(post => (
        <Post key={post.id} {...post} />
      ))}
    </ul>
  );
}
