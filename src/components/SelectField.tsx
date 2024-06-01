import type { UseFormRegister, FieldError } from 'react-hook-form'

export type SelectFieldOption = {
  label: string;
  value: string;
}

type SelectFieldProps = {
  label: string;
  name: string;
  placeholder?: string;
  isPrivate?: boolean;
  disabled?: boolean;
  errors?: FieldError | undefined;
  register?: UseFormRegister<any>;
  labelTheme?: 'light' | 'dark';
  options: SelectFieldOption[]
};

export default function SelectField (props: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className={`
        ${props.labelTheme === 'light' ? 'text-gray-300' : 'text-black'}
        text-sm font-semibold
      `}
        htmlFor={props.name}
      >
        {props.label}
      </label>
      <select
        disabled={props.disabled}
        id={props.name}
        {...(props.register ? props.register(props.name) : {})}
        className={`bg-black-100 border-2 border-black-100 p-2 rounded-lg text-white focus:outline-none focus:border-secondary disabled:bg-black-200 disabled:text-gray-500 disabled:pointer-events-none ring-white${
          props.errors?.message ? 'border-red-500' : ''
        }`}
      >
        {
          props.options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))
        }
      </select>
      {props.errors && (
        <span className="text-red-500 text-sm">{props.errors.message}</span>
      )}
    </div>
  )
}
