import React from 'react';
import { ListItem, ListItemText } from "@material-ui/core";
import HeadsetSharp from '@material-ui/icons/HeadsetSharp'
import {IconButton} from '@material-ui/core'
import '../styles/SearchList.css';

type Props = {
  result: {
    trackId: number;
    trackName: string;
    artistName: string;
    artistId: number;
    collectionName: string;
    previewUrl: string;
    artworkUrl100: string;
  };
};

const SearchResultItem = ({ result }: Props) => {
  return (
    <ListItem key={result.trackId} className="listItemSection">
            <img className ="thumbnailImg" src={result.artworkUrl100} alt={result.trackName} />
            <ListItemText
              primary={result.trackName}
              secondary={`Artist: ${result.artistName} | Collection: ${result.collectionName}`}
            />
            {/* <Button variant="contained" color="primary" href={result.previewUrl} target="_blank">
              Preview
            </Button> */}
            <IconButton className="arrowWrapper" aria-label="play-icon">
              <a href={result.previewUrl}target="_new"><HeadsetSharp className="headSetIcon" ></HeadsetSharp></a>
            </IconButton>

          </ListItem>
  );
};

export default SearchResultItem;
