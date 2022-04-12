import axios from 'axios';

export const checklqvbalance = async () =>{
    try {
            const response = await axios.get(
              `/api/lqv/getlqvbalance`
            );
            return response.data;
          } catch (err) {
            throw new Error(err);
    };
    
}

export const checklqvrates = async () =>{
    try {
            const response = await axios.get(
              `/api/lqv/getlqvrates`
            );
            return response.data;
          } catch (err) {
            throw new Error(err);
    };
    
}