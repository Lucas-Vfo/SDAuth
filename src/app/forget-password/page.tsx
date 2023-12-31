'use client'

import { Form } from '@/components/Form'
import { useAuthFetch } from '@/hooks/useAuthFetch'
import { useLoading } from '@/hooks/useLoading'

export default function ForgetPasswordPage () {
  const { finishLoading, isLoading, startLoading } = useLoading()
  const authFetch = useAuthFetch()

  const forgetPassword = async (formData: any) => {
    startLoading()
    await authFetch({
      endpoint: 'forget-password',
      formData
    })
    finishLoading()
  }

  return (
    <>
      <Form
        title='Recuperar contraseña'
        onSubmit={forgetPassword}
      >
        <div className='my-[10px] flex flex-col gap-4'>
          <Form.Input
            label='Correo'
            name='email'
            placeholder='correo@example.com'
          />
        </div>
        <Form.SubmitButton
          buttonText='Recuperar Contraseña'
          isLoading={isLoading}
        />
        <Form.Footer
          description='Volver al inicio'
          textLink='Inicio'
          link='/'
        />
      </Form>
    </>
  )
}