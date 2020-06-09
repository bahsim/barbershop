import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

import { List } from './components/list'
import { Header } from './components/header'
import { fetchData } from "../modules/global";

class MainBase extends Component {
  state = {
    hasMore: true,
    step: 1,
  }

  componentDidMount() {
    const { fetchData } = this.props
    
    fetchData()
  }

  loadMore = async (callback) => {
    const { fetchData } = this.props
    const { step: oldStep, list: oldList } = this.state;

    const step = oldStep + 1;
    const hasMore = step < 2;

    await fetchData()

    this.setState({ step, hasMore }, () => callback());
  }

  render() {
    const { data } = this.props
    const { hasMore } = this.state

    return (
      <Container>
        <Header />
        <List
          data={data}
          hasMore={hasMore}
          loadMore={this.loadMore}
        />
      </Container>
    )
  }
}

const mapStateTopProps = ({ 
  global: { 
    data,
  },
}) => ({
  data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchData())
});

export const Main = connect(mapStateTopProps, mapDispatchToProps)(MainBase)