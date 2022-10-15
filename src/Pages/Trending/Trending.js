import axios from "axios";
import "./Trending.css";
import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://movie-task.vercel.app/api/popular?page=1`
    );
    console.log(data.data.results);
    setContent(data.data.results);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending Movies</span>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title}
              date={c.release_date}
              media_type={c.overview}
              vote_average={c.vote_average}
              vote_count={c.vote_count}
              popularity={c.popularity}
              original_language={c.original_language}
              adult={c.adult}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
