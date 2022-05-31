import path from 'path'
import jsConfig from './jsconfig.json'

module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [ 'module-resolver', { root: [path.resolve(jsConfig.compilerOptions.baseUrl)]}]
  ]
}
