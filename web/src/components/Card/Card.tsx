import { Link } from '@tanstack/react-router';
import styles from './Card.module.css';
import CardContent from './CardContent';
import CardHeader from './CardHeader';

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

// Union type for Card component's props
type CardProps = PostProps | UserProps;

// Type guard function to check if props are PostProps
function isPostProps(props: CardProps): props is PostProps {
  // Check for properties unique to PostProps
  return 'title' in props && 'instrument' in props;
}

// Card component definition
export default function Card(props: CardProps) {
  return (
    <li className={styles.card}>
      <Link
        to={isPostProps(props) ? `/posts/$postId` : `/users/$userId`}
        params={{ postId: props._id, userId: props._id }}>

        <CardHeader
          name={isPostProps(props) ? props.group.name : props.name}
          address={isPostProps(props) ? props.group.address : props.address}
          info={isPostProps(props) ? props.group.noOfActiveMembers : undefined}
          image={isPostProps(props) ? props.group.imageUrl : props.avatarUrl}
        />
        <CardContent
          title={isPostProps(props) ? props.title : undefined}
          instruments={
            isPostProps(props) ? props.instrument : props.instruments
          }
        />
      </Link>
    </li>
  );
}
