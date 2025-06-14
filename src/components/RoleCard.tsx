import type { FC } from "react";
import { useNavigate } from "react-router-dom";

type RoleCardProps = {
  iconSrc: string;
  label: string;
  route: string;
};

const RoleCard: FC<RoleCardProps> = ({ iconSrc, label, route }) => {
  const navigate = useNavigate();
  console.log("RoleCard rendered with route:", route);

  return (
    <button
      onClick={() => {
        navigate(route);
      }}
      className="w-64 h-44 bg-white rounded-xl items-center justify-between p-8 shadow-md flex flex-col transition-transform hover:scale-105 cursor-pointer hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {/* icona compatta, non si allarga più del dovuto */}
      <div className="flex items-center justify-center w-16 h-16 mb-4">
        <img
          src={iconSrc}
          alt=""
          className="w-10 h-10 object-contain flex-shrink-0"
        />
      </div>

      <span className="text-gray-800 font-medium">{label}</span>
    </button>
  );
};

export default RoleCard;
