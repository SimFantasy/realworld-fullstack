import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import cx from 'clsx'
import { useAuth } from '@/hooks'
import { useRegister } from '@/service/mutations'
import { ErrorMessage } from '@/components'

const Register = () => {
  const navigate = useNavigate()
  const login = useAuth(state => state.login)

  const schema = Yup.object({
    username: Yup.string()
      .min(3, 'Please enter a minimum of 3 characters')
      .max(24, 'Please enter up to 24 characters')
      .required('username is required'),
    email: Yup.string()
      .email('Please enter the correct email format')
      .required('email is required'),
    password: Yup.string()
      .min(6, 'Password requires at least 6 characters')
      .required('password is required')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  })

  const { mutate, isError, error } = useRegister()

  const onSubmit = data => {
    mutate(data, {
      onSuccess: data => {
        login(data)
        navigate('/home')
      }
    })
  }

  return (
    <div className='w-full'>
      <div className='container py-10'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-2 mx-auto w-[480px]'
          noValidate
        >
          {isError && <ErrorMessage errorMsg={error} />}
          <div className='form-control'>
            <input
              type='text'
              placeholder='Username'
              className={cx('form-input', { 'input-error': errors.username })}
              {...register('username')}
            />
            <p className='form-error'>{errors.username?.message}</p>
          </div>

          <div className='form-control'>
            <input
              type='text'
              placeholder='Email'
              className={cx('form-input', { 'input-error': errors.email })}
              {...register('email')}
            />
            <p className='form-error'>{errors.email?.message}</p>
          </div>

          <div className='form-control'>
            <input
              type='password'
              placeholder='Password'
              className={cx('form-input', { 'input-error': errors.password })}
              {...register('password')}
            />
            <p className='form-error'>{errors.password?.message}</p>
          </div>

          <div className='form-control'>
            <button className='form-button w-full'>Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
