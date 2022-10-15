import { Badge } from "@material-ui/core";
import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
  vote_count,
  popularity,
  original_language,
  adult,
  imdb_id,
}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge
        badgeContent={vote_average}
        color={vote_average > 6 ? "primary" : "secondary"}
      />

      <img
        className="poster"
        src={poster ? `${img_300}${poster}` : unavailable}
        alt={title}
      />
      <b className="title">
        {title} ({original_language})
      </b>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>

      <span className="popularity">Popularity: {popularity}</span>
      <span className="adult">Adult: Yes</span>
      <span className="vote_count">
        <pre style={{ fontSize: "15px" }}>
          No of Votes: <b>{vote_count}</b>
        </pre>
      </span>
    </ContentModal>
  );
};

export default SingleContent;
