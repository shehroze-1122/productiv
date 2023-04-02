type ValidationTypes =
  | "LOWERCASE_LETTER"
  | "UPPERCASE_LETTER"
  | "8_TO_20_CHARACTERS"
  | "NUMBER"
  | "ALL"

export const validatePassword = (type: ValidationTypes, password: string) => {
  switch (type) {
    case "LOWERCASE_LETTER":
      return /[a-z]/g.test(password)
    case "UPPERCASE_LETTER":
      return /[A-Z]/g.test(password)
    case "NUMBER":
      return /[0-9]/g.test(password)
    case "8_TO_20_CHARACTERS":
      return password.length > 7 && password.length <= 20
    case "ALL":
      return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/g.test(password)
    default:
      return false
  }
}

type Validations = {
  type: ValidationTypes
  description: string
}
export const validations: Validations[] = [
  {
    type: "LOWERCASE_LETTER",
    description: "A lowercase letter"
  },
  {
    type: "UPPERCASE_LETTER",
    description: "A uppercase letter"
  },
  {
    type: "NUMBER",
    description: "A number"
  },
  {
    type: "8_TO_20_CHARACTERS",
    description: "8 to 20 characters long"
  }
]
