import {  dedupExchange, fetchExchange } from 'urql';
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from '../generated/graphql';
//import { betterUpdateQuery } from './betterUpdateQuery';
import { cacheExchange } from '@urql/exchange-graphcache';



export const createUrqlClient = (ssrExchange: any)=>({
    url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials:'include' as const,
  },
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        logout: (_result, args, cache, info) => {
          betterUpdateQuery<LogoutMutation, MeQuery>(
            cache,
            { query: MeDocument },
            _result,
            ()=>({me:null})
          )
        },
        login: (_result, args, cache, info) => {
          betterUpdateQuery<LoginMutation, MeQuery>(
            cache,
            { query: MeDocument },
            _result,
            (result, query) => {
              if (result.login.errors) {
                return query
              } else {
                return {
                  me:result.login.user
                }
              }
            }
          )
        },
        register: (_result, args, cache, info) => {
          betterUpdateQuery<RegisterMutation, MeQuery>(
            cache,
            { query: MeDocument },
            _result,
            (result, query) => {
              if (result.register.errors) {
                return query
              } else {
                return {
                  me: result.register.user
                };
              }
            }
          );
        },
      }
    }
  }),ssrExchange,
      fetchExchange]
})

function betterUpdateQuery<T, U>(cache: any, arg1: { query: import("graphql").DocumentNode; }, _result: any, arg3: (result: any, query: any) => any) {
    throw new Error('Function not implemented.');
}
