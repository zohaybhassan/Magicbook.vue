// import { createMachine, assign } from 'xstate';

// export const authMachine = createMachine({
//   id: 'authMachine',
//   initial: 'loggedOut',
//   context: {
//     user: null,
//     email: '',
//     password: '',
//     error: null,
//     books: null
//   },
//   states: {
//     loggedOut: {
//       on: {
//         LOGIN: { target: 'loggingIn', actions: 'assignCredentials' },
//         SIGN_UP: { target: 'signingUp', actions: 'assignCredentials' },
//         AUTO_LOGIN: 'loggedIn'
//       }
//     },
//     loggingIn: {
//       invoke: {
//         src: 'authenticate',
//         onDone: {
//           target: 'loggedIn',
//           actions: 'setUser'
//         },
//         onError: {
//           target: 'loggedOut',
//           actions: 'setError'
//         }
//       }
//     },
//     signingUp: {
//       invoke: {
//         src: 'registerUser',
//         onDone: {
//           target: 'loggedIn',
//           actions: 'setUser'
//         },
//         onError: {
//           target: 'loggedOut',
//           actions: 'setError'
//         }
//       }
//     },
//     loggedIn: {
//       on: {
//         LOGOUT: 'loggedOut',
//         FETCH_BOOKS: 'fetchingBooks'
//       }
//     },
//     fetchingBooks: {
//       invoke: {
//         src: 'fetchBooks',
//         onDone: {
//           target: 'loggedIn',
//           actions: 'setBooks'
//         },
//         onError: {
//           target: 'loggedIn',
//           actions: 'setError'
//         }
//       }
//     }
//   }
// }, {
//   actions: {
//     assignCredentials: assign((context, event) => ({
//       email: event.email,
//       password: event.password
//     })),
//     setUser: assign({
//       user: (context, event) => event.data,
//       error: null
//     }),
//     setError: assign({
//       error: (context, event) => event.data
//     }),
//     setBooks: assign({
//       books: (context, event) => event.data
//     })
//   },
//   services: {
//     authenticate: async (context, event) => {
//       const { email, password } = context;
//       if (email === 'admin@example.com' && password === 'admin123') {
//         // Simulate successful admin login
//         return { email: context.email, isAdmin: true };
//       } else {
//         // Simulate an authentication error
//         throw new Error('Invalid credentials');
//       }
//     },
//     registerUser: async (context, event) => {
//       // Call your signup API
//     },
//     fetchBooks: async (context, event) => {
//       // Call your fetch books API
//     }
//   }
// });
