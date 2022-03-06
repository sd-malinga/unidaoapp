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

  export const getuserbalance = async (userwallet) => {
    try {
      const data2 = await axios.get(
        `/api/sc/getuserbalance/${userwallet}`
      );
      return data2.data;
    } catch (err) {
      throw new Error(err);
    }

  
  };
