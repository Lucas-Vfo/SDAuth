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
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Ingrese a su cuenta</h1>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6'>
            <div>
              <label htmlFor='username' className='block text-sm font-medium leading-6 text-gray-900'>
                Correo Electrónico
              </label>
              <div className='flex'>
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                <input
                  id='username'
                  name='username'
                  type='email'
                  autoComplete='username'
                  required
                  placeholder="correo@example.com"
                  className=' w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                />
              </div>
            </div>
          

            <div>
              <div className='flex items-center justify-between'>
                <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
                  Contraseña
                </label>
                <div className='text-sm'>
                  <Link href='/recovery' className='font-semibold text-indigo-600 hover:text-indigo-500'>
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>
              <div className='flex'>
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  placeholder= "************"
                  className='w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold'
              >
                Identificate
              </button>
            </div>
            <hr className="my-6 border-gray-300 w-full"></hr>
            {/* <div>
              <button 
                type="submit" 
                className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
                >
                  <div 
                  className="flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" className="w-6 h-6" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg>
                    <span className="ml-4">
                      Log in
                      with
                      Google
                    </span>
                  </div>
                </button>
            </div> */}
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            ¿Aun no eres miembro?{' '}
            <Link href='/register' className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>
              
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}