import styles from './Post/PostOverview.module.css';
import typographyStyles from '../components/typographyStyles.module.css';
import buttonStyles from '../components/buttonStyles.module.css';
import Grid from './Grid';

export interface Group {
  _id: string;
  name: string;
  imageUrl?: string;
  description?: string;
  address?: string;
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };
  link?: string;
  noOfActiveMembers?: number;
  adminId: string;
  userIds: string[];
  posts?: Post[];
}

export interface Post {
  _id: string;
  createdAt: string;
  date: string;
  description: string;
  instrument: string;
  title: string;
  group: Group;
}

export interface GroupProps {
  group: Group;
  isAdmin: boolean;
  deletePostFunction: Function;
}

export default function GroupOverview({
  group,
  isAdmin,
  deletePostFunction,
}: GroupProps) {
  group.posts?.forEach(post => {
    post.group = group;
  });
    post.group = group;
  });
  return (
    <>
      <div className={styles.box}>
        <div className={styles.content}>
          {group.imageUrl && (
            <img
              src={group.imageUrl}
              alt={group.name}
              className={styles.image}
            />
          )}
          <div className={styles.column}>
            <h1 className={typographyStyles.red}>{group.name}</h1>
            <address className={styles.address}>
              {group.address || 'Ingen adresse givet'}
            </address>
            <p>{group.description || `Ingen beskrivelse endnu.`}</p>
            <p>{group.noOfActiveMembers} active members</p>
            {isAdmin && (
              <>
                <a
                  className={`${buttonStyles.button}`}
                  href={`/groups/edit/${group._id}`}
                >
                  Edit group
                </a>
                <a
                  className={`${buttonStyles.button} ${buttonStyles.red}`}
                  onClick={() => deletePostFunction()}
                >
                  Delete group
                </a>
              </>
            )}
            {group.link && (
              <a
                className={`${buttonStyles.button} ${buttonStyles.blue}`}
                href={group.link}
              >
                Group website
              </a>
            )}
          </div>
        </div>
      </div>
      <h2 className={typographyStyles.title}>Group Posts</h2>
      <Grid cards={group.posts || []} />
    </>
  );
}
