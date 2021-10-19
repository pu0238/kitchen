import { User } from 'src/user/user.entity';

const user: User = {
  id: 1,
  username: 'username',
  email: 'email@email.email',
  password: 'password',
};

export const mockUserService = {
  findsdsOne: jest.fn(({ ...any }) => {
    for (const key in any) {
      if (user[key] == any[key]) {
        return user;
      }
    }
    return undefined;
  }),
  findOne: jest.fn(({ ...searched }) => {
    const userToString = JSON.stringify(user)
    const userWithSearched = JSON.stringify({...user, ...searched})
    if (userToString == userWithSearched) {
      return user;
    }
    return undefined;
  }),
  insert: jest.fn().mockReturnValue(user),
};
