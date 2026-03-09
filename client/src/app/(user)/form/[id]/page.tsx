'use client'
import { useForm } from "react-hook-form";
import { redirect, useParams } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'
import Button from '@/app/components/Button'

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    registerAt: Date;
    zoneId: number;
    isFanZone: boolean;
    isSendEmail: boolean;
    createdAt: Date;
}
const page = () => {


    const params = useParams<{ id: string }>();
    const { register, handleSubmit } = useForm<FormData>();
    const [checked, setCheck] = useState(false);
    const [pass, setPass] = useState(true);
    const [form, setForm] = useState<FormData>({
        "firstName": "",
        "lastName": "",
        "phone": "",
        "email": "",
        "registerAt": new Date(),
        "zoneId": Number(params.id),
        "isFanZone": false,
        "isSendEmail": false,
        "createdAt": new Date()
    });

    const onSubmit = (data: FormData) => {
        if (checked) {
           setForm(prev => ({ ...prev, ...data }));
           console.log(form);
    //    redirect("/select")
        } else {
            setPass(false);
        }

    };

    return (
        <div className="relative flex grow items-center flex-col space-y-9 text-lg/4">
            <Image src="/images/regis_logo.png" alt="regis_logo" width={211} height={31} />
            <form action="" className='w-full space-y-5 px-4' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <p className='text-3xl font-bold'>FIRST NAME*(ENGLISH)</p>
                    <input type="text" className='border-[#DF5761] border-2 px-4 py-2 w-full rounded-2xl bg-white' {...register("firstName")} />
                </div>
                <div>
                    <p className='text-3xl font-bold'>LAST NAME*(ENGLISH)</p>
                    <input type="text" className='border-[#DF5761] border-2 px-4 py-2 w-full rounded-2xl bg-white' {...register("lastName")} />
                </div>
                <div>
                    <p className='text-3xl font-bold'>EMAIL ADDRESS*</p>
                    <input type="text" className='border-[#DF5761] border-2 px-4 py-2 w-full rounded-2xl bg-white' {...register("email")} />
                </div>
                <div>
                    <p className='text-3xl font-bold'>PHONE NUMBER*</p>
                    <input type="text" className='border-[#DF5761] border-2 px-4 py-2 w-full rounded-2xl bg-white' {...register("phone")} />
                </div>

                <p className='indent-8'>*ไม่สามารถโอนสิทธิ์ให้ผู้อื่นได้ไม่ว่าในกรณีใด โดยผู้เข้าร่วมงาน
                    จะต้องมีชื่อ-นามสกุล (ภาษาอังกฤษ) ตรงกับข้อมูลที่ลงทะเบียนไว้
                    และต้องตรงกับเอกสารที่ออกโดยราชการที่นำมายืนยันตัวตน
                    หน้างานเท่านั้น</p>

                <div className="flex justify-center items-center gap-5 m-0">
                    <input type="checkbox" checked={checked} id="checkbox" className="h-10 w-10 accent-[#DD7B7E]" onChange={() => setCheck(!checked)} />
                    <p className="text-[#E05862]">ข้าพเจ้าได้อ่านและยินยอมตามเงื่อนไขทั้งหมด</p>
                </div>

                <p className={`${pass ? 'hidden' : 'block text-center mt-1'} text-red-500 `}>กรุณาตกลงและยินยอมตามข้อกำหนดและเงื่อนไขของกิจกรรมนี้</p>

                <Button text="SUBMIT" type="submit" />

            </form>


        </div>
    )
}

export default page