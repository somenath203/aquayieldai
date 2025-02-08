const SelectInput = ({ label, disabledSelectedOption, selectOptionsArr, value, onChange }) => {
  return (
    <div className="flex flex-col gap-3">

      <p className="text-base">{label}</p>

      <select 
        className="select select-primary w-full"
        value={value} 
        onChange={onChange}
      >

        <option disabled value="">
          {disabledSelectedOption}
        </option>

        {selectOptionsArr.map((option, index) => (
            <option key={index}>{option}</option>
        ))}

      </select>

    </div>
  );
};


export default SelectInput;
