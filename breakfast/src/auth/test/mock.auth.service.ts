export const mockAuthService = {
  logIn: jest.fn().mockReturnValue({
    accessToken: 'token',
  }),
  singIn: jest.fn(() => {
    return mockAuthService.logIn();
  }),
  validateUser: jest.fn(async (usernameOrEmail: string, passwd: string) => {
    if ("P@ssw0rd" === passwd) {
      return {};
    }
    return null;
  }),
  validatePassword: jest.fn((password: string) => {
    const re =
      /^(?=.*[0-9])(?=.*[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[a-zA-Z0-9 `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]{6,32}$/;
    return re.test(password);
  }),
};
