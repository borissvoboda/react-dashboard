import React, { Fragment } from "react";
import { TopBar } from "../components/UI/TopBar";

interface ParentCompProps {
    childComp?: React.ReactNode;
  }

export const MainLayout = (props:any) => {
    return (
        <Fragment>
            <TopBar />
            {props.children}
        </Fragment>
    )
}