import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCreateArticle } from '@/service/mutations'

const Editor = () => {
  const params = useParams()
  const navigate = useNavigate()

  const schema = Yup.object({
    title: Yup.string().required('title is required'),
    description: Yup.string(),
    body: Yup.string().required('body is required'),
    tagList: Yup.string()
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tagList: ['']
    },
    resolver: yupResolver(schema)
  })

  const { mutate, isLoading } = useCreateArticle()

  const onSubmit = data => {
    const newData = { ...data, tagList: data?.tagList?.split(',') }
    console.log('form data: ', newData)
    mutate(newData, {
      onSuccess: () => {
        navigate('/home') // 提交成功后跳转到首页
      }
    })
  }

  return (
    <div className='w-screen py-10'>
      <div className='container mx-auto flex flex-col'>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className='form-control'>
            <label htmlFor='title'>Title</label>
            <input type='text' className='form-input' {...register('title')} />
            <p className='form-error'>{errors.title?.message}</p>
          </div>

          <div className='form-control'>
            <label htmlFor='description'>Discription</label>
            <input type='text' className='form-input' {...register('description')} />
            <p className='form-error'>{errors.description?.message}</p>
          </div>

          <div className='form-control'>
            <label htmlFor='boy'>Content</label>
            <textarea className='form-textarea h-[240px]' {...register('body')}></textarea>
            <p className='form-error'>{errors.body?.message}</p>
          </div>

          <div className='form-control'>
            <label htmlFor='tagList'>Tags</label>
            <input type='text' className='form-input' {...register('tagList')} />
            <p className='form-error'>{errors.tagList?.message}</p>
          </div>

          <div className='form-control'>
            <button className='form-button' disabled={isLoading}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Editor
