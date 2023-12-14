'use client'

import { Form } from '@/components/Form'
import { useAuthFetch } from '@/hooks/useAuthFetch'
import { useLoading } from '@/hooks/useLoading'

export default function LoginPage () {
  const { finishLoading, isLoading, startLoading } = useLoading()
  const authFetch = useAuthFetch()

  const register = async (formData: any) => {
    startLoading()
    await authFetch({
      endpoint: 'register',
      redirectRoute: '/home',
      formData
    })
    finishLoading()
  }

  return (
    <>
      <Form
        title='Registrate'
        onSubmit={register}
      >
        <div className='my-[10px] flex flex-col gap-4'>
          <Form.Input
            label='Correo'
            name='email'
            placeholder='correo@example.com'
          />
          <Form.Input
            placeholder="************"
            label='Contraseña'
            name='password'
            type='password'
          />
          <Form.Input
            placeholder="************"
            label='Contraseña'
            name='confirmPassword'
            type='password'
          />
        </div>
        <Form.SubmitButton buttonText='Crear cuenta' isLoading={isLoading} />
        <Form.Footer
          description='¿Ya tienes cuenta?'
          textLink='Inicia Sesión'
          link='/'
        />
      </Form>
    </>
  )
}