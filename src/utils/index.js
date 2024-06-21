export const userRegistrationFormControls = [
  {
    name: 'userName',
    label: 'User Name',
    placeholder: 'Enter username',
    componentType: 'input',
    type: 'input'
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter email',
    componentType: 'input',
    type: 'email'
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter password',
    componentType: 'input',
    type: 'password'
  }
]

export const initialSignUpFormData={
  userName:'',
  email:'',
  password:''
}

export const userLoginFormControls = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter email',
    componentType: 'input',
    type: 'email'
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter password',
    componentType: 'input',
    type: 'password'
  }
]

export const initialLoginFormData={
  email:'',
  password:''
}