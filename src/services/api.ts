const INVOKE_URL = "https://0c9frui112.execute-api.us-east-1.amazonaws.com/dev";

export const searchStocks = async (query: string) => {
  const response = await fetch(
    `${INVOKE_URL}/search?query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.result;
};

export const getStockInfo = async (query: string) => {
  const response = await fetch(
    `${INVOKE_URL}/get?symbol=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data;
};

export const getStockList = async (query: string) => {
  const response = await fetch(
    `${INVOKE_URL}/getstocklist?username=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data;
};

// export const addStock = async () => {
//   const response = await fetch(
//     `${INVOKE_URL}/`
//   );
//   const data = await response.json();
//   return data;
// };
