"use client"
interface ButtonProps {
    onClick : () => void; 
    text : string;
}
const Button = ({onClick,text} : ButtonProps) => {
  return (
    <button onClick={onClick} className="left-1/2 transform -translate-x-1/2 text-white text-7xl rounded-4xl px-6 absolute bottom-40 bg-[#333333] border-2 border-white">
        {text}
    </button>
  )
}

export default Button