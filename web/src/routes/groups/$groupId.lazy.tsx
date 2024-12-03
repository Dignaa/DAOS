import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import Section from '../../components/Section';
import buttonStyles from '../../components/buttonStyles.module.css';
import GroupOverview from '../../components/GroupPage';
import { Group } from '../../components/GroupPage';
import { useAuth } from '../../contexts/AuthContext';
import ConfirmModal from '../../components/Modal/Confirm.modal';

export const Route = createLazyFileRoute('/groups/$groupId')({
  component: GroupPage,
});

function GroupPage() {
  const { groupId } = Route.useParams();
  const [group, setGroup] = useState<Group>();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { session } = useAuth();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteGroup = () => {
    fetch(`${apiUrl}/groups/${groupId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + session,
      },
    })
      .then(() => {
        navigate({
          to: '/profile',
        });
      })
      .catch(error => {
        alert('Error: ' + error.message);
      });
  };

  const checkIsAdmin = () => {
    fetch(`${apiUrl}/groups/${groupId}/isAdmin`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + session,
      },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setIsAdmin(data.isAdmin ? true : false);
      })
      .catch(() => {
        alert('Error');
      });
  };

  useEffect(() => {
    checkIsAdmin();
    fetch(`${apiUrl}/groups/${groupId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.message);
        }
        setGroup(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [groupId]);

  if (loading)
    return (
      <Section>
        <h1>Henter ensemble</h1>
        <p>Vent venligst mens ensemble hentes fra databasen...</p>
      </Section>
    );

  if (!group)
    return (
      <Section>
        <h1>Ensemble ikke fundet</h1>
        <Link
          className={`${buttonStyles.button} ${buttonStyles.blue}`}
          to="/posts"
        >
          Find ensembles
        </Link>
      </Section>
    );
    const deletionMessage = `Are you sure you want to delete ${group.name}? ${
      group.posts && group.posts.length > 0
        ? `All related posts will be deleted also: ${group.posts.map((post) => post.title).join(', ')}.`
        : ''
    }`;
    
  return (
    <main>
      <Section>
        <GroupOverview group={group} deletePostFunction={openModal} isAdmin={isAdmin} />
        <ConfirmModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          onConfirm={() => { deleteGroup(); closeModal(); }} 
          message = { deletionMessage }
        />
      </Section>
    </main>
  );
}
