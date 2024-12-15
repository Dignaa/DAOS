import styles from './Grid.module.css';
import Card from './Card/Card';

interface PostGridProps {
  cards: PostProps[] | UserProps[]; // Expecting an array of either PostProps or UserProps
  id?: string;
}

// PostProps interface for Post data type
interface PostProps {
  _id: string;
  createdAt: string;
  description: string;
  group: {
    _id: string;
    address: string;
    name: string;
    noOfActiveMembers: number;
    groupId: string;
    imageUrl?: string;
  };
  instrument: string;
  title: string;
  updatedAt: string;
}

// UserProps interface for User data type
interface UserProps {
  _id: string;
  address?: string;
  avatarUrl?: string;
  createdAt?: string;
  description?: string;
  email?: string;
  groups?: {
    id: string;
    name: string;
    imageUrl: string;
  }[];
  instruments?: string[];
  lastLoggedIn?: string;
  name?: string;
  phoneNumber?: string;
  seeking?: boolean;
}

export default function Grid({ cards, id }: PostGridProps) {
  // Guard clause to ensure cards are valid
  if (!cards || cards.length === 0) {
    return <p>Ingen resultater</p>;
  }

  return (
    <ul className={styles.grid} id={id}>
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </ul>
  );
}
