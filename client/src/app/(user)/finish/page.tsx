"use client"
import Button from '@/app/components/Button'
import Image from 'next/image'
import { redirect } from 'next/navigation'

const page = () => {
    return (

        <div className="relative flex grow items-center flex-col space-y-9 text-lg/4">
            <Image src="/images/regis_logo.png" alt="regis_logo" width={211} height={31} />
            <Image src="/images/p5/thank.png" alt="thank" width={392} height={258} />
            <Image src="/images/p5/regis_glass02.png" alt="regis_glass02" width={494} height={483} className='absolute -bottom-10' />
            <Button onClick={() => redirect("/") } text='HOME'/>
        </div>

    )
}

export default page