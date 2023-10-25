export async function playSong(accessToken, track) {
  const response = await fetch("https://api.spotify.com/v1/me/player/play", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      uris: [track.uri],
    }),
  });
  return response;
}

//   useEffect(() => {
//     async function fetchPlaylistData() {
//       if (session && session.accessToken) {
//         const response = await getPlaylistData(session.accessToken, globalPlaylistId);
//         const data = await response.json();
//         setPlaylistData(data);
//       }
//     }
//     fetchPlaylistData();
//   }, [session, globalPlaylistId]);

export async function getPlaylistData(accessToken, playlistId) {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.json();
}
