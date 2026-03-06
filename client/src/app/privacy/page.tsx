"use client"
import Image from "next/image"
import { redirect } from "next/navigation"
import Button from "../components/Button"
import { useState } from "react"

const page = () => {
    
    const [checked, setCheck] = useState(false);
    const [pass, setPass] = useState(true);

    const validateCheck = () => {
        if(checked){
            redirect("/select")
        }else{
            setPass(false)
        }
        
    }
    return (
        <div className="relative flex grow items-center flex-col space-y-9 text-lg/4">
            <Image src="/images/regis_logo.png" alt="regis_logo" width={211} height={31} />
            <Image src="/images/p2/privacy.png" alt="regis_logo" width={353} height={507} />
            <div className="text-black max-w-[290px] absolute top-35 font-medium">
                <p className="indent-8">     ท่านจะต้องมีอายุไม่ต่ำกว่า 16 ปีเพื่อเข้าร่วมกิจกรรมนี้
                    MAYBELLINE NEW YORK จะดำเนินการประมวลผลข้อมูล ส่วนบุคคลของท่านรวมถึง ชื่อ-นามสกุล และช่องทางการติดต่อ ของท่าน เพื่อเข้าร่วมกิจกรรม “BOBA BOOST SQUARE”
                    โดย MAYBELLINE NEW YORK จะเก็บรักษาข้อมูลส่วนบุคคล ของท่านตราบเท่าที่จำเป็นเพื่อวัตถุประสงค์ดังกล่าวข้างต้น
                    หรือตามที่กฎหมายกำหนด
                </p>
                <p className="indent-8">
                    ทั้งนี้ MAYBELLINE NEW YORK อาจเปิดเผยข้อมูล ส่วนบุคคลของท่านแก่พันธมิตร หรือผู้ให้บริการที่ได้รับการว่าจ้าง เพื่อสนับสนุนวัตถุประสงค์ดังกล่าวข้างต้น
                    ท่านสามารถศึกษาข้อมูลเพิ่มเติมเกี่ยวกับการใช้ข้อมูล ส่วนบุคคลของท่านได้ที่ นโยบายความเป็นส่วนตัว (PRIVACY
                </p>
                <p className="indent-8">
                    POLICY) ของเรา หรือติดต่อผ่านทาง THDPO@LOREAL.COM ในกรณีที่ท่านมีข้อสงสัยหรือต้องการใช้สิทธิทางกฎหมายเพิ่มเติม
                    MAYBELLINE NEW YORK แบรนด์ภายใต้การดูแลของ
                    บริษัท ลอรีอัล (ประเทศไทย) จำกัด
                </p>
                <p className="indent-8 my-5">*ไม่สามารถโอนสิทธิ์ให้ผู้อื่นได้ไม่ว่าในกรณีใด โดยผู้เข้าร่วมงาน
                    จะต้องมีชื่อ-นามสกุล (ภาษาอังกฤษ) ตรงกับข้อมูลที่ลงทะเบียนไว้
                    และต้องตรงกับเอกสารที่ออกโดยราชการที่นำมายืนยันตัวตน
                    หน้างานเท่านั้น
                </p>
                <div className="flex justify-center items-center gap-5">
                    <input type="checkbox" checked={checked} id="checkbox" className="h-10 w-10 accent-[#DD7B7E]" onChange={() => setCheck(!checked)} />
                    <p className="text-[#E05862]">ข้าพเจ้าตกลงและยินยอมตามข้อกำหนด <br />และเงื่อนไขของกิจกรรมนี้</p>
                </div>
                <p className={`${pass ? 'hidden' : 'block'} text-red-500 mt-2`}>กรุณาตกลงและยินยอมตามข้อกำหนดและเงื่อนไขของกิจกรรมนี้</p>
            </div>

            <Button onClick={validateCheck} text="ACCEPT" />

        </div>

    )
}

export default page