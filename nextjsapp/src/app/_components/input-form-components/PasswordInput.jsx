import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const TextInput = ({ label, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-3">

      <p className="text-base">{label}</p>

      <div className="relative w-full">

        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="input input-bordered input-primary w-full pr-10"
          value={value}
          onChange={onChange}
        />

        <button
          type="button"
          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassword((prev) => !prev)}
        >
        
          {showPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
          
        </button>

      </div>

    </div>
  );
};

export default TextInput;
