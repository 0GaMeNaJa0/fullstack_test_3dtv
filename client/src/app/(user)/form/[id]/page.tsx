'use client'
import { useForm } from "react-hook-form";
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Button from '@/app/components/Button'

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  registerAt: string;
  zoneId: number;
  isFanZone: boolean;
  createdAt: string;
  isAccepted: boolean;
}

const Page = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      zoneId: Number(params?.id ?? 0),
      registerAt: new Date().toLocaleString("sv-SE", { timeZone: "Asia/Bangkok", }).replace("T", " "),
      createdAt: new Date().toLocaleString("sv-SE", { timeZone: "Asia/Bangkok", }).replace("T", " "),
      isFanZone: false,
      isAccepted: false
    }
  });

  const onSubmit = async (data: FormData) => {
    const payload: FormData = { ...data };


    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok && res.status === 201) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/sendEmail`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              "email": payload.email
            })
          });
          if (res.ok && res.status === 200) {
            router.push('/finish');
          }
        } catch (err) {
          console.error('network or other error', err);
        }

      } else {
        console.error('request failed', await res.text());
      }
    } catch (err) {
      console.error('network or other error', err);
    }
  };

  return (
    <div className="relative flex grow items-center flex-col space-y-6 text-lg/4 max-xs:text-base/4">
      <Image src="/images/regis_logo.png" alt="regis_logo" width={211} height={31} />
      <form className='w-full space-y-3 px-4' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p className='text-3xl max-xs:text-xl font-bold'>FIRST NAME*(ENGLISH)</p>
          <input
            type="text"
            className='border-[#DF5761] border-2 px-4 py-2 w-full rounded-2xl bg-white'
            {...register("firstName", { required: true, maxLength: 80 })}
          />
          {errors.firstName?.type === 'required' && <p className="mt-1 text-red-500 font-bold">กรุณากรอกชื่อจริง</p>}
          {errors.firstName?.type === 'maxLength' && <p className="mt-1 text-red-500 font-bold">ชื่อยาวเกินไป (สูงสุด 80 ตัวอักษร)</p>}
        </div>

        <div>
          <p className='text-3xl max-xs:text-xl font-bold'>LAST NAME*(ENGLISH)</p>
          <input
            type="text"
            className='border-[#DF5761] border-2 px-4 py-2 w-full rounded-2xl bg-white'
            {...register("lastName", { required: true, maxLength: 80 })}
          />
          {errors.lastName?.type === 'required' && <p className="mt-1 text-red-500 font-bold">กรุณากรอกนามสกุล</p>}
          {errors.lastName?.type === 'maxLength' && <p className="mt-1 text-red-500 font-bold">นามสกุลยาวเกินไป (สูงสุด 80 ตัวอักษร)</p>}
        </div>

        <div>
          <p className='text-3xl max-xs:text-xl font-bold'>EMAIL ADDRESS*</p>
          <input
            type="email"
            className='border-[#DF5761] border-2 px-4 py-2 w-full rounded-2xl bg-white'
            {...register("email", {
              required: true,
              pattern: {
                value: /^\S+@\S+\.\S+$/i,
                message: 'รูปแบบอีเมลไม่ถูกต้อง'
              }
            })}
          />
          {errors.email?.type === 'required' && <p className="mt-1 text-red-500 font-bold">กรุณากรอกอีเมล</p>}
          {errors.email?.type === 'pattern' && <p className="mt-1 text-red-500 font-bold">{errors.email.message || 'รูปแบบอีเมลไม่ถูกต้อง'}</p>}
        </div>

        <div>
          <p className='text-3xl max-xs:text-xl font-bold'>PHONE NUMBER*</p>
          <input
            type="text"
            inputMode="numeric"
            className='border-[#DF5761] border-2 px-4 py-2 w-full rounded-2xl bg-white'
            {...register("phone", {
              required: true,
              pattern: {
                value: /^[0-9]{6,12}$/,
                message: 'หมายเลขโทรศัพท์ต้องเป็นตัวเลข 6-12 หลัก'
              }
            })}
          />
          {errors.phone?.type === 'required' && <p className="mt-1 text-red-500 font-bold">กรุณากรอกเบอร์โทรศัพท์</p>}
          {errors.phone?.type === 'pattern' && <p className="mt-1 text-red-500 font-bold">{errors.phone.message}</p>}
        </div>

        <p className='indent-8'>*ไม่สามารถโอนสิทธิ์ให้ผู้อื่นได้ไม่ว่าในกรณีใด โดยผู้เข้าร่วมงาน
          จะต้องมีชื่อ-นามสกุล (ภาษาอังกฤษ) ตรงกับข้อมูลที่ลงทะเบียนไว้
          และต้องตรงกับเอกสารที่ออกโดยราชการที่นำมายืนยันตัวตน
          หน้างานเท่านั้น</p>

        <div className="flex justify-center items-center gap-5 m-0">
          <input
            type="checkbox"
            id="checkbox"
            className="h-10 w-10 accent-[#DD7B7E]"
            {...register("isAccepted", { required: true })}
          />
          <p className="text-[#E05862]">ข้าพเจ้าได้อ่านและยินยอมตามเงื่อนไขทั้งหมด</p>
        </div>

        {errors.isAccepted && <p className="text-red-500 text-center mt-1">กรุณาตกลงและยินยอมตามข้อกำหนดและเงื่อนไขของกิจกรรมนี้</p>}

        <Button text="SUBMIT" type="submit" />
      </form>
    </div>
  )
}

export default Page