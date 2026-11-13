import * as yup from 'yup';
import { strings } from '../constants/strings';

const email = yup
  .string()
  .trim()
  .required(strings.validation.emailRequired)
  .email(strings.validation.emailInvalid);

const strongPassword = yup
  .string()
  .required(strings.validation.passwordRequired)
  .min(8, strings.validation.passwordMin)
  .matches(/^(?=.*[A-Z])(?=.*\d).+$/, strings.validation.passwordRules);

export const loginSchema = yup.object({
  email,
  password: yup.string().required(strings.validation.passwordRequired),
});

export const registerSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required(strings.validation.nameRequired)
    .min(3, strings.validation.nameShort),
  email,
  organization: yup.string().trim().required(strings.validation.orgRequired),
  password: strongPassword,
  acceptedTerms: yup.boolean().required().isTrue(strings.validation.termsRequired),
});

export const forgotPasswordSchema = yup.object({ email });

export const questionSchema = yup.object({
  text: yup
    .string()
    .trim()
    .required(strings.validation.questionRequired)
    .min(10, strings.validation.questionShort)
    .max(280, strings.validation.questionLong),
});

export const editProfileSchema = yup.object({
  fullName: yup.string().trim().required(strings.validation.nameRequired),
  designation: yup.string().trim().required(strings.validation.nameRequired),
  phone: yup
    .string()
    .trim()
    .matches(/^[+\d\s()-]{7,20}$/, strings.validation.phoneInvalid)
    .required(strings.validation.phoneInvalid),
  location: yup.string().trim().required(strings.validation.nameRequired),
});

export type LoginForm = yup.InferType<typeof loginSchema>;
export type RegisterForm = Omit<yup.InferType<typeof registerSchema>, 'acceptedTerms'> & {
  acceptedTerms: boolean;
};
export type ForgotPasswordForm = yup.InferType<typeof forgotPasswordSchema>;
export type QuestionForm = yup.InferType<typeof questionSchema>;
export type EditProfileForm = yup.InferType<typeof editProfileSchema>;
