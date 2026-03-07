"use client"
import Image from 'next/image'
import { redirect } from 'next/navigation'

const page = () => {
    
    const redirectSelected = (param : string) => {
        redirect("/form/" + param)
    }
    return (
        <div className="relative grow flex flex-col items-center">
            <Image src="/images/p3/full_logo.png" alt="full_logo" width={250} height={249}  />
            <Image src="/images/regis_bubble.png" alt="regis_bubble" width={68} height={70} className='absolute top-[133px] left-[372px]'/>
            <Image src="/images/regis_bubble.png" alt="regis_bubble" width={104} height={108} className='absolute top-[495px] left-[55px]'/>
            <div className='absolute bottom-0 min-w-[425px] h-[50px] bg-[#DF5761]'>
                <div className='absolute left-0 bottom-7'>
                    <Image src="/images/p3/lip_close_left.png" alt="full_logo" width={173} height={173} />
                </div>
                <div className='absolute right-10 bottom-7 -rotate-12'>
                    <Image src="/images/p3/lip_open_right.png" alt="full_logo" width={80} height={160} />
                </div>
                <div className='absolute -right-10 bottom-7'>
                    <Image src="/images/p3/lip_close_right.png" alt="full_logo" width={173} height={173} />
                </div>
            </div>
            <div className='grid grid-cols-2 justify-items-center gap-y-2'>
                <Image src="/images/p3/winny_satang.png" alt="winny_satang" width={164} height={231} onClick={() => redirectSelected("1")} />
                <Image src="/images/p3/almond_progress.png" alt="almond_progress" width={199} height={231}  onClick={() => redirectSelected("2")}/>
                <Image src="/images/p3/daou.png" alt="daou" width={170} height={231} className='z-50 col-span-2'  onClick={() => redirectSelected("3")}/>
            </div>
        </div>
    )
}

export default page