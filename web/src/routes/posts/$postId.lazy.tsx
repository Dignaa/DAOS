import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import Section from '../../components/Section';
import PostOverview from '../../components/Post/PostOverview';
import buttonStyles from '../../components/buttonStyles.module.css';
import { useAuth } from '../../contexts/AuthContext';
import ConfirmModal from '../../components/Modal/Confirm.modal';

interface Group {
  _id: string;
  address: string;
  imageUrl: string;
  name: string;
  noOfActiveMembers: number;
}

interface Post {
  _id: string;
  __v: number;
  createdAt: string;
  date: string;
  description: string;
  group: Group;
  instrument: string;
  title: string;
}

export const Route = createLazyFileRoute('/posts/$postId')({
  component: PostPage,
});

function PostPage() {
  const { postId } = Route.useParams();

  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { session } = useAuth();
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deletePost = () => {
    fetch(`${apiUrl}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + session,
      },
    })
      .then(() => {
        navigate({
          to: '/posts',
        });
      })
      .catch(error => {
        alert('Error: ' + error.message);
      });
  };
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';


  useEffect(() => {
    fetch(`${apiUrl}/posts/${postId}`, {
      headers: { Authorization: 'Bearer ' + session },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          throw new Error(data.message);
        }
        setPost(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Section>
        <h1>Henter opslag</h1>
        <p>Vent venligst mens opslaget hentes fra databasen...</p>
      </Section>
    );
  }
  if (!post)
    return (
      <Section>
        <h1>Opslag ikke fundet</h1>
        <Link
          className={`${buttonStyles.button} ${buttonStyles.blue}`}
          to="/posts"
        >
          Se alle opslag
        </Link>
      </Section>
    );

    const deletionMessage = `Are you sure you want to delete ${post.title}`;

  return (
    <main>
      <Section>
      <PostOverview post={post} deletePostFunction={openModal} />
        <ConfirmModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          onConfirm={() => { deletePost(); closeModal(); }} 
          message = { deletionMessage }
        />
      </Section>
    </main>
  );
}
