import { user } from './user.template';

export const mockUserService = {
  findOne: jest.fn(({ ...searched }) => {
    const userToString = JSON.stringify(user);
    const userWithSearched = JSON.stringify({ ...user, ...searched });
    if (userToString == userWithSearched) {
      return user;
    }
    return undefined;
  }),
  insert: jest.fn().mockReturnValue(user),
};
