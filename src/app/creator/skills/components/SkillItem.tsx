type Props = {
  name: string;
  logo: string;
  yearsOfExperience: number;
};

export default function SkillItem ({
  name,
  logo,
  yearsOfExperience
}: Props) {
  return (
    <div className="flex items-center gap-4 justify-start  p-2">
      <img src={logo} alt={name} className="w-[40px] rounded-xl object-contain" />
      <div className="flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <p className="text-sm font-light text-gray-400">
          {yearsOfExperience} years of experience
        </p>
      </div>
    </div>
  )
}
