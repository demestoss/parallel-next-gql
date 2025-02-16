import { gql } from "urql";

export const SigninMutation = `#graphql
    mutation Signin($input: AuthInput!) {
        signin(input: $input) {
            token
        }
    }
`;
