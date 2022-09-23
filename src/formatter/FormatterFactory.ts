import Formatter from './Formatter'
import SettingsBundle, {
  SettingBundlesDetailFormatter
} from './ios/SettingsBundle'
import LicenseToolsPlugin from './android/LicenseToolsPlugin'
import Format from '../models/Format'
import AboutLibraries from './android/AboutLibraries'
import FileWriter from '../writer/FileWriter'
import AboutLibrariesJson from './android/AboutLibrariesJson'

export default class FormatterFactory {
  static create(opt: CmdOption): Formatter {
    const writer = new FileWriter()
    switch (opt.format) {
      case Format.SettingsBunddle:
        return new SettingsBundle(
          opt,
          writer,
          new SettingBundlesDetailFormatter(writer, opt)
        )
      case Format.LicenseToolsPlugin:
        return new LicenseToolsPlugin(opt, writer)
      case Format.AboutLibraries:
        return new AboutLibraries(opt, writer)
      case Format.AboutLibrariesJson:
        return new AboutLibrariesJson(opt, writer)
      default: {
        throw new Error(
          `invalid format [${
            opt.format
          }] given. [${Format.getSupportedFormats()}] are valid.`
        )
      }
    }
  }
}
