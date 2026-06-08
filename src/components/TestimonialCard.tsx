interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  company: string;
  featured?: boolean;
}

function QuoteMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="40"
      height="32"
      viewBox="0 0 40 32"
      fill="currentColor"
    >
      <path d="M12.8 0C5.728 0 0 5.728 0 12.8c0 10.752 9.6 19.2 19.2 19.2l1.6-6.4C14.4 25.6 6.4 20.48 6.4 12.8h6.4c3.52 0 6.4-2.88 6.4-6.4S16.32 0 12.8 0zm20.8 0c-7.072 0-12.8 5.728-12.8 12.8 0 10.752 9.6 19.2 19.2 19.2l1.6-6.4C35.2 25.6 27.2 20.48 27.2 12.8h6.4c3.52 0 6.4-2.88 6.4-6.4S37.12 0 33.6 0z" />
    </svg>
  );
}

export function TestimonialCard({
  quote,
  name,
  title,
  company,
  featured = false,
}: TestimonialCardProps) {
  if (featured) {
    return (
      <div className="rounded-2xl bg-tt-black p-10 md:p-14">
        <QuoteMark className="mb-6 text-tt-teal" />
        <blockquote className="text-2xl font-medium leading-relaxed text-white">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="mt-8">
          <p className="font-semibold text-white">{name}</p>
          <p className="text-sm text-tt-gray-400">
            {title}, {company}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-tt-gray-100 p-8">
      <QuoteMark className="mb-4 text-tt-teal/40" />
      <blockquote className="text-lg leading-relaxed text-tt-gray-700">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="mt-6">
        <p className="font-semibold text-tt-gray-900">{name}</p>
        <p className="text-sm text-tt-gray-500">
          {title}, {company}
        </p>
      </div>
    </div>
  );
}
