import { gql } from "urql";

export const IssuesQuery = gql`
    query IssuesQuery($input: IssuesFilterInput) {
        issues(input: $input) {
            id
            content
            name
            status
        }
    }
`;
