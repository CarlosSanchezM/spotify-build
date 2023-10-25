"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import PlaylistView from "../components/PlaylistView";
import Search from "../components/Search";
import Library from "../components/Library";
import Artist from "../components/Artist";
import Player from "../components/Player";

export default function Home() {
  const [view, setView] = useState("search"); //["search","library","playlist","artist"]
  const [globalPlaylistId, setGlobalPlaylistId] = useState(null);
  const [globalArtistId, setGlobalArtistId] = useState(null);
  const [globalCurrentSongId, setGlobalCurrentSongId] = useState(null);
  const [globalIsTrackPlaying, setGlobalIsTrackPlaying] = useState(false);

  return (
    <>
      <main className="bg-black">
        <div className="h-screen overflow-hidden bg-black text-white">
          <div className="flex w-full">
            <Sidebar
              view={view}
              setView={setView}
              setGlobalPlaylistId={setGlobalPlaylistId}
            />
            {view === "playlist" && (
              <PlaylistView
                globalPlaylistId={globalPlaylistId}
                setGlobalCurrentSongId={setGlobalCurrentSongId}
                setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
              />
            )}
            {view === "search" && (
              <Search
                setView={setView}
                setGlobalPlaylistId={setGlobalPlaylistId}
              />
            )}
            {view === "library" && (
              <Library
                setView={setView}
                setGlobalPlaylistId={setGlobalPlaylistId}
              />
            )}
            {view === "artist" && <Artist />}
          </div>
        </div>
        <div className="sticky z-20 bottom-0 w-full">
          <Player
            globalCurrentSongId={globalCurrentSongId}
            setGlobalCurrentSongId={setGlobalCurrentSongId}
            setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
            globalIsTrackPlaying={globalIsTrackPlaying}
          />
        </div>
      </main>
    </>
  );
}
