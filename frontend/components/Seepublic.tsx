import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { FaMoon, FaSun } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { baseUrl } from "../config/api.js";
import { Oval } from "react-loader-spinner";

interface Playlist {
  id: string;
  playlistName: string;
  movies: Movie[];
  visibility: boolean;
  username: string;
}

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const Seepublic: React.FC = () => {
  const [publicPlaylists, setPublicPlaylists] = useState<Playlist[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [playlistVisibility, setPlaylistVisibility] = useState<{
    [key: string]: boolean;
  }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const apiUrl = `${baseUrl}/api/movies/search/playlists`;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublicPlaylists = async () => {
      try {
        const response: AxiosResponse<{ playlists: Playlist[] }> =
          await axios.get(apiUrl);
        setPublicPlaylists(response.data.playlists);
        setPlaylistVisibility(
          Object.fromEntries(
            response.data.playlists.map((playlist) => [playlist.id, false])
          )
        );
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching public playlists:", error);
        setError("An error occurred while fetching public playlists.");
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchPublicPlaylists();
  }, []);

  const handlePlaylistClick = (playlistId: string) => {
    setPlaylistVisibility((prevState) => ({
      ...prevState,
      [playlistId]: !prevState[playlistId],
    }));
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const goBack = () => {
    navigate("/home");
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-200 text-gray-900"
      }`}
    >
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6">Public Playlists</h2>
        {error && <div className="text-red-500">{error}</div>}
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Oval color="#4f46e5" height={50} width={50} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {publicPlaylists.map((playlist, index) => playlist.movies.length > 0 ? (
              <div
                key={`${playlist.id}-${index}`}
                className={`border border-gray-700 rounded-lg p-4 shadow-lg transition-transform transform-gpu hover:-translate-y-1 hover:shadow-md ${
                  theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-900"
                } ${
                  playlistVisibility[playlist.id]
                    ? "translate-y-1 shadow-md"
                    : ""
                }`}
                onClick={() => handlePlaylistClick(playlist.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold">
                    {playlist.playlistName}
                  </span>
                  <span className="text-sm text-gray-400">
                    by {playlist.username}
                  </span>
                </div>
                <button className="text-blue-400 hover:text-blue-600">
                  {playlistVisibility[playlist.id]
                    ? "Hide Movies"
                    : "Show Movies"}
                </button>
                {playlistVisibility[playlist.id] && (
                  <div className="mt-4">
                    {playlist.movies.map((movie) => (
                      <div
                        key={movie.imdbID}
                        className="flex items-center gap-4 my-2"
                      >
                        <img
                          src={movie.Poster}
                          alt={`Poster for ${movie.Title}`}
                          className="w-16 h-24 object-cover rounded shadow-md"
                        />
                        <div className="flex flex-col">
                          <span className="text-lg font-semibold">
                            {movie.Title}
                          </span>
                          <span className="text-sm text-gray-400">
                            {movie.Year}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : null)}
          </div>
        )}
        <button
          onClick={toggleTheme}
          className="fixed top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {theme === "dark" ? (
            <FaSun className="w-6 h-6" />
          ) : (
            <FaMoon className="w-6 h-6" />
          )}
        </button>
        <button
          onClick={goBack}
          className="fixed top-4 left-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Seepublic;
