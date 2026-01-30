"use client";

type Props = {
  videoKey: string;
  onClose: () => void;
};

export default function TrailerModal({ videoKey, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="relative w-[90%] md:w-[70%] aspect-video">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-xl"
        >
          ✕
        </button>

        <iframe
          className="w-full h-full rounded"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  );
}
