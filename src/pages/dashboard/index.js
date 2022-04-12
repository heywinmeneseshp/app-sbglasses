import { useState, useEffect } from 'react';
import axios from 'axios';
import endPoints from '@services/api/index';
import useFetch from '@hooks/useFetch';
import SecondLayout from '@layout/SecondLayout';
import { Chart } from '@common/Chart';

const PRODUCT_LIMIT = 5;


export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [paginaActual, setPaginaActual] = useState(0);
  const [button0, setButton0] = useState([0]);
  const [button1, setButton1] = useState([1]);
  const [button2, setButton2] = useState([2]);
  const [button3, setButton3] = useState([3]);

  useEffect(() => {
    async function getProducts() {
      const response = await axios.get(endPoints.products.getProducts(PRODUCT_LIMIT, paginaActual));
      setProducts(response.data);
    }
    try {
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }, [paginaActual]);

  const categoryNames = products?.map((product) => product.category);
  const categoryCount = categoryNames?.map((category) => category.name);
  const allProducts = useFetch(endPoints.products.getAllProducts);
  const size = allProducts.length;
  const parts = Math.floor(size / PRODUCT_LIMIT);

  const handleInit = () => {
    setPaginaActual(0);
    console.log(paginaActual);
    setButton0(0);
    setButton1(1);
    setButton2(2);
    setButton3(3);
  };

  const handleFinish = () => {
    const currence = Math.floor((parts / parts) * size) - PRODUCT_LIMIT;
    setPaginaActual(currence);
    console.log(currence);
    setButton0(parts * 1 - 3);
    setButton1(parts * 1 - 2);
    setButton2(parts * 1 - 1);
    setButton3(parts);
  };

  const handleNext = () => {
    if (button1 >= parts - 2) return;
    const currence = Math.floor(((button1 * 1 + 1) / parts) * size) - PRODUCT_LIMIT;
    setPaginaActual(currence);
    console.log(currence);
    setButton0(button1);
    setButton1(button1 * 1 + 1);
    setButton2(button2 * 1 + 1);
    setButton3(button3 * 1 + 1);
  };

  const handlePrev = () => {
    if (button1 > 1) {
      const currence = Math.floor(((button1 * 1 - 1) / parts) * size) - PRODUCT_LIMIT;
      setPaginaActual(currence);
      console.log(currence);
      setButton0(button0 * 1 - 1);
      setButton1(button1 * 1 - 1);
      setButton2(button2 * 1 - 1);
      setButton3(button3 * 1 - 1);
    } else {
      return;
    }
  };

  const handleButton3 = () => {
    const currence = Math.floor((button3 / parts) * size) - PRODUCT_LIMIT;
    setPaginaActual(currence);
    console.log(currence);
    setButton0(button3 * 1 - 1);
    setButton1(button3);
    setButton2(button3 * 1 + 1);
    setButton3(button3 * 1 + 2);
  };



  //Contoeo de ocurrencias
  const countOccurrences = (array) => array.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});
  const data = {
    datasets: [
      {
        label: 'Categorías',
        data: countOccurrences(categoryCount),
        borderWidth: 2,
        backgroundColor: ['#ffbb11', '#c0c0c0', '#50AF95', '#f3ba2f', '#2a71d0'],
      },
    ],
  };

  return (
    <>
      <SecondLayout>
        <Chart className="mb-8 mt-2" chartData={data} />

        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Previous </span>
            <span className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Next </span>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando
                <span className="font-medium">{` ${paginaActual + 1} `}</span>a<span className="font-medium">{` ${paginaActual + PRODUCT_LIMIT} `}</span>
                de
                <span className="font-medium">{` ${size} `}</span>
                resultados
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <span
                  onClick={handlePrev}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>

                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>

                {!(button1 <= 1) && (
                  <span
                    onClick={handleInit}
                    aria-current="page"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    {' '}
                    {'...'}{' '}
                  </span>
                )}
                {!(button1 <= 1) && (
                  <span
                    onClick={handlePrev}
                    aria-current="page"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    {' '}
                    {button0}{' '}
                  </span>
                )}
                <span aria-current="page" className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  {' '}
                  {button1}{' '}
                </span>
                {!(button1 == parts * 1 - 2) && (
                  <span
                    onClick={handleNext}
                    aria-current="page"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    {' '}
                    {button2}{' '}
                  </span>
                )}
                {!(button1 >= parts * 1 - 3) && (
                  <span
                    onClick={handleButton3}
                    aria-current="page"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    {' '}
                    {button3}{' '}
                  </span>
                )}
                {!(button1 >= parts * 1 - 3) && (
                  <span
                    onClick={handleFinish}
                    aria-current="page"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    {' '}
                    {'...'}{' '}
                  </span>
                )}

                <span
                  onClick={handleNext}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoría
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Precio
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Id
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Editar</span>
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Eliminar</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={`product-item-${product.id}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={product.images[0]} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.title}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{product.category.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{'$ ' + product.price}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="/edit" className="text-indigo-600 hover:text-indigo-900">
                            Editar
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="/edit" className="text-indigo-600 hover:text-indigo-900">
                            Eliminar
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </SecondLayout>
    </>
  );
}
