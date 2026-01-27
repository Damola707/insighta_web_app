import logoImage from '../assets/Insighta_logo.png';

export function InsightaLogo({ size = 40, className = '' }) {
  return (
    <img
      src={logoImage}
      alt="Insighta Logo"
      width={size}
      height={size}
      className={`${className}`}
      style={{ aspectRatio: '1/1', objectFit: 'contain' }}
    />
  );
}

export function InsightaLogoWithText({ size = 40, className = '' }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <InsightaLogo size={size} />
      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
        Insighta
      </span>
    </div>
  );
}
