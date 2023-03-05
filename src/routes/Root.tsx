import { useState } from "react";

import { MainLayout } from "../layouts/MainLayout";
import { UsersTableBasic } from "../components/UsersTableBasic/UsersTableBasic";

export const Root = () => {
  return (
    <div>
      <UsersTableBasic></UsersTableBasic>
    </div>
  );
};
