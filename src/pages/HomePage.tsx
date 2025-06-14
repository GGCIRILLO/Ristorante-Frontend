import type { FC } from "react";
import RoleCard from "../components/RoleCard";
import { Icons } from "../assets";

const HomePage: FC = () => (
  <div className="min-h-screen flex flex-col">
    {/* Barra superiore */}
    <header className="fixed inset-x-0 top-0 z-10 h-16 bg-[#0080c8] flex items-center shadow-md">
      <h1 className="ml-6 text-xl font-bold text-white">GESTIONE RISTORANTE</h1>
    </header>

    {/* Contenuto principale */}
    <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-4">
      <h2 className="mb-12 text-center text-2xl font-semibold text-gray-700">
        Benvenuto nel sistema di gestione del ristorante
      </h2>

      {/* Griglia 2×2 con padding esterno e spaziatura interna maggiore */}
      <div className="grid grid-cols-2 gap-10 p-4">
        <RoleCard iconSrc={Icons.person} label="Cameriere" route="/cameriere" />
        <RoleCard iconSrc={Icons.restaurantMenu} label="Cuoco" route="/cuoco" />
        <RoleCard iconSrc={Icons.payment} label="Cassiere" route="/cassiere" />
        <RoleCard
          iconSrc={Icons.adminPanel}
          label="Direttore"
          route="/direttore"
        />
      </div>
    </main>
  </div>
);

export default HomePage;
