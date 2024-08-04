import TabNavigationFollow from "@/layouts/user-profile/tab-follow-navigation";

const layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { user: string };
}) => {
  return (
    <div>
      <TabNavigationFollow user={params.user} />
      {children}
    </div>
  );
};

export default layout;
