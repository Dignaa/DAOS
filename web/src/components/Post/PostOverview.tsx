import styles from './PostOverview.module.css';
import typographyStyles from '../../components/typographyStyles.module.css';
import buttonStyles from '../../components/buttonStyles.module.css';
import { Link } from '@tanstack/react-router';
import daysAgo from '../../utils/daysAgo';
import { useEffect, useState } from 'react';
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
  deletePostFunction: () => void;
}

export default function Overview({ post, deletePostFunction }: Props) {
  const postedDaysAgo = daysAgo(post.createdAt);
  const [joined, setJoined] = useState(false);
  const [isAlreadyJoined, setIsAlreadyJoined] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const { session } = useAuth();

  const checkIsInGroup = () => {
    fetch(`http://localhost:3000/groups/${post?.group._id}/isUserInGroup`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + session,
      },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setIsAlreadyJoined(data ? true : false);
      })
      .catch(() => {
        alert('Error');
      });
  };

  const checkIsAdmin = () => {
    fetch(`http://localhost:3000/groups/${post?.group._id}/isAdmin`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + session,
      },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setIsAdmin(data ? true : false);
      })
      .catch(() => {
        alert('Error');
      });
  };

  const joinGroup = () => {
    fetch(`http://localhost:3000/groups/${post?.group._id}/users`, {
      method: 'POST',
      body: JSON.stringify({
        postId: post._id,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + session,
      },
    })
      .then(response => {
        return response.json().then(data => {
          if (data.error) {
            throw new Error(data.message);
          }
          console.log('response: ', response);

          if (!response.ok) {
            return Promise.reject(data);
          }
          return data;
        });
      })
      .then(() => {
        alert('Du har tilsluttet dig dette ensemble');
        setJoined(true);
      })
      .catch(() => {
        alert('Error');
      });
  };

  useEffect(() => {
    checkIsAdmin();
    checkIsInGroup();
  }, []);

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
          {isAlreadyJoined ? (
            <p>Du er allerede med i denne gruppe.</p>
          ) : joined ? (
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
          {isAdmin && (
            <>
              <Link
                to="/posts/edit/$postId"
                params={{ postId: post._id }}
                className={`${buttonStyles.button} ${buttonStyles.blue}`}
              >
                Opdater opslag
              </Link>
              <a
                className={`${buttonStyles.button} ${buttonStyles.red}`}
                onClick={() => deletePostFunction()}
              >
                Delete post
              </a>
            </>
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
