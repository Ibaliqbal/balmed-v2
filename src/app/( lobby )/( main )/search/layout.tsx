import MainSection from "@/layouts/main-section";
import RightSide from "@/layouts/right-side";
import RightSearch from "@/layouts/search/right-search";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainSection>{children}</MainSection>
      <RightSide>
        <RightSearch />
      </RightSide>
    </>
  );
};

export default layout;
