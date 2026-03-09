"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  registerAt: Date;
  zoneName: string;
  isFanZone: boolean;
  isSendEmail: boolean;
  createdAt: Date;
}

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:" + process.env.NEXT_PUBLIC_SERVER_PORT + "/users"
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const result = await res.json();

        const parsed: User[] = (result || []).map((r: any) => ({
          userId: r.userId,
          firstName: r.firstName,
          lastName: r.lastName,
          email: r.email,
          phone: r.phone,
          registerAt: r.registerAt ? new Date(r.registerAt) : null,
          zoneName: r.zoneName,
          isFanZone: Boolean(r.isFanZone),
          isSendEmail: Boolean(r.isSendEmail),
          createdAt: r.createdAt ? new Date(r.createdAt) : null,
        }));

        setUsers(parsed);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setUsers([]);
      }
    };

    fetchData();
  }, []);

  const renderDateTime = (date: Date | null) => {
    if (!date) return "-";

    const datePart = new Intl.DateTimeFormat("th-TH", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);

    const timePart = new Intl.DateTimeFormat("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);

    return `${datePart} | ${timePart}`;
  };

  const renderPhone = (phone: string) => phone.substring(0, 3) + "-" + phone.substring(3, 6) + "-" + phone.substring(6);

  return (
    <div className="space-y-5 bg-[#F9F3F3] text-lg min-h-screen">
      <div className="w-full bg-[#DF5761] flex justify-between items-center font-semibold text-white px-6">
        <p className=" text-4xl">ผู้ลงทะเบียน</p>
        <div className="flex justify-center items-center gap-x-2">
          <Image
            src="/images/icon_user.png"
            alt="icon_user"
            width={37}
            height={37}
            className=" my-8 border-2 border-white rounded-full"
          />
          <span className="text-lg ">Admin Admin</span>
          <svg width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.40375 4.40375L0 0H8.8075L4.40375 4.40375Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* ... other UI blocks unchanged ... */}

      <div className="px-6 ">
        <table className="text-xl w-full text-left rounded-tl-xl rounded-tr-xl overflow-hidden">
          <thead className="bg-[#DF5761] text-white">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">First Name</th>
              <th className="p-2">Last Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Register</th>
              <th className="p-2">Fan Zone</th>
              <th className="p-2">สิทธิ์ Fan Zone</th>
              <th className="p-2">Send Email</th>
              <th className="p-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u,idx) => (
              <tr key={u.userId}>
                <td className="p-2 truncate">{idx + 1}</td>
                <td className="p-2 truncate">{u.firstName}</td>
                <td className="p-2 truncate">{u.lastName}</td>
                <td className="p-2 truncate">{u.email}</td>
                <td className="p-2 truncate">{renderPhone(u.phone)}</td>
                <td className="p-2 truncate">{renderDateTime(u.registerAt)}</td>
                <td className="p-2 truncate">{u.zoneName}</td>
                <td className="p-2 truncate">{u.isFanZone ? "Yes" : "No"}</td>
                <td className="p-2 truncate">{u.isSendEmail ? "Yes" : "No"}</td>
                <td className="p-2 truncate">{renderDateTime(u.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;