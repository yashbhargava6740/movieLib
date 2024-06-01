import React, { useState, Suspense } from 'react';
import { useMovieStore } from '../src/zstand/store.js';
import PlaylistDialog from './PlaylistDialog.tsx';

const MovieCard = React.lazy(() => import('./MovieCard'));

type Props = {};

export const Movies: React.FC<Props> = () => {
  const { searchResults } = useMovieStore();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  const handleShowDialog = (movieId: string) => {
    setSelectedMovieId(movieId);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setSelectedMovieId(null);
  };

  return (
    <div className="w-full h-full rounded-sm bg-red-200/0 flex justify-center">
      <div className="flex justify-center flex-wrap gap-10">
        <Suspense fallback={<span>✅✅✅✅</span>}>
          {Array.isArray(searchResults) && searchResults.length === 0 ? (
            <div className="flex flex-col justify-center items-center">
              <span className="text-gray-400 text-2xl font-semibold">Nothing here!</span>
              <span className="text-gray-500 text-base font-semibold">
                Start typing to search...
              </span>
            </div>
          ) : (
            Array.isArray(searchResults) &&
            searchResults.map((movie: any, index: number) => (
              <MovieCard key={index} movie={movie} onShowDialog={handleShowDialog} />
            ))
          )}
        </Suspense>
      </div>
      {showDialog && selectedMovieId && (
        <PlaylistDialog movieId={selectedMovieId} onClose={handleCloseDialog} />
      )}
    </div>
  );
};
