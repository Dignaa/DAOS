import styles from './PostOverview.module.css';
import typographyStyles from '../../components/typographyStyles.module.css';
import buttonStyles from '../../components/buttonStyles.module.css';
import { Link } from '@tanstack/react-router';
import daysAgo from '../../utils/daysAgo';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface Group {
  _id: string;
  address: string;
  imageUrl: string;
  name: string;
  noOfActiveMembers: number;
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
  const [joined, setJoined] = useState(false);
  const { session } = useAuth();

  const joinGroup = () => {
    fetch(`http://localhost:3000/groups/${post?.group._id}/users`, {
      method: 'POST',
      body: JSON.stringify({
        "postId": post._id
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + session,
      },
    })
      .then(response => {
        return response.json().then(data => {
          if (!response.ok) {
            return Promise.reject(data);
          }
          return data;
        });
      })
      .then(responseData => {
        alert('Du har tilsluttet dig dette ensemble');
        setJoined(true);
      })
      .catch(() => {
        alert('Error');
      });
  };

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
          {joined ? (
            <button
              className={`${buttonStyles.button} ${buttonStyles.blue}`}
              onClick={joinGroup}
              disabled
            >
              Tilsluttet {post?.group.name}
            </button>
          ) : (
            <button
              className={`${buttonStyles.button} ${buttonStyles.blue}`}
              onClick={joinGroup}
            >
              Tilslut dig {post?.group.name}
            </button>
          )}
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
