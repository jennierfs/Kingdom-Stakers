interface TokenIconProps {
  size?: number;
  className?: string;
  showReverse?: boolean;
  animate?: boolean;
}

const TOKEN_IMAGES = {
  32: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759465778016-6a95d970a9bd227a4b5143cf70f58bc4.png',
  48: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759465741128-b9d92a0daa149ee1090603df8d19e626.png',
  64: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759465703907-bc7c8192bb7ca789ce2e1c899fea4b58.png',
  96: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759465642926-45b0ae6e7b1de2e672c8511f3e681d04.png',
  128: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759465591898-17e7d3eefe437c279cd45af50bc0892f.png'
};

function getTokenImageUrl(size: number): string {
  if (size <= 32) return TOKEN_IMAGES[32];
  if (size <= 48) return TOKEN_IMAGES[48];
  if (size <= 64) return TOKEN_IMAGES[64];
  if (size <= 96) return TOKEN_IMAGES[96];
  return TOKEN_IMAGES[128];
}

export function TokenIcon({ size = 64, className = '', showReverse = false, animate = false }: TokenIconProps) {
  const imageUrl = getTokenImageUrl(size);

  return (
    <div
      className={`relative ${animate ? 'token-flip' : ''} ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={imageUrl}
        alt="Bugs Bunny Token"
        width={size}
        height={size}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
