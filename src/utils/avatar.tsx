import { useMemo } from 'react';
import Image from 'next/image';

const randomBg = () => {
  const colors = [
    { bgColor: '0D8ABC', textColor: 'fff' },
    { bgColor: 'E83A30', textColor: 'fff' },
    { bgColor: 'F39C12', textColor: 'fff' },
    { bgColor: '27AE60', textColor: 'fff' },
    { bgColor: '8E44AD', textColor: 'fff' },
    { bgColor: 'F1C40F', textColor: '000' },
    { bgColor: 'D35400', textColor: 'fff' },
    { bgColor: 'C0392B', textColor: 'fff' },
    { bgColor: '16A085', textColor: 'fff' },
    { bgColor: '2980B9', textColor: 'fff' },
    { bgColor: '2C3E50', textColor: 'fff' },
    { bgColor: 'E67E22', textColor: '000' },
    { bgColor: 'E74C3C', textColor: 'fff' },
    { bgColor: 'ECF0F1', textColor: '000' },
    { bgColor: '95A5A6', textColor: '000' },
    { bgColor: 'F39C12', textColor: 'fff' },
    { bgColor: 'D35400', textColor: 'fff' },
    { bgColor: 'C0392B', textColor: 'fff' },
    { bgColor: 'BDC3C7', textColor: '000' },
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

const Avatar = (name: string) => {
  const { bgColor, textColor } = useMemo(() => randomBg(), []);

  return (
    <div
      className={`relative flex items-center justify-center h-10 w-10 rounded-full bg-${bgColor}`}
    >
      <Image
        src={`https://ui-avatars.com/api/?background=${bgColor}&color=${textColor}&name=${name}`}
        alt={name}
        width={40}
        height={40}
        className="rounded-full"
      />
    </div>
  );
};

export default Avatar;
