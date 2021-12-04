import React from "react";
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import Crossword from "@jaredreisinger/react-crossword";
import { render } from "react-dom";
import Puzzle from "react-image-puzzle";
import { Typography } from "@material-ui/core";

function BrainTeaser(props) {
  return (
    <div>
      <h2 style={{ marginTop: "100px" }}>Image Puzzle</h2>
      <div
        style={{
          marginLeft: "500px",
        }}
      >
        <Puzzle image="https://tv-asahicontents.com/tv-asahi/open/open-tv-program!image?tid=4541&imageNumber=1&sp=true" />
      </div>
    </div>
  );
}

export default BrainTeaser;
