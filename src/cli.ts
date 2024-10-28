import { analyzePhrase } from './analyze-phrase';
import { animais } from "../dicts/tree.json";

const args = process.argv;

const phraseIndex = args.findIndex(arg => arg == "--phrase");
const depthIndex = args.findIndex(arg => arg == "--depth");
const verboseIndex = args.findIndex(arg => arg == "--verb");


if (phraseIndex === -1 || depthIndex === -1) {
  console.error('Usage: --phrase "{phrase}" --depth <n> [--verbose]');
  process.exit(1);
}

const phrase = args[phraseIndex + 1];
const depth = parseInt(args[depthIndex + 1]);
const verbose = verboseIndex !== -1;

const { result, analysisTime } = analyzePhrase({
  depth,
  phrase,
  tree: animais as any
})


if (verbose) {
  console.table([
    { 'Métrica': 'Tempo de carregamento dos parâmetros (ms)', 'Valor': analysisTime },
    { 'Métrica': 'Tempo de verificação da frase (ms)', 'Valor': analysisTime.toPrecision(1) }
  ]);
}

if (Object.keys(result).length === 0) {
  console.log('Output: 0');
} else {
  const output = Object.entries(result)
    .map(([chave, count]) => `${chave.charAt(0).toUpperCase() + chave.slice(1)} = ${count}`)
    .join('; ');
  console.log(`Output: ${output}`);
}

