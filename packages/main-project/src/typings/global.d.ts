import type auth from '@/plugins/auth'
import type cache from '@/plugins/cache'
import type modal from '@/plugins/modal'
import type tab from '@/plugins/tab'
import type download from '@/plugins/download'
import type { useDict } from '@/utils/dict'
import type { download as utilsDownload } from '@/utils/request'
import type {
  addDateRange,
  handleTree,
  parseTime,
  resetForm,
  selectDictLabel,
  selectDictLabels
} from '@/utils/ruoyi'

export {}
declare module 'vue' {
  interface ComponentCustomProperties {
    useDict: typeof useDict
    download: typeof utilsDownload
    parseTime: typeof parseTime
    resetForm: typeof resetForm
    handleTree: typeof handleTree
    addDateRange: typeof addDateRange
    selectDictLabel: typeof selectDictLabel
    selectDictLabels: typeof selectDictLabels

    $tab: typeof tab
    // 认证对象
    $auth: typeof auth
    // 缓存对象
    $cache: typeof cache
    // 模态框对象
    $modal: typeof modal
    // 下载文件
    $download: typeof download
  }
}

declare global {
  interface Window {
    VConsole: any
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  // interface ImportMeta {}
}
