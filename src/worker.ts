import { init, parse } from 'es-module-lexer'
import { runAsWorker } from 'sync-threads'

runAsWorker(async (content) => {
  await init
  return parse(content)
})