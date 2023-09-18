import * as React from 'react';
import { ITestProjectProps } from './ITestProjectProps';
import ManageSmartMetadata from './ManageSmartMetadata';



export default class TestProject extends React.Component<ITestProjectProps, {}> {
  public render(): React.ReactElement<ITestProjectProps> {
    //const { TestListID } = this.props;
    return (
      <div>
        <ManageSmartMetadata AllList={this.props} />
      </div>
    );
  }
}
