import React from 'react';
import './main.css'
import logo from "../../sources/logo.svg";

import { Menu, Icon, Layout, Avatar, Dropdown, Modal } from 'antd';
import { Redirect } from "react-router-dom";
import { store } from '../../store/store'
const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;
const confirm = Modal.confirm;
class MainLayOut extends React.Component {
    state = {
        collapsed: false,
        visible: false,
        redirectToLogin: false
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    handleMenuClick = e => {
        const self = this;
        switch (Number(e.key)) {
            case 1:
                break;
            case 2:
                confirm({
                    title: '提示',
                    content: '确定要退出登录吗?',
                    okText: '确定',
                    cancelText: '取消',
                    onOk() {
                        store.dispatch({
                            type: 'setUser',
                            filter: {}
                        })
                        setTimeout(() => {
                            self.setState({ redirectToLogin: true });
                        }, 1000)
                        self.setState({ visible: false });
                    },
                    onCancel() {
                        self.setState({ visible: false });
                    },
                });
                break;
            default:
                break;
        }
    };
    handleVisibleChange = flag => {
        this.setState({ visible: flag });
    };
    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key={1}>消息中心</Menu.Item>
                <Menu.Item key={2}>退出登录</Menu.Item>
            </Menu>
        );
        if (this.state.redirectToLogin) return <Redirect to="/" />;
        return (
            <div className="main-page">
                <Layout className="page-layout">
                    <Sider theme="light" trigger={null} collapsible collapsed={this.state.collapsed} className="left-nav-container">
                        <div className="left-header">
                            <img src={logo} alt="logo"/>
                        </div>
                        <div className="left-nav">
                            <Menu
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                mode="inline"
                                theme="light"
                                inlineCollapsed={this.state.collapsed}
                            >
                                <Menu.Item key="1">
                                    <Icon type="pie-chart" />
                                    <span>文档</span>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Icon type="desktop" />
                                    <span>QQ群</span>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Icon type="inbox" />
                                    <span>组件</span>
                                </Menu.Item>
                                <SubMenu
                                    key="sub1"
                                    title={
                                        <span>
                                            <Icon type="mail" />
                                            <span>上传数据</span>
                                        </span>
                                    }
                                >
                                    <Menu.Item key="5">上传csv文件</Menu.Item>
                                    <Menu.Item key="6">粘贴表格数据</Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub2"
                                    title={
                                        <span>
                                            <Icon type="appstore" />
                                            <span>excel</span>
                                        </span>
                                    }
                                >
                                    <Menu.Item key="9">上传excel</Menu.Item>
                                    <Menu.Item key="10">导出excel</Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub3"
                                    title={
                                        <span>
                                            <Icon type="appstore" />
                                            <span>多级菜单</span>
                                        </span>
                                    }
                                >
                                    <Menu.Item key="9">menu-1</Menu.Item>
                                    <Menu.Item key="10">menu-2</Menu.Item>
                                    <SubMenu
                                        key="sub4"
                                        title={
                                            <span>menu-3</span>
                                        }
                                    >
                                        <Menu.Item key="11">menu3-1</Menu.Item>
                                        <Menu.Item key="12">menu3-2</Menu.Item>
                                    </SubMenu>
                                </SubMenu>
                            </Menu>
                        </div>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                            <div className="user-header">
                                <Dropdown
                                    overlay={menu}
                                    onVisibleChange={this.handleVisibleChange}
                                    visible={this.state.visible}
                                >
                                    <Avatar icon="user" size={50} className="user-avatar" />
                                </Dropdown>
                            </div>
                        </Header>
                        <Content
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                background: '#fff',
                            }}
                        >
                            Content
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by eveningwater</Footer>
                    </Layout>
                </Layout>
            </div>

        );
    }
}

class Main extends React.Component {
    render() {
        return (
            <div className="main">
                <MainLayOut />
            </div>
        )
    }
}


export default Main;