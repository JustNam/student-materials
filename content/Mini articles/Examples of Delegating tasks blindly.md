1. A very simple promt requests AI to refresh the page after switching workspace

```tsx
  const handleSelectWorkspace = (workspace: IWorkspaceModel) => {
    setCurrentWorkspace(workspace);
    handleClose();

    // Force page reload to ensure all data is refreshed with new workspace context
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };
```

1. In most cases, there is an `if` to check if the variable exists before using it
2. But in this case, users can only use `handleSelectWorkspace` when window is loaded completely, `if` claude is totally unnecessary
