import React, { Component } from "react";
import { graphql } from "react-apollo";
import currrentUserQuery from "../queries/CurrentUser";
import { hashHistory } from "react-router";

export default (WrappedComponent) => {
  class requireAuth extends Component {
    componentWillUpdate(nextProps) {
      if (!nextProps.data.loading && !nextProps.data.user) {
        hashHistory.push("/login");
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(currrentUserQuery)(requireAuth);
};
