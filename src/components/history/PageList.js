import { useState, useEffect } from "react";
import axios from "axios";
import { HISTORY_API } from "../../constants/api";
import Loader from "../layout/Loader";
import ErrorMessage from "../layout/ErrorMessage";

export default function PageList() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = HISTORY_API;

  useEffect(function () {
    async function getPage() {
      try {
        const response = await axios.get(url);
        // console.log("response", response);
        setPages(response.data);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loader />;

  if (error) return <ErrorMessage message={`Error: ${error}`} />;

  return (
    <div className="pages">
      {pages.map((page) => {
        return (
          <div className="historical_events" key={page.id}>
            <div className="spaceX_history">
              <div className="details">
                <p className="id">{page.id}</p>
                <p className="title_">{page.title}</p>
                <p className="date">
                  {new Date(page.event_date_utc)
                    .toUTCString()
                    .substr(4, 13)
                    .replace()}
                </p>
                <p className="flight_number">{page.flight_number}</p>
                <p className="detail">{page.details}</p>
                <a className="historical_btn" href={page.links.article}>
                  Read more!
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
