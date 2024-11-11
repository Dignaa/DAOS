import styles from './PostGrid.module.css';
import Post from './Post';

interface PostProps {
  _id: string;
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
        <Post key={post._id} {...post} />
      ))}
    </ul>
  );
}
