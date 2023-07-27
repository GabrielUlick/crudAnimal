import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/pages/home.page'
import DatabaseInit from './src/database/database-init';

export default class App extends React.Component {

  constructor(props: {} | Readonly<{}>) {
    super(props);
    new DatabaseInit
    console.log("initialize database")
  }


  render() {
    return (
      <Home />
    );
  }
}