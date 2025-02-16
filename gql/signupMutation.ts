import { gql } from "urql";

export const SignupMutation = gql`
    mutation CreateUser($input: AuthInput!) {
        createUser(input: $input) {
            token
        }
    }
`;
