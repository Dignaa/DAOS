import styles from './PostGrid.module.css';
import Card from './Card/Card';

interface PostGridProps {
  posts: any;
  type: string;
}

export default function PostGrid({ posts, type }: PostGridProps) {
  return (
    <ul className={styles.grid}>
      {posts.map(post => (
        <Card key={post._id} {...post} type={type} />
      ))}
    </ul>
  );
}
