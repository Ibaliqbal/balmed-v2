import SearchLatestView from "@/views/search/search-latest-view";
import SearchMediaView from "@/views/search/search-media-view";
import SearchPeopleView from "@/views/search/search-people-view";
import SearchTopView from "@/views/search/search-top-view";
import TabNavigation from "@/layouts/search/tab-search-navigation";
import HeaderWithBack from "@/components/header/header-with-back";
import Search from "@/components/form/form-search";
import type { Metadata } from "next";
import { seo } from "@/utils/helpers";

export const generateMetadata = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Metadata => {
  const query = decodeURIComponent(searchParams.q as string);
  const filter = decodeURIComponent(searchParams?.f as string);
  const title = `${decodeURIComponent(searchParams.q as string)} - Search / BM`;
  const description = "Discover new trends and topics in the balmed community.";
  const keywords = ["search", "community", "trends"];

  return seo(
    title,
    description,
    `search?q=${query}${filter !== "undefined" ? `&f=${filter}` : ""}`,
    keywords
  );
};

const page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const query = decodeURIComponent(searchParams.q as string);
  const filter = decodeURIComponent(searchParams?.f as string);
  return (
    <>
      <HeaderWithBack>
        <div className="w-full">
          <Search className="w-full" defaultValue={query} />
        </div>
      </HeaderWithBack>
      <TabNavigation query={query} filter={filter} />
      <section className="lg:border-x-2 border-slate-700">
        {filter ? (
          filter === "latest" ? (
            <SearchLatestView query={query} />
          ) : filter === "people" ? (
            <SearchPeopleView query={query} />
          ) : filter === "media" ? (
            <SearchMediaView query={query} />
          ) : (
            <SearchTopView query={query} />
          )
        ) : (
          <div className="w-ful flex items-center justify-center text-xl pt-4">
            Invalid Query
          </div>
        )}
      </section>
    </>
  );
};

export default page;
