"use client"
import Image from "next/image";
import Button from "../components/Button";
import { redirect } from "next/navigation";


export default function Home() {

  const handlePrivacy = () => {
    redirect("/privacy");
  }
  
  return ( 
    <div className="relative grow ">
      <Image src="/images/p1/bubble_01.png" alt="bubble_01" width={154} height={160} className="absolute top-[600px] -left-[100px]" />
      <Image src="/images/p1/bubble_02.png" alt="bubble_02" width={78} height={80} className="absolute top-[286px] left-[26px]" />
      <Image src="/images/p1/bubble_03.png" alt="bubble_03" width={141} height={146} className="absolute top-[600px] left-[369px]"/>
      <Image src="/images/p1/bubble_04.png" alt="bubble_04" width={112} height={116} className="absolute -top-[14px] left-[363px]"/>
      <div className="w-full flex flex-col items-center">
        <Image src="/images/full_logo.png" alt="full_logo" width={300} height={200} />
        <Image src="/images/date.png" alt="date" width={300} height={60} />
      </div>
      <Image
        src="/images/p1/bg_02_vertical_glass.png"
        alt="bg_02_vertical_glass"
        width={400}
        height={600}
        priority={false}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-90 "
      />
      <Button onClick={handlePrivacy} text={"REGISTER"}/>
    </div>
  );
}