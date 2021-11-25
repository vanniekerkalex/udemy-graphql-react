import React, { Component } from "react";
import AuthForm from "./AuthForm";
import mutation from "../mutations/Login";
import { graphql } from "react-apollo";
import query from "../queries/CurrentUser";
import { hashHistory } from "react-router";

export class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
    };
  }

  componentWillUpdate(nextProps) {
    // When the component updates / rerenders
    // this.props // the old, current set of props
    // this.nextProps // the next set of props that will replace this.props
    if (!this.props.data.user && nextProps.data.user) {
      hashHistory.push("/dashboard");
    }
  }

  onSubmit({ email, password }) {
    this.props
      .mutate({
        variables: {
          email,
          password,
        },
        refetchQueries: [{ query }],
      })
      .catch((res) => {
        const errors = res.graphQLErrors.map((err) => err.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm
          onSubmit={this.onSubmit.bind(this)}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default graphql(query)(graphql(mutation)(LoginForm));
