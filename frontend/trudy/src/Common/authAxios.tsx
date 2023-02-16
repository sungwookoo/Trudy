import axios, { AxiosError,AxiosResponse }  from 'axios';
import axiosInstance from './axiosInterceptor';


type ServerError = { errorMessage: string };
type LoginFailType = { status: number, error: string,};

interface FetchData {
  method: string,
  url: string,
  data? : {},
  header : {},
}

const fetchAuth = async (fetchData: FetchData) => {
  const method = fetchData.method;
  const url = fetchData.url;
  const data = fetchData.data;
  const header = fetchData.header;
  
  try {
    const response:AxiosResponse<any, any> | false =
    (method === 'get' && (await axiosInstance.get(url, header))) ||
    (method === 'post' && (await axiosInstance.post(url, data, header))) ||
    (method === 'put' && (await axiosInstance.put(url, data, header))) ||
    (method === 'delete' && (await axiosInstance.delete(url, header))
    );
    
    if(response && response.data.error) {
      return null;
    }

    if (!response) {
      return null;
    }

    return response;

  } catch(err) {
    
    if (axios.isAxiosError(err)) {
      const serverError = err as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return null;
      }
    }

    return null;
  }
  
}

const GET = ( url:string, header:{} ) => {
  const response = fetchAuth({ method: 'get', url, header });
  return response;
};

const POST = ( url:string, data: {}, header:{}) => {
  const response = fetchAuth({ method: 'post', url, data, header })
  return response;
};

const PUT = async ( url:string, data: {}, header:{}) => {
  const response = fetchAuth({ method: 'put', url, data, header });
  return response;
};

const DELETE = async ( url:string, header:{} ) => {
  const response = fetchAuth({ method: 'delete', url, header });
  return response;
};

export { GET, POST, PUT, DELETE }