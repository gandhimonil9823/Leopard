import React from "react";
import Helmet from "react-helmet";
import { Layout } from "antd";
import { APP_NAME } from "../shared/config";
import Logo from "./components/common/Logo";
import Logout from "./components/common/Logout";
import DataVisualizer from "./components/DataVisualizer";

const {
  Header, Footer, Content
} = Layout;


const App = () => (
  <div>
    <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
    <Layout style={{ height: '100vh' }}>
      <Header className="header">
        <Logo />
        <Logout />
      </Header>
      <Content>
        <DataVisualizer />
      </Content>
      <Footer>
        <span className="text-muted tertiaryBgColor text-bottom">
          © 2018 Xenio Systems
        </span>
      </Footer>
    </Layout>
  </div>
);

export default App;
