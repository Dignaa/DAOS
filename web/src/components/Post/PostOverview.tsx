import styles from './PostOverview.module.css';
import typographyStyles from '../../components/typographyStyles.module.css';
import buttonStyles from '../../components/buttonStyles.module.css';
import { Link } from '@tanstack/react-router';
import daysAgo from '../../utils/daysAgo';

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
  const postedDaysAgo = daysAgo(post.createdAt);
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
          <address className={styles.address}>
            {post.group.address || 'Ingen adresse givet'}
          </address>
          <p>{post.description || `Ingen beskrivelse endnu.`}</p>
          <button className={`${buttonStyles.button} ${buttonStyles.blue}`}>
            Jeg vil spille {post.instrument.toLocaleLowerCase()} hos{' '}
            {post.group.name}
          </button>
          <Link
            to="/groups/$groupId"
            params={{ groupId: post.group._id }}
            className={buttonStyles.button}
          >
            Jeg vil læse mere om {post.group.name}
          </Link>
        </div>
      </div>
      <div className={styles.footer}>
        <p>{post.group.name}</p>
        <p>
          {postedDaysAgo === 0
            ? 'I dag'
            : postedDaysAgo === 1
              ? 'I går'
              : `${postedDaysAgo} dage siden`}
        </p>
      </div>
    </div>
  );
}
