export const mockAuthService = {
  logIn: jest.fn().mockReturnValue({
    accessToken: 'token',
  }),
  singIn: jest.fn(() => {
    return mockAuthService.logIn();
  }),
  validateUser: jest.fn(async (usernameOrEmail: string, passwd: string) => {
    if ("password" === passwd) {
      return {};
    }
    return null;
  }),
};
