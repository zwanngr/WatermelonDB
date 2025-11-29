import { TurboModuleRegistry, TurboModule } from 'react-native'

export interface Spec extends TurboModule {
  install?: () => void
}

const module = TurboModuleRegistry.get<Spec>('WMDatabaseJSIBridge') || null

export default module

