import axios from 'axios';

export const getxdcbalance = async () => {
    try {
      const response = await axios.get(
        `/api/cdp/getxdcbalance`
      );
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  };

 
  export const gettaxrate = async () => {
    try {
      const response = await axios.get(
        `/api/cdp/gettaxrate`
      );
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  };


  export const getUserVault = async (userwallet) => {
    try {
      const response = await axios.get(
        `/api/cdp/getuservault/${userwallet}`
      );
      return response.data;
    } catch (err) {
      throw new Error(err);
    };

  }


  