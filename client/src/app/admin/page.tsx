import Image from 'next/image'
const page = () => {

  interface Data {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    register: Date,
    fanZone: string,
    isFanZone: boolean,
    isSendEmail: boolean,
    timeStamp: Date
  };
  const data: Data[] = [
    {
      "id": 1,
      "firstName": "พรชัย",
      "lastName": "เพิ่มพูลกิจ",
      "email": "herogane13748@gmail.com",
      "phone": "091-868-5148",
      "register": new Date(),
      "fanZone": "Daou",
      "isFanZone": true,
      "isSendEmail": true,
      "timeStamp": new Date(),
    }
  ]
  return (
    <div className='space-y-5 bg-[#F9F3F3] text-lg min-h-screen'>
      <div className='w-full bg-[#DF5761] flex justify-between items-center font-semibold text-white px-6'>
        <p className=' text-4xl'>ผู้ลงทะเบียน</p>
        <div className='flex justify-center items-center gap-x-2'>
          <Image src="/images/icon_user.png" alt="icon_user" width={37} height={37} className=" my-8 border-2 border-white rounded-full" />
          <span className='text-lg ' >Admin Admin</span>
          <svg width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.40375 4.40375L0 0H8.8075L4.40375 4.40375Z" fill="white" />
          </svg>
        </div>
      </div>

      <div className='text-2xl px-6 flex justify-start items-center gap-x-10'>
        <div className='flex justify-between items-center w-72 px-4 py-3 bg-white rounded-2xl'>
          <div>
            <p className='text-4xl font-bold mb-3'>1000</p>
            <p>ผู้ลงทะเบียนทั้งหมด</p>
          </div>
          <span>คน</span>
        </div>
        <div className='flex justify-between items-center w-72 px-4 py-3 bg-white rounded-2xl'>
          <div>
            <p className='text-4xl font-bold mb-3'>230 /230</p>
            <p>สิทธิ์ Fan zone ทั้งหมด</p>
          </div>
          <span>คน</span>
        </div>
        <div className='flex justify-between items-center w-72 px-4 py-3 bg-white rounded-2xl'>
          <div>
            <p className='text-4xl font-bold mb-3'>230 /230</p>
            <p>การส่งอีเมล</p>
          </div>
          <span>คน</span>
        </div>
      </div>

      <div className='px-6 flex justify-start gap-x-5 items-center'>
        <div className='min-w-60'>
          <label htmlFor="countries" className="block ">Fan Zone</label>
          <select id="countries" className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-gray-400 rounded-lg">
            <option selected>ทั้งหมด</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>
        <div className='min-w-60'>
          <label htmlFor="countries" className="block ">ช่วงเวลา</label>
          <select id="countries" className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-gray-400 rounded-lg">
            <option selected>ทั้งหมด</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>

        <div className='w-full'>
          <label htmlFor="countries" className="block ">Email</label>
          <input type="text" className='border border-gray-400 rounded-lg px-3 py-2 w-full' placeholder='Email' />
        </div>
        <div className='w-full'>
          <label htmlFor="countries" className="block ">ค้นหา</label>
          <input type="text" className='border border-gray-400 rounded-lg px-3 py-2 w-full' placeholder='ค้นหา' />
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

      <div className='px-6 '>
        <table className=" w-full text-left rounded-tl-xl rounded-tr-xl overflow-hidden">
          <thead className="bg-[#DF5761] text-white">
            <tr>
              <th className='p-2'>#</th>
              <th className='p-2'>First Name</th>
              <th className='p-2'>Last Name</th>
              <th className='p-2'>Email</th>
              <th className='p-2'>Phone</th>
              <th className='p-2'>Register</th>
              <th className='p-2'>Fan Zone</th>
              <th className='p-2'>สิทธิ์ Fan Zone</th>
              <th className='p-2'>Send Email</th>
              <th className='p-2'>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((d: Data) => {
                return (
                  <tr key={d.id}>
                    <td className='p-2 truncate'>{d.id}</td>
                    <td className='p-2 truncate'>{d.firstName}</td>
                    <td className='p-2 truncate'>{d.lastName}</td>
                    <td className='p-2 truncate'>{d.email}</td>
                    <td className='p-2 truncate'>{d.phone}</td>
                    <td className='p-2 truncate'>{d.register.toString()}</td>
                    <td className='p-2 truncate'>{d.fanZone}</td>
                    <td className='p-2 truncate'>{d.isFanZone ? 'Yes' : 'No'}</td>
                    <td className='p-2 truncate'>{d.isSendEmail ? 'Yes' : 'No'}</td>
                    <td className='p-2 truncate'>{d.timeStamp.toString()}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page