import {defineCliConfig} from 'sanity/cli'
import {projectId, dataset} from './sanity.proje'

export default defineCliConfig({
  api: {projectId, dataset},
  // Panelin internetteki adresi: https://palacelikmuhendislik.sanity.studio
  studioHost: 'palacelikmuhendislik',
  deployment: {
    appId: 'ue9vvlm90lhmf2ffy2hhifrv',
    // Panel, Sanity'nin yeni sürümlerine kendiliğinden güncellensin
    autoUpdates: true,
  },
})
