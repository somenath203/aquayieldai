const NormalInput = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div className="flex flex-col gap-3">

        <p className="text-base">{label}</p>

        <input 
            type={type} 
            placeholder={placeholder} 
            className="input input-bordered input-primary w-full"
            value={value}
            onChange={onChange}
        />

    </div>
  )
}


export default NormalInput;