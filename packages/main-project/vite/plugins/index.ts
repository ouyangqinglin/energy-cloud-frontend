import vue from '@vitejs/plugin-vue'

import DefineOptions from 'unplugin-vue-define-options/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import createAutoImport from './auto-import'
import createComponents from './components'
import createSvgIcon from './svg-icon'
import createCompression from './compression'
import createSetupExtend from './setup-extend'
import type { PluginOption } from 'vite'

export default function createVitePlugins(
  viteEnv: Record<string, string>,
  isBuild = false
) {
  const vitePlugins: PluginOption[] = [vue()]
  vitePlugins.push(
    ...[
      visualizer({
        emitFile: true
      }),
      createAutoImport(),
      createSetupExtend(),
      DefineOptions(),
      createSvgIcon(isBuild)
    ]
  )

  isBuild && vitePlugins.push(...createCompression(viteEnv))
  return vitePlugins
}
