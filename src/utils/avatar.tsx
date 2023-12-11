const Avatar = (name: string) => {
  const getInitials = (name: string) => {
    const words = name.split(' ');
    let initials = '';

    for (let i = 0; i < words.length; ++i) initials += words[i]?.[0] || '';

    return initials.toUpperCase();
  };

  const getRandomBgColor = () => {
    const colors = [
      'bg-pink-600',
      'bg-purple-600',
      'bg-yellow-500',
      'bg-green-500',
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex] || 'bg-gray-200';
  };

  return (
    <div
      className={`${getRandomBgColor()} flex h-12 w-12 flex-none items-center justify-center rounded-lg text-sm font-medium text-white`}
    >
      <span>{getInitials(name)}</span>
    </div>
  );
};

export default Avatar;
