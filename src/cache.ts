import { InMemoryCache, makeVar } from '@apollo/client';
import { deepCopy } from './helper/deepCopy';
import { messagesType, QueueItem, UserData, Video } from './types';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        parties: {
          merge(existing, incoming, { readField }) {
            const merged = existing
              ? deepCopy(existing)
              : {
                  cursor: undefined,
                  hasMore: true,
                  parties: {},
                };
            incoming.parties.forEach((item: { __ref: string }) => {
              const id = readField('_id', item) as string;
              merged.parties[id] = item;
            });
            merged.cursor = incoming.cursor;
            merged.hasMore = incoming.hasMore;
            return merged;
          },

          read(existing) {
            if (existing) {
              return {
                cursor: existing.cursor,
                hasMore: existing.hasMore,
                parties: Object.values(existing.parties),
              };
            }
            return undefined;
          },
        },
      },
    },
  },
});

export const messagesVar = makeVar<messagesType[]>([]);
export const socketQueueVar = makeVar<Partial<QueueItem>[]>([]);
export const videoListVar = makeVar<Video[]>([]);
export const currentVideoIdVar = makeVar<string>('');
export const currentVideoTimeVar = makeVar<number>(0);
export const videoTimeReceivedVar = makeVar<boolean>(true);

export const jwtVar = makeVar<string>('');
export const userVar = makeVar<UserData | undefined>(undefined);

export default cache;
