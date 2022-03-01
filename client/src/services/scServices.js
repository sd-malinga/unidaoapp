import axios from 'axios';



 
  export const getTotalSupply = async () => {
    try {
      const response = await axios.get(
        `/api/sc/xusdtotalsupply`
      );
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  };