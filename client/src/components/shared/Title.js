export default function Title({ title, subtitle }) {
  return (
    <div className="pb-5 border-b border-gray-200">
      <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-base text-gray-700 sm:mt-5">{subtitle}</p>
    </div>
  );
}
