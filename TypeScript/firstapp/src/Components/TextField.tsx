import React,{useState, useRef} from 'react'
interface Props {
   text: string;
   handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

interface TextNode {
   text: string;
}

export const TextField: React.FC<Props> =({handleChange}) =>{
    const [count, setCount] = useState<TextNode>({text: "hello"})
    const inputRef = useRef<HTMLInputElement>(null)


    return(
     <div>
        <input ref={inputRef} onChange={handleChange}/>
     </div>
    )
}