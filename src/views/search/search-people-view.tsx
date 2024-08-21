import { getAllUser, searchPeople } from "@/actions/user";
import UserCard from "@/components/user/user-card";
import EmptyPosts from "@/layouts/empty-posts";

const SearchPeopleView = async ({ query }: { query: string }) => {
  const people = await searchPeople(query);
  const allPeople = await getAllUser();

  // Create a set of ids from users
  const userIds = new Set(people.map((user) => user.id));

  // Filter allUsers to exclude those with ids in userIds
  const filteredAllPeople = allPeople?.filter((user) => !userIds.has(user.id));
  return (
    <section className="pt-4 flex flex-col gap-6 px-3">
      {people.length > 0 ? (
        [...people, ...filteredAllPeople].map((user) => (
          <UserCard key={user.id} {...user} />
        ))
      ) : (
        <EmptyPosts>
          <div className="w-full">
            <h1 className="font-bold text-5xl text-center">No result for</h1>
            <p className="font-bold text-4xl text-center">{`"${query}"`}</p>
            <p className="mt-2 text-center">
              Try searching for something else, or check your Search settings to
              see if {"they’re"} protecting you from potentially sensitive
              content.
            </p>
          </div>
        </EmptyPosts>
      )}
    </section>
  );
};

export default SearchPeopleView;
