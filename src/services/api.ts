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

export const addStockAPI = async (username: string, query: string) => {
  const requestBody = {
    username: username,
    symbol: query,
  };

  const response = await fetch(`${INVOKE_URL}/addstock`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error adding stock:", errorData);
    throw new Error("Failed to add stock");
  }

  const responseData = await response.json();
  return responseData;
};

export const deleteStockAPI = async (username: string, query: string) => {
  const requestBody = {
    username: username,
    symbol: query,
  };

  const response = await fetch(`${INVOKE_URL}/deletestock`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error deleting stock:", errorData);
    throw new Error("Failed to delete stock");
  }

  const responseData = await response.json();
  return responseData;
};

export const getCompanyProfile = async (symbol: string) => {
  const response = await fetch(
    `${INVOKE_URL}/getcompanyprofile?symbol=${encodeURIComponent(symbol)}`
  );
  const data = await response.json();
  return data;
};
