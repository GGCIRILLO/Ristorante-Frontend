import type { FC } from "react";
import { useNavigate } from "react-router-dom";

type RoleCardProps = {
  iconSrc: string;
  label: string;
  route: string;
};

const RoleCard: FC<RoleCardProps> = ({ iconSrc, label, route }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate(route);
      }}
      className="w-lg h-56 bg-white rounded-xl items-center justify-center p-8 shadow-md flex flex-col transition-transform hover:scale-105 cursor-pointer hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      
      <div className="flex items-center justify-center">
        <img
          src={iconSrc}
          alt=""
          className="w-14 h-14 object-contain flex-shrink-0 mb-8"
        />
      </div>

      <span className="text-gray-800 font-medium">{label}</span>
    </button>
  );
};

export default RoleCard;
