'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Head from 'next/head';
import { Form } from '@/components/Form'
import { useAuthFetch } from '@/hooks/useAuthFetch'
import { useLoading } from '@/hooks/useLoading'

export default function LoginPage () {
  const { finishLoading, isLoading, startLoading } = useLoading()
  const authFetch = useAuthFetch()

  const login = async (formData: any) => {
    startLoading()
    await authFetch({
      endpoint: 'login',
      redirectRoute: '/home',
      formData
    })
    finishLoading()
  }

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <Form
        title='Inicia Sesión'
        onSubmit={login}
      >
        <div className='my-[10px] flex flex-col gap-4'>
          <Form.Input
            label='Correo'
            name='email'
            placeholder='correo@example.com'
          />
          <Form.Input
            placeholder='************'
            label='Contraseña'
            name='password'
            type='password'
          />
          <Form.Footer
          description=''
          link='/forget-password'
          textLink='¿Olvidaste tu contraseña?'
        />
        </div>
        <Form.SubmitButton buttonText='Iniciar Sesión' isLoading={isLoading} />
        <Form.Footer
          description='¿Aun no tienes cuenta?'
          link='/register'
          textLink='Regístrate Gratis'
        />
      </Form>
        
        <hr className="my-6 border-gray-300 w-full"></hr>
            
        </div>
      </div>
    </>
  )
}