"use client"
interface ButtonProps {
    onClick? : () => void; 
    text : string,
    type? : "submit" | "reset" | "button" | undefined
}
const Button = ({onClick,text, type = "button"} : ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className="left-1/2 transform -translate-x-1/2 text-white text-7xl rounded-4xl px-6 absolute bottom-35 bg-[#333333] border-2 border-white">
        {text}
    </button>
  )
}

export default Button