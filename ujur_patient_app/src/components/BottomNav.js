
              
              
              import React from 'react';
              import { NavBar, TabBar } from 'antd-mobile';
              import { Route, Switch, useLocation, MemoryRouter as Router, } from 'react-router-dom';
              import { AppOutline, MessageOutline, UnorderedListOutline, UserOutline, } from 'antd-mobile-icons';
import { useRouter } from '../hooks/use-router';
              const Bottom = () => {
                  const location = useLocation();
                  const router = useRouter();
                  const { pathname } = location;
                  const setRouteActive = (value) => {
                    router.push(value)
                  };
                  const tabs = [
                      {
                          key: '/home',
                          title: 'Home',
                          icon:               <span className="mdi mdi-home-variant-outline mdi-24px"></span>

                      },
                      {
                          key: '/view-appointments',
                          title: 'Appointment',
                          icon: <span className="mdi mdi-book-outline mdi-24px"></span>,
                      },
                      {
                          key: '/customer-profile',
                          title: 'Profile',
                          icon: <span className="mdi mdi-account-outline mdi-24px"></span>,
                      },
                    
                  ];
                  return (<TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
                    {tabs.map(item => (<TabBar.Item key={item.key} icon={item.icon} title={item.title}/>))}
                  </TabBar>);
              };
              export default () => {
                  return (
              
                      <div style={{
                          position:"fixed",
                          bottom:"0rem",
                          width:"100vw",
                          background:"white"
                      }} className='footer-bottom-check'>
                        <Bottom />
                      </div>
              )
              };
              function Home() {
                  return <div>首页</div>;
              }
              function Todo() {
                  return <div>待办</div>;
              }
              function Message() {
                  return <div>消息</div>;
              }
              function PersonalCenter() {
                  return <div>我的</div>;
              }
              