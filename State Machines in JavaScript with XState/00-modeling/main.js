import '../style.css';

// Create a state machine transition function either using:
// - a switch statement (or nested switch statements)
// - or an object (transition lookup table)

const initialState = { value: 'loading' };
// { value: 'loading' }
function transition(state = initialState, event) {
  switch (state.value) {
    case 'loading':
      if (event.type === 'LOADED') {
        return {
          ...state,
          value: 'playing',
        };
      }
      break;
    case 'playing':
      if (event.type === 'PAUSE') {
        return {
          ...state,
          value: 'paused',
        };
      }
      break;
    case 'paused':
      if (event.type === 'PLAY') {
        return {
          ...state,
          value: 'playing',
        };
      }
      break;
    default:
      throw new Error('This should be impossible!');
  }

  return state;
}

window.transition = transition;

const machine = {
  initial: 'loading',
  states: {
    loading: {
      on: {
        LOADED: 'playing',
      },
    },
    playing: {
      on: {
        PAUSE: 'paused',
      },
    },
    paused: {
      on: {
        PLAY: 'playing',
      },
    },
  },
};

function machineTransition(state = { value: machine.initial }, event) {
  const nextStateValue =
    machine.states[state.value].on?.[event.type] ?? state.status;

  if (!nextStateValue) {
    return state;
  }

  return {
    ...state,
    value: nextStateValue,
  };
}

window.machineTransition = machineTransition;

let currentState = { value: machine.initial };

const service = {
  send: (event) => {
    currentState = machineTransition(currentState, event);
    console.log(currentState);
  },
};

window.service = service;

// Also, come up with a simple way to "interpret" it, and
// make it an object that you can `.send(...)` events to.
