import { useState } from "react";

import { MainLayout } from "../layouts/MainLayout";
import { UsersTableMui } from "../components/UsersTableBasic/UsersTableMui";

export const Root = () => {
  return (
    <div>
      <UsersTableMui></UsersTableMui>
    </div>
  );
};
