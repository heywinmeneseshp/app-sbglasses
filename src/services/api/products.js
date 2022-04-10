
import axios from 'axios';
import endPoints from '@services/api';

const addProduct = async (body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(endPoints.products.addProducts, body, config);
  return response.data;
};

const delectProduct = async (id) => {
  const response = await axios.delete(endPoints.products.deleteProduct(id));
  return response.data;
}

export { addProduct, delectProduct }; 