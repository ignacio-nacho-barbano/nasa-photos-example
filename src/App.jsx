import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cantidad, setCantidad] = useState(5);
  const [data, setData] = useState();

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://api.nasa.gov/planetary/apod?count=${cantidad}&api_key=${
        import.meta.env.VITE_KEY
      }`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log("error", error));
  }, [cantidad]);

  return (
    <>
      <main>
        {data ? (
          data.map((data) => (
            <div className="card" key={data.title}>
              <div className="left-side">
                <h1>{data.title}</h1>
                <h2>
                  {data.date} | {data.copyright}
                </h2>
                <p>{data.explanation}</p>
              </div>
              <img src={data.hdurl} alt={data.title} />
            </div>
          ))
        ) : (
          <h1>Loading</h1>
        )}
        <footer>
          <button
            onClick={() => {
              setCantidad(cantidad + 1);
              console.log(cantidad);
            }}
          >
            More NASA
          </button>
        </footer>
      </main>
    </>
  );
}

export default App;
