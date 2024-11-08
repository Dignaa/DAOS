import { createLazyFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import Section from '../../components/Section';

interface Group {
  id: string;
  name: string;
  imageUrl: string;
}

interface User {
  email: string;
  name: string;
  phoneNumber?: string;
  avatarUrl?: string;
  description?: string;
  address?: string;
  seeking?: boolean;
  groups?: Group[];
  lastLoggedIn: string;
  instruments: [];
  createdAt: string;
}

export const Route = createLazyFileRoute('/users/$userId')({
  component: UserPage,
});

function UserPage() {
  const { userId } = Route.useParams();

  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");
 useEffect(() => {
    fetch(`http://localhost:3000/users/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          throw new Error(data.message);
        }
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [userId, token]);

  if (loading)
    return (
      <Section>
        <h1>Something, I guess its loading</h1>
      </Section>
    );

  return (
    <main>
      <Section>
        <h1>User Details</h1>
        <ul>
          {user && (
            <li>
              <div>
                <strong>Name:</strong> {user.name}
              </div>
              <div>
                <strong>Email:</strong> {user.email}
              </div>
              <div>
                <strong>Phone Number:</strong> {user.phoneNumber || 'N/A'}
              </div>
              <div>
                <strong>Avatar:</strong>{' '}
                <img src={user.avatarUrl} alt="User Avatar" />
              </div>
              <div>
                <strong>Description:</strong>{' '}
                {user.description || 'No description provided'}
              </div>
              <div>
                <strong>Address:</strong>{' '}
                {user.address || 'No address provided'}
              </div>
              <div>
                <strong>Seeking:</strong> {user.seeking ? 'Yes' : 'No'}
              </div>
              <div>
                <strong>Last Logged In:</strong>{' '}
                {user.lastLoggedIn ? user.lastLoggedIn : 'N/A'}
              </div>
              <div>
                <strong>Created At:</strong>{' '}
                {user.createdAt ? user.createdAt : 'N/A'}
              </div>
              <div>
                <strong>Instruments:</strong>{' '}
                {user.instruments ? user.instruments.join(', ') : 'N/A'}
              </div>

              {/* Render Groups */}
              <div>
                <strong>Groups:</strong>
                <ul>
                  {user.groups && user.groups.length > 0 ? (
                    user.groups.map(group => (
                      <li key={group.id}>
                        <div>
                          <strong>{group.name}</strong>
                        </div>
                        <div>
                          <img
                            src={group.imageUrl}
                            alt={`${group.name} Group Image`}
                            width={50}
                          />
                        </div>
                      </li>
                    ))
                  ) : (
                    <div>No groups available</div>
                  )}
                </ul>
              </div>
            </li>
          )}
        </ul>
      </Section>
    </main>
  );
}
