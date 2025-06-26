interface DefaultThumbnailProps {
  title: string;
  category: string;
}

export default function DefaultThumbnail({ title, category }: DefaultThumbnailProps) {
  const colors = {
    Frontend: 'from-blue-400 to-blue-600',
    Backend: 'from-green-400 to-green-600',
    DevOps: 'from-purple-400 to-purple-600',
    Database: 'from-red-400 to-red-600',
    기타: 'from-gray-400 to-gray-600',
  };

  const bgGradient = colors[category as keyof typeof colors] || colors['기타'];

  return (
    <div className={`w-full h-full bg-gradient-to-br ${bgGradient} flex items-center justify-center p-6`}>
      <h3 className="text-white text-xl font-bold text-center line-clamp-3 drop-shadow-lg">
        {title}
      </h3>
    </div>
  );
}