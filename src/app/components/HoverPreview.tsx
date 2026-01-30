"use client";

type Props = {
  videoKey: string;
};

export default function HoverPreview({ videoKey }: Props) {
  return (
    <div className="absolute inset-0 bg-black z-20 rounded overflow-hidden">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoKey}`}
        allow="autoplay"
      />
    </div>
  );
}
