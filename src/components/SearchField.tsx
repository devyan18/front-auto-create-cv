import type { ChangeEvent } from 'react'

type SearchFieldProps = {
  label: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  labelTheme?: 'light' | 'dark';
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchField (props: SearchFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        disabled={props.disabled}
        type="search"
        placeholder={props.placeholder}
        id={props.name}
        {
          ...props.onChange
            ? { onChange: props.onChange }
            : {}
        }
        {
          ...props.value
            ? { value: props.value }
            : {}
        }

        className={'font-poppins bg-black-100 border-2 border-black-100 p-2 rounded-lg text-white focus:outline-none focus:border-secondary disabled:bg-black-200 disabled:text-gray-500 disabled:pointer-events-none'}
      />
    </div>
  )
}
