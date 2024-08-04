import Link from "next/link";

const TabNavigation = ({
  query,
  filter,
}: {
  query: string;
  filter: string;
}) => {


  // Add your tab navigation code here
  const navigate = [
    {
      title: "Top",
      href: `/search?q=${encodeURIComponent(query)}`,
      active: filter === "undefined",
    },
    {
      title: "Latest",
      href: `/search?q=${encodeURIComponent(query)}&f=latest`,
      active: filter === "latest",
    },
    {
      title: "People",
      href: `/search?q=${encodeURIComponent(query)}&f=people`,
      active: filter === "people",
    },
    {
      title: "Media",
      href: `/search?q=${encodeURIComponent(query)}&f=media`,
      active: filter === "media",
    },
  ];

  return (
    <div
      className={`grid grid-cols-${
        navigate.length ? navigate.length : "1"
      } border-b-2 border-x-2 border-slate-700 `}
    >
      {navigate.map((nav, i) => (
        <div
          className="w-full flex items-center justify-center"
          key={nav.title}
        >
          <Link
            href={nav.href}
            className={`h-full py-5 px-3 cursor-pointer ${
              nav.active ? "border-b-[3px] border-b-sky-600" : ""
            }`}
          >
            {nav.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TabNavigation;
