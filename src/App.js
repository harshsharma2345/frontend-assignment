import "./App.css";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function App() {
  const [apiResponse, setApiResponse] = useState(null);
  const [page, setPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  async function getData() {
    const url =
      "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      setApiResponse(json);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const data = apiResponse && apiResponse.slice((page - 1) * 5, page * 5);
    setCurrentPageData(data);
    const pagecount = Math.ceil(apiResponse && apiResponse.length / 5);
    setTotalPages(pagecount);
  }, [apiResponse, page]);

  const handleChange = (event, page) => {
    setPage(page);
  };

  return (
    <div className="App">
      <div className="table">
        <table>
          <th>S. No.</th>
          <th>Percentage Funded</th>
          <th>Amount pledged</th>
          {currentPageData != null &&
            currentPageData.map((item, idx) => {
              return (
                <>
                  <tr>
                    <td>{item["s.no"]}</td>
                    <td>{item["percentage.funded"]}</td>
                    <td>{item["amt.pledged"]}</td>
                  </tr>
                </>
              );
            })}
        </table>
        <Stack spacing={2}>
          {/* <Pagination count={10} shape="rounded" /> */}
          <Pagination
            count={totalPages}
            onChange={handleChange}
            variant="outlined"
            shape="rounded"
            size="large"
          />
        </Stack>
      </div>
    </div>
  );
}

export default App;