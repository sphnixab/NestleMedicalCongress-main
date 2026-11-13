import {
  forgotPasswordSchema,
  loginSchema,
  questionSchema,
  registerSchema,
} from '../../src/utils/validationUtils';

describe('loginSchema', () => {
  it('accepts valid credentials', async () => {
    await expect(loginSchema.isValid({ email: 'a@b.com', password: 'secret' })).resolves.toBe(true);
  });

  it('rejects an invalid email', async () => {
    await expect(loginSchema.isValid({ email: 'nope', password: 'secret' })).resolves.toBe(false);
  });

  it('requires a password', async () => {
    await expect(loginSchema.isValid({ email: 'a@b.com', password: '' })).resolves.toBe(false);
  });
});

describe('registerSchema', () => {
  const valid = {
    fullName: 'Basit Najar',
    email: 'basit@gmail.com',
    organization: 'Dubai Clinic',
    password: 'Basit@2026',
    acceptedTerms: true,
  };

  it('accepts a complete form', async () => {
    await expect(registerSchema.isValid(valid)).resolves.toBe(true);
  });

  it('rejects weak passwords', async () => {
    await expect(registerSchema.isValid({ ...valid, password: 'short' })).resolves.toBe(false);
    await expect(registerSchema.isValid({ ...valid, password: 'alllowercase1' })).resolves.toBe(false);
  });

  it('requires the terms checkbox', async () => {
    await expect(registerSchema.isValid({ ...valid, acceptedTerms: false })).resolves.toBe(false);
  });
});

describe('forgotPasswordSchema and questionSchema', () => {
  it('validates the reset email', async () => {
    await expect(forgotPasswordSchema.isValid({ email: 'x@y.org' })).resolves.toBe(true);
    await expect(forgotPasswordSchema.isValid({ email: '' })).resolves.toBe(false);
  });

  it('enforces question length', async () => {
    await expect(questionSchema.isValid({ text: 'too short' })).resolves.toBe(false);
    await expect(questionSchema.isValid({ text: 'How is personalised nutrition applied?' })).resolves.toBe(true);
    await expect(questionSchema.isValid({ text: 'x'.repeat(300) })).resolves.toBe(false);
  });
});
