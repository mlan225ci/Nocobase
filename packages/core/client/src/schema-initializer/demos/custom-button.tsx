import React from 'react';
import { Application, Plugin, SchemaInitializer, useApp } from '@nocobase/client';
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Avatar, AvatarProps } from 'antd';

const myInitializer = new SchemaInitializer<AvatarProps>({
  name: 'MyInitializer',
  designable: true,
  // 使用自定义组件代替默认的 Button
  Component: (props) => (
    <Avatar style={{ cursor: 'pointer' }} {...props}>
      C
    </Avatar>
  ),
  // 传递给 Component 的 props
  componentProps: {
    size: 'large',
  },
  items: [
    {
      name: 'hello',
      Component: () => <div>hello</div>,
    },
  ],
});

const Root = () => {
  const app = useApp();
  const { exists, render } = app.schemaInitializerManager.getRender('MyInitializer');
  if (!exists) return null;
  return (
    <div>
      <div>
        <div>初始化时自定义 Component</div>
        {render()}
      </div>
      <Divider />
      <div>
        <div>通过 render 更改</div>
        {render({ Component: () => <PlusOutlined style={{ cursor: 'pointer' }} /> })}
      </div>
      <Divider />
      <div>
        <div>不使用 dropdown</div>
        {render({ noPopover: true, componentProps: { onClick: () => alert('test') } })}
      </div>
    </div>
  );
};

class MyPlugin extends Plugin {
  async load() {
    this.app.schemaInitializerManager.add(myInitializer);
    this.app.router.add('root', {
      path: '/',
      Component: Root,
    });
  }
}

const app = new Application({
  router: {
    type: 'memory',
    initialEntries: ['/'],
  },
  plugins: [MyPlugin],
});

export default app.getRootComponent();