import ApplicationBar from "./components/AppBar";
import React from "react";
import {useAppSelector} from "./hooks/hooks";
import Loading from "./components/Loading";
import {Backdrop, Container, Toolbar} from "@mui/material";
import SideBar from "./components/Sidebar";
import Table from "./components/Table";

export default function Layout() {
  const loading = useAppSelector(s => s.globalUI.loading);
  if (loading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <Loading />
      </Backdrop>

    )
  }
  return (
    <>
      <ApplicationBar />
      <SideBar />
      <Toolbar />
      <div style={{ width: 'calc(100% - 240px)', minHeight: 100, marginLeft: 240 }}>
        <Container>
          <Table />
        </Container>
      </div>
    </>
  )
}