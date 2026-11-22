type BadgeVariant = 'warning' | 'info' | 'error';

type BadgeProps = {
  type: BadgeVariant;
  title: string;
  className?: string;
};

const typeClasses: Record<BadgeVariant, string> = {
  warning: 'bg-amber-500',
  info: 'bg-cyan-600',
  error: 'bg-rose-500',
};

const Badge = ({ type, title, className = '' }: BadgeProps) => {
  return (
    <div
      className={`text-white rounded-full ${typeClasses[type]} ${className}`}
    >
      {title}
    </div>
  );
};

export default Badge;
