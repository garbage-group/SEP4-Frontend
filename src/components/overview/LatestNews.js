import "../../styles/overview_css/News.css";
import { useEffect } from "react";

// Your Last.fm API key
const apiKey = 'd6211f99b0580f2fa3420ac6064e2682';

// Function to fetch and display latest tracks
async function getLatestTracks() {
    const url = `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${apiKey}&format=json`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.tracks) {
        displayTracks(data.tracks.track);
      } else {
        console.error('Error fetching tracks:', data);
      }
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  }
  
  function displayTracks(tracks) {
    const musicContainer = document.getElementById('music-container');
  
    if (!musicContainer) {
      console.error('Music container not found.');
      return;
    }
  
    tracks.forEach(track => {
      const trackItem = document.createElement('div');
      trackItem.classList.add('music-item');
      trackItem.innerHTML = `
        <h3>${track.name}</h3>
        <p>by ${track.artist.name}</p>
        <a href="${track.url}" target="_blank" rel="noopener noreferrer">Listen on Last.fm</a>
      `;
      musicContainer.appendChild(trackItem);
    });
  }
  
  export function LatestNews() {
    useEffect(() => {
      getLatestTracks();
    }, []);
  
    return null;
  }
  