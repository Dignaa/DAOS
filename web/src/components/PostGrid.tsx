import styles from './PostGrid.module.css';
import Card from './Card/Card';

interface PostGridProps {
  posts: any;
}

export default function PostGrid({ posts }: PostGridProps) {
  return (
    <ul className={styles.grid}>
      {posts.map(post => (
        <Card key={post._id} {...post} />
      ))}
    </ul>
  );
}
