import React from "react";

const page = ({ params }: { params: { user: string; id: string } }) => {
  return (
    <div>
      Hello {params.user} {params.id} guys
    </div>
  );
};

export default page;
