import React, { useState } from "react";
import { onSubmitquery } from "./utility/queryhandler"

const QueryBar = () => {
  const [query, setQuery] = useState("");
  const [responseData, setResponseData] = useState(null);

  const handleQuery = async () => {
    try {
      console.log(query);
      const response = await onSubmitquery(query, setResponseData);
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="w-1/5 bg-gray-200 border-l p-4 flex flex-col space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Ask Queries</h2>
      <textarea
        placeholder="Type your query here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded-md h-48 resize-none"
      ></textarea>
      <button
        onClick={handleQuery}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Submit Query
      </button>
      <p className="text-gray-600">{responseData}</p>
    </div>
  );
};

export default QueryBar;
