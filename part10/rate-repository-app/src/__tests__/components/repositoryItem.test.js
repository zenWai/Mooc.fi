import React from 'react';
import {render, screen} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import RepositoryList from '../../components/RepositoryList';
import useRepositories from '../../hooks/useRepositories';

// Mock the useRepositories hook
jest.mock('../../hooks/useRepositories');
// Turns 1000's into 1k
const formatNumber = (num) => {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      useRepositories.mockReturnValue({
        repositories,
        loading: false,
      });

      render(<RepositoryList/>);

      const repositoryItems = screen.getAllByTestId('repositoryItem');

      repositories.edges.forEach((edge, index) => {
        const node = edge.node;
        const repoItem = repositoryItems[index];

        expect(repoItem).toHaveTextContent(node.fullName);
        expect(repoItem).toHaveTextContent(node.description);
        expect(repoItem).toHaveTextContent(node.language);

        // Use formatNumber for formatted values 1k
        expect(repoItem).toHaveTextContent(formatNumber(node.forksCount));
        expect(repoItem).toHaveTextContent(formatNumber(node.stargazersCount));
        expect(repoItem).toHaveTextContent(formatNumber(node.ratingAverage));
        expect(repoItem).toHaveTextContent(formatNumber(node.reviewCount));
      });
    });
  });
});