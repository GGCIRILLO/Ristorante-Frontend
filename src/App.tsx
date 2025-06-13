import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

// Funzione simulata per il fetch dei dati
const fetchRestaurantInfo = async () => {
  // In un'app reale, qui faresti una chiamata API
  // utilizzando VITE_API_BASE_URL
  const apiUrl = import.meta.env.VITE_API_BASE_URL
  console.log(`API URL configurata: ${apiUrl}`)
  
  // Simula un ritardo
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return {
    name: "Ristorante Bella Italia",
    cuisine: "Italiana",
    rating: 4.8
  }
}

function App() {
  const [count, setCount] = useState(0)
  
  // Utilizzo di TanStack Query per il fetching dei dati
  const { data, isLoading, error } = useQuery({
    queryKey: ['restaurantInfo'],
    queryFn: fetchRestaurantInfo
  })

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="flex mb-6 gap-4">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="h-24 hover:drop-shadow-lg transition-all" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="h-24 animate-spin-slow hover:animate-spin transition-all" alt="React logo" />
        </a>
      </div>
      
      <h1 className="text-5xl font-bold text-blue-600 mb-8">Vite + React + TS + Tailwind</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full mb-8">
        <button 
          onClick={() => setCount((count) => count + 1)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors mb-4"
        >
          Contatore: {count}
        </button>
        
        {isLoading && <p className="text-gray-600">Caricamento dati ristorante...</p>}
        {error && <p className="text-red-500">Errore nel caricamento dei dati</p>}
        {data && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">{data.name}</h2>
            <p className="text-gray-600">Cucina: {data.cuisine}</p>
            <p className="text-amber-500 font-bold">Valutazione: {data.rating}/5</p>
          </div>
        )}
      </div>
      
      <p className="text-gray-500 text-sm">
        Modifica <code className="bg-gray-200 p-1 rounded">src/App.tsx</code> per testare l'HMR
      </p>
    </div>
  )
}

export default App
