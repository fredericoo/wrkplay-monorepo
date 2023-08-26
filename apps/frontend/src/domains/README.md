# Domains

The domains folder contains all the domains of the application. Please abide to the naming standards:

```
📁 domains/
│
├── 📁 error/
│   ├── components/
│   │   ├── ⚛️ ErrorView.tsx
│   │   └── index.ts
│   ├── error.hooks.ts
│   ├── error.utils.ts
│   └── error.constants.ts
…
```

## Dos and Don'ts

- ✅ export everything in a subfolder from its `index.ts` file for neat imports
- ✅ create new files if the current structure is not enough
- ✅ import from other domains into your domain
- ❌ create pages or routes inside domains
