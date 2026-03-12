import React from 'react'

const Loading = ({isLoading} : {isLoading : boolean}) => {
    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 mb-0">
                    <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#DF5761] border-t-transparent" />
                        <p className="font-bold text-[#DF5761]">กำลังส่งอีเมล...</p>
                    </div>
                </div>
            )}
        </>

    )
}

export default Loading