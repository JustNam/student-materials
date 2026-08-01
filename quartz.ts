import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins"

// Keep the default sort (folders before files, alphabetical within each group),
// but always pin the "Setup" folder to the top of the explorer.
ExternalPlugin.Explorer({
  sortFn: (a, b) => {
    if (a.isFolder && a.displayName === "Setup") return -1
    if (b.isFolder && b.displayName === "Setup") return 1

    if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
      return a.displayName.localeCompare(b.displayName, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    }

    return !a.isFolder && b.isFolder ? 1 : -1
  },
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
