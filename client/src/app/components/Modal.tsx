import React from 'react'

interface ModalProp{
  onSend : () => void,
  onClose : () => void,
  modalStatus : number | null
}

const Modal = ({onSend,onClose,modalStatus} : ModalProp) => {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm ${modalStatus ? 'block' : 'hidden'}`}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">

          {/* Header */}
          <div className="bg-[#DF5761] px-6 py-4 flex items-center gap-3">
            <div className="bg-white/20 rounded-full p-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="white" />
              </svg>
            </div>
            <h2 className="text-white text-xl font-semibold">ยืนยันการส่ง Email</h2>
          </div>

          <div className="px-6 py-5 space-y-4">
            <p className="text-gray-600 text-base">คุณต้องการส่ง Email ไปยังผู้ใช้นี้ใช่หรือไม่?</p>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              ยกเลิก
            </button>
            <button
              onClick={onSend}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#DF5761] hover:bg-[#c94a54] text-white text-sm font-medium transition-colors disabled:opacity-70"
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </div>
  )
}

export default Modal