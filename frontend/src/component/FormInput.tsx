interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  children?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({ label, type, name, value, onChange, disabled, children }) => (
  <label className={`input input-bordered mb-2 flex items-center gap-2`}>
    {children}
    <input
      onChange={onChange}
      disabled={disabled}
      name={name}
      value={value}
      type={type}
      className={`${disabled ? 'bg-white' : '' } grow`}
      placeholder={label}
    />
  </label>
);

export default FormInput;
