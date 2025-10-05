interface LeagueIconProps {
  league: string;
  className?: string;
}

export function LeagueIcon({ league, className = "w-8 h-8" }: LeagueIconProps) {
  const getLeagueImage = (league: string) => {
    switch (league) {
      case 'Bronce':
        return 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759390880012-898bd301a4330b38bcd6a7f755d14b6a.png';
      case 'Plata':
        return 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759383168353-c587f969d326fda9bc86c5828da24c8d.png';
      case 'Oro':
        return 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759442123452-4e49b41246503707ca461ce79472c9da.png';
      case 'Diamante':
        return 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759442437285-913b58e5bb9ac72d96841bf34eb7a288.png';
      default:
        return null;
    }
  };

  const imageUrl = getLeagueImage(league);

  if (!imageUrl) {
    return null;
  }

  return (
    <img
      src={imageUrl}
      alt={`${league} League`}
      className={`${className} object-contain`}
      onError={(e) => {
        e.currentTarget.style.display = 'none';
      }}
    />
  );
}
