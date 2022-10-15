import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import "./ContentModal.css";
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function TransitionsModal({ children, media_type, id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://movie-task.vercel.app/api/movie?movieId=${id}`
    );

    setContent(data.data);
    console.log(data.data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://movie-task.vercel.app/api/movie?movieId=${video}`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.tagline}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.title} ({content.original_language}) (
                    {content.release_date.substring(0, 10)})
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}
                  <div style={{ textAlign: "center" }}>
                    <span>Runtime: {content.runtime}</span>
                    <br />
                    <span>Revenue: {content.revenue}</span>
                    <br />
                    <span>Status: {content.status}</span>
                    <br />
                    <span>IMDB: {content.imdb_id}</span>
                    <br />
                    <span>Budget: {content.budget}</span>
                  </div>

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>
                  
                  <span style={{textAlign:'center'}}>
                    Visit: <a href={content.homepage}><b>{content.homepage}</b></a>
                  </span>

                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}
