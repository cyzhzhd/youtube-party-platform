import { gql } from '@apollo/client';

export const userFragment = {
  user: gql`
    fragment UserDetail on UserDetail {
      _id
      uid
      nickName
      status
      bookmarkedParties {
        partyId
        partyName
        numCurrentUser
        numBookmarkedUser
        thumbnail
      }
      friendList {
        _id
        uid
        nickName
        status
        partyName
      }
      joinedTime
    }
  `,
};

export const GET_USER = gql`
  query GetUser {
    user {
      ...UserDetail
    }
  }
  ${userFragment.user}
`;

export const SIGN_UP_USER = gql`
  mutation SignUpUser($id: String!, $password: String!, $nickName: String!) {
    signUpUser(id: $id, password: $password, nickName: $nickName) {
      success
      message
      user {
        ...UserDetail
      }
    }
  }
  ${userFragment.user}
`;
