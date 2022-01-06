import { User } from './models/User';
import { UserList } from './views/UserList';

const userCollection = User.buildUserCollection();

userCollection.fetch();

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

new UserList(userCollection, root);
