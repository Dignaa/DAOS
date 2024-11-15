import styles from './PostOverview.module.css';
import typographyStyles from '../../components/typographyStyles.module.css';
import buttonStyles from '../../components/buttonStyles.module.css';
import { Link } from '@tanstack/react-router';

interface Group {
  _id: string;
  address: string;
  imageUrl: string;
  name: string;
  noOfActiveMembers: number;
  groupId: string;
}
interface Post {
  __v: number;
  _id: string;
  createdAt: string;
  date: string;
  description: string;
  group: Group;
  instrument: string;
  title: string;
}
interface Props {
  post: Post;
}

export default function Overview({ post }: Props) {
  return (
    <div className={styles.box}>
      <div className={styles.content}>
        {post.group.imageUrl && (
          <img
            src={post.group.imageUrl}
            alt={post.group.name}
            className={styles.image}
          />
        )}
        <div className={styles.column}>
          <h1 className={typographyStyles.red}>{post.title}</h1>
          <p>{post.group.name}</p>
          <p>{post.description || `Ingen beskrivelse endnu.`}</p>
          <Link
            to="/groups/$groupId"
            params={{ groupId: post.group._id }}
            className={`${buttonStyles.button} ${buttonStyles.blue}`}
          >
            Gå til ensemble for tilmelding
          </Link>
        </div>
      </div>
      <div className={styles.footer}>
        {<p>{post.group.address || 'Ingen adresse givet'}</p>}
      </div>
    </div>
  );
}
