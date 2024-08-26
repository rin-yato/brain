
date: 23-Aug-2024
status: #status/unprocessed 
type: #type/blog 
area: #area/react 
keyword: #keyword/react #keyword/global-state 

---

# Build your own global state in React

![[09 Media/Pasted image 20240823213739.png]]

Today, we'll explore a simple yet effective approach in creating a simple api for working with global state in react.


## Introducing the `Store` Class

Our solution starts with the `Store` class, a straightforward container for our application's state. It offers methods to get, set, and subscribe to state changes.

```typescript title="store.ts"
export class Store<T> {
  state: T;
  listeners: Set<() => void>;

  constructor(initialState: T) {
    this.state = initialState;
    this.listeners = new Set();
  }

  get() {
    return this.state;
  }

  set(newState: T) {
    this.state = newState;
    this.notify();
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  notify() {
    this.listeners.forEach((listener) => listener());
  }
}
```

The concept behind this is the [Observer pattern](https://www.patterns.dev/vanilla/observer-pattern), where objects (listeners) can subscribe to changes in another object (the store).


## The Power of Hooks: `useStore`

Okay, now that we have the core logic to manage the state, how are we going to make it works with React? It needs to be reactive right? Well, it might be much simpler than you'd think.

```typescript title="use-store.ts"
export function useStore<T>(store: Store<T>) {
  const [_, setRevision] = useState(0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setRevision((revision) => revision + 1);
    });

    return unsubscribe;
  });

  return {
    get value() {
      return store.get();
    },
    set value(newState: T) {
      store.set(newState);
    },
  };
}
```

Well..., that's it! Okay, let's break it down. 

1. The hook receives an instance of the `Store`
2. It subscribes to store, whenever there is any change, it will increment the revision state by 1. This will force the component that uses the hook to re-render (simple yet effective 😆)
3. Finally it returns a getter and setter to read and write to the store

![[09 Media/Video Optimized.gif]]


## So, How do we use it?

First we need to create a store instance. This can be done anywhere.

```typescript title="counter.store.ts"
export const $counter = new Store(0)
```

Let's create some components to use the global state.

```tsx title="counter.tsx"
import { $counter } from './counter.store'
import { useStore } from './use-store'

import { IncrementButton } from './increment-button'
import { DecrementButton } from './decrement-button'

function Counter() {
  const counter = useStore($counter);

  return (
    <div>
      <p>Count: {counter.value}</p>
      <IncrementButton />
      <DecrementButton />
    </div>
  );
}
```

```tsx title="increment-button.tsx"
import { $counter } from './counter.store'
import { useStore } from './use-store'

export function IncrementButton() {
  const counter = useStore($counter);
  
  return (
	  <button onClick={() => counter.value++}>
		  Increment {counter.value}
		</button>
  )
}
```

```tsx title="decrement-button.tsx"
import { $counter } from './counter.store'
import { useStore } from './use-store'

export function DecrementButton() {
  const counter = useStore($counter);
  
  return (
	  <button onClick={() => counter.value--}>
		  Decrement {counter.value}
		</button>
  )
}
```

And that's all you need to do to build your own global state api in React. These components share the same `$counter` state, they will re-render whenever the state changes!

If you've ever worked with `Vue` before, you probably have noticed that the api is very similar to `ref` in `Vue`. Of course, this can be implemented however you want!


## Conclusion

Although this works, it's just a naive implementation for a global state. We can use this to learn and better understand the tooling that we use. 

For bigger and complex application, you'd more likely use something like [Redux](https://redux.js.org/), [MobX](https://mobx.js.org/README.html), or [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction). These are robust toolings, built for scalability.


🍀 *TeeHee!*