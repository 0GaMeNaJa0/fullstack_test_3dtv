"use client"
import { ThaiDatePicker } from "thaidatepicker-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";

interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  registerAt: Date;
  zoneName: string;
  isFanZone: boolean;
  createdAt: Date;
}

interface Filter {
  zoneId?: number,
  timeZone?: string,
  email?: string,
  keyword?: string
}

interface Zones {
  zoneId: number,
  name: string
}

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilters] = useState<Filter>({});
  const [zones, setZones] = useState<Zones[]>([]);
  const [modal, setModal] = useState<number | null>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const filteredUsers = users.filter((u) => {
    if (filter.zoneId && u.zoneName !== zones.find(z => z.zoneId === filter.zoneId)?.name) {
      return false;
    }
    if (filter.timeZone) {
      const registerDate = u.registerAt
        ? `${u.registerAt.getFullYear()}-${String(u.registerAt.getMonth() + 1).padStart(2, "0")}-${String(u.registerAt.getDate()).padStart(2, "0")}`
        : null;
      if (registerDate !== filter.timeZone) return false;
    }

    if (filter.email && !u.email.toLowerCase().includes(filter.email.toLowerCase())) {
      return false;
    }

    if (filter.keyword) {
      const kw = filter.keyword.toLowerCase();
      const match = [u.firstName, u.lastName, u.email, u.phone].some((field) =>
        field?.toLowerCase().includes(kw)
      );
      if (!match) return false;
    }

    return true;
  });
  const handleSendEmail = async () => {

    const port = process.env.NEXT_PUBLIC_SERVER_PORT ?? '3000';
    const url = `http://localhost:${port}/users/fanZone`;

    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "userId" : modal
        })
      });
      console.log(res);
      if (res.ok && res.status === 200) {
        setModal(null);
        setIsUpdate(!isUpdate);
      } else {
        console.error('request failed', await res.text());
      }
    } catch (err) {
      console.error('network or other error', err);
    }

  };
  useEffect(() => {
    const fetchData = async () => {
      try {

        const res = await fetch(
          `http://localhost:${process.env.NEXT_PUBLIC_SERVER_PORT}/users`
        )
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
          createdAt: r.createdAt ? new Date(r.createdAt) : null,
        }));

        setUsers(parsed);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setUsers([]);
      }
    };

    const fetchZones = async () => {
      try {
        const res = await fetch(
          "http://localhost:" + process.env.NEXT_PUBLIC_SERVER_PORT + "/master/zones"
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const zones = await res.json();

        setZones(zones)
      } catch (err) {
        console.error("Failed to fetch zones:", err);
        setUsers([]);
      }
    }
    fetchData();
    fetchZones();
  }, [isUpdate]);

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

      <div className='px-6 flex justify-start gap-x-5 items-center'>
        <div className='min-w-60'>
          <label className="block ">Fan Zone</label>
          <select
            id="countries"
            className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-gray-400 rounded-lg"
            value={filter.zoneId ?? ""}
            onChange={(e) => {
              const v = e.target.value
              setFilters(prev => ({
                ...prev,
                zoneId: v === "" ? undefined : Number(v)
              }))
            }}
          >
            <option value="">ทั้งหมด</option>
            {zones.map((z) => (
              <option key={z.zoneId} value={z.zoneId}>{z.name}</option>
            ))}
          </select>
        </div>
        <div className='min-w-60'>
          <label htmlFor="countries" className="block ">ช่วงเวลา</label>
          <div className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-gray-400 rounded-lg">
            <ThaiDatePicker value={filter?.timeZone}
              placeholder="กรุณาเลือกวันที่"
              onChange={(date: string) => {
                setFilters((prev) => ({
                  ...prev,
                  timeZone: date
                }))
              }} />
          </div>
        </div>

        <div className='w-full'>
          <label className="block ">Email</label>
          <input type="text" className='border border-gray-400 rounded-lg px-3 py-2 w-full' placeholder='Email' value={filter.email ?? ""}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                email: e.target.value
              }))
            } />
        </div>
        <div className='w-full'>
          <label className="block ">ค้นหา</label>
          <input type="text" className='border border-gray-400 rounded-lg px-3 py-2 w-full' placeholder='ค้นหา' value={filter.keyword ?? ""}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                keyword: e.target.value
              }))
            } />
        </div>

        <div className='flex flex-col justify-end '>
          <label className="invisible">Export</label>
          <button className='flex items-center justify-center gap-2 border border-gray-400 rounded-lg px-5 py-2.5 bg-[#D9D9D9]'>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 11V14H2V11H0V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V11H14ZM3 5L4.41 6.41L7 3.83V12H9V3.83L11.59 6.41L13 5L8 0L3 5Z" fill="#2B2B2B" />
            </svg>
            <span>Export</span>
          </button>
        </div>
      </div>

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
              <th className="p-2 text-center">สิทธิ์ Fan Zone</th>
              <th className="p-2 text-center">Send Email</th>
              <th className="p-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u, idx) => (
              <tr key={u.userId}>
                <td className="p-2 truncate">{idx + 1}</td>
                <td className="p-2 truncate">{u.firstName}</td>
                <td className="p-2 truncate">{u.lastName}</td>
                <td className="p-2 truncate">{u.email}</td>
                <td className="p-2 truncate">{renderPhone(u.phone)}</td>
                <td className="p-2 truncate">{renderDateTime(u.registerAt)}</td>

                <td className="p-2 truncate text-center">
                  <div className={`${u.isFanZone ? 'bg-[#008C4F]' : 'bg-[#6E6E6E]'} inline-block w-5 h-5 rounded-sm`} />
                </td>
                <td className="p-2 truncate">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => setModal(u.userId)}
                      className={`${u.isFanZone ? 'bg-[#6E6E6E]' : 'bg-[#008C4F]'} text-white rounded-md px-3 py-1 inline-flex items-center justify-center`}
                    >
                      ส่งอีเมล
                    </button>
                  </div>
                </td>

                <td className="p-2 truncate">{renderDateTime(u.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal onClose={() => setModal(null)} onSend={handleSendEmail} modalStatus={modal}/>
    </div>
  );
};

export default Page;