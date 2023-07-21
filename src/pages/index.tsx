import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { getAllCars, CarProps, createCar, deleteCar } from "./api/api";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [listCar, setListCar] = useState<CarProps[]>([]);
  const [newCarData, setNewCarData] = useState<CarProps>({
    brand: "",
    model: "",
    year: 0,
    color: "",
  });

  const handleAddCar = async () => {
    try {
      // Call the createCar API function with the new car data
      const newCar = await createCar(newCarData);

      // Update the list of cars with the newly added car
      setListCar((prevCars) => [...prevCars, newCar]);

      // Clear the form data after successful addition
      setNewCarData({
        _id: "",
        brand: "",
        model: "",
        year: 0,
        color: "",
      });
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  const handleDeleteCar = async (_id: CarProps) => {
    if (!_id) {
      console.error("Erro ao excluir o carro: ID inválido.");
      return;
    }
    try {
      await deleteCar(_id);
      // Após excluir o carro com sucesso, atualize a lista de carros
      setListCar((prevCars) => prevCars.filter((car) => car._id !== _id));
    } catch (error) {
      console.error("Erro ao excluir o carro:", error);
    }
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsData: CarProps[] = await getAllCars();
        setListCar(carsData);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 w-full max-w-5xl items-center n font-mono text-sm justify-items-center	">
        <h1>Lista de carros para alugar</h1>
        <div>
          <div className="grid">
            <p>Quer adicionar mais carros à lista?</p>
            <input
              type="text"
              placeholder="Digite uma marca"
              className="text-black mt-2 w-52 h-6 pl-2"
              value={newCarData.brand}
              onChange={(e) =>
                setNewCarData((prevData) => ({
                  ...prevData,
                  brand: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Digite um modelo"
              className="text-black mt-2 w-52 h-6 pl-2"
              value={newCarData.model}
              onChange={(e) =>
                setNewCarData((prevData) => ({
                  ...prevData,
                  model: e.target.value,
                }))
              }
            />
            <input
              type="number"
              placeholder="Digite o ano do veículo"
              className="text-black mt-2 w-52 h-6 pl-2"
              value={newCarData.year}
              onChange={(e) =>
                setNewCarData((prevData) => ({
                  ...prevData,
                  year: parseInt(e.target.value, 10),
                }))
              }
            />
            <input
              type="text"
              placeholder="Digite a cor do veículo"
              className="text-black mt-2 w-52 h-6 pl-2"
              value={newCarData.color}
              onChange={(e) =>
                setNewCarData((prevData) => ({
                  ...prevData,
                  color: e.target.value,
                }))
              }
            />

            <button
              className="w-28 rounded-md bg-green-500 mt-2 hover:opacity-70"
              onClick={handleAddCar}
            >
              Clique aqui
            </button>
          </div>

          {listCar?.map((list) => (
            <div key={list._id}>
              <p>{list.brand}</p>
              <p>{list.model}</p>
              <p>{list.year}</p>
              <p>{list.color}</p>
              <div className="mt-5 mb-5">
                <button
                  className="w-20 rounded-md bg-red-500 mr-5 hover:opacity-70"
                  onClick={() => handleDeleteCar(list._id)}
                >
                  Excluir
                </button>
                <button className="w-20 rounded-md bg-cyan-700 hover:opacity-70">
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
