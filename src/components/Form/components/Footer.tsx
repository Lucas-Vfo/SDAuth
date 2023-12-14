import Link from 'next/link'

interface FooterProps {
  description: string
  textLink: string
  link: string
}

export function Footer ({ description, link, textLink }: FooterProps) {
  return (
    <div className='w-full flex justify-center mt-3'>
      <span className='mt-10 text-center text-sm text-gray-500'>
        {description}{' '}
        <Link href={link} className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>
          {textLink}
        </Link>
      </span>
    </div>
  )
}