export const commonFields = [
  {
    label: "Email",
    name: "email" as const,
    required: true,
    type: "email",
    placeholder: "Email"
  },
  {
    label: "Password",
    name: "password" as const,
    required: true,
    type: "password",
    placeholder: "Password"
  }
]

const registerConfig = {
  linkUrl: "/signin",
  linkText: "Sign In",
  alternateCaseText: "Already have a account?",
  header: "Create a new account",
  subheader: "Just a few things to get started",
  buttonText: "Register"
}

const signinConfig = {
  linkUrl: "/register",
  linkText: "Create account",
  alternateCaseText: "New here?",
  header: "Welcome Back",
  subheader: "Enter your credentials to access your account",
  buttonText: "Sign In"
}

export const configMap = {
  signin: signinConfig,
  register: registerConfig
}
