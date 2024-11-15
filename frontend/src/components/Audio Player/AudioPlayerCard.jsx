import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../../styles/CustomAudioPlayer.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import PropTypes from "prop-types";

export default function AudioPlayerCard({ track }) {
  console.log("Track:", track);
  console.log("Preview URL:", track.preview_url);

  return (
    <div className="audio-player-card">
      <img
        src={track.album.images[0]?.url || "/default-track.jpg"}
        alt={track.name}
        className="track-image"
      />
      <div className="track-info">
        <h3 className="track-title">{track.name}</h3>
        <p className="track-artist">
          {track.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>

      <AudioPlayer
        src={track.preview_url || "/default-track.mp3"}
        className="custom-audio-player"
        layout="stacked-reverse"
        customAdditionalControls={[]}
        showJumpControls={false}
        customVolumeControls={[]}
        customIcons={{
          play: <i className="fas fa-play-circle"></i>,
          pause: <i className="fas fa-pause-circle"></i>,
        }}
      />
    </div>
  );
}

AudioPlayerCard.propTypes = {
  track: PropTypes.shape({
    name: PropTypes.string.isRequired,
    preview_url: PropTypes.string,
    album: PropTypes.shape({
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string,
        })
      ),
    }).isRequired,
    artists: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
