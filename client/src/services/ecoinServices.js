import axios from 'axios';

export const getEcoinBalanceOf = async (userwallet) => {
    try {
      const response = await axios.get(
        `/api/ecoin/getbalanceof/${userwallet}`
      );
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  };

 