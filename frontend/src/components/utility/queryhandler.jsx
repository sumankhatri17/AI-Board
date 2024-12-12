export const onSubmitquery = async (query, setResponseData) => {
  if (!query) {
    throw new Error("Query cannot be empty!");
  }

  try {
    const response = await fetch(
      `http://127.0.0.1:5000/processquery?query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    setResponseData(data.response);
    return data.response;
  } catch (err) {
    throw new Error(`Error: ${err.message}`);
  }
};
