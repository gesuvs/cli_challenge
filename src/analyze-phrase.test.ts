import { analyzePhrase, Props } from './analyze-phrase';
import { animais as tree } from "../dicts/tree.json"

describe('analyzePhrase', () => {
  it('deve encontrar uma correspondência de nível 1', () => {
    const props = {
      tree: tree as any,
      phrase: 'Eu vi leões',
      depth: 4
    } as Props;

    const { result } = analyzePhrase(props);

    expect(result).toEqual({ felinos: 1 });
  });

  it('deve encontrar correspondências de diferentes níveis', () => {
    const props = {
      tree: tree as any,
      phrase: 'Eu vi gorilas e águias',
      depth: 2
    } as Props;

    const { result } = analyzePhrase(props);

    expect(result).toEqual({ rapinas: 1, primatas: 1 });
  });

  it('não deve encontrar correspondências se a profundidade não corresponder', () => {
    const props = {
      tree: tree as any,
      phrase: 'Eu vi tigres',
      depth: 1
    } as Props;

    const { result } = analyzePhrase(props);

    expect(result).toEqual({});
  });


  it('deve retornar resultado vazio se não houver correspondência', () => {
    const props = {
      tree: tree as any,
      phrase: 'Eu vi elefantes',
      depth: 2
    } as Props;

    const { result } = analyzePhrase(props);

    expect(result).toEqual({});
  });

  it('deve lidar com árvore vazia', () => {
    const props = {
      tree: [] as any,
      phrase: 'Eu vi leões',
      depth: 1
    } as Props;

    const { result } = analyzePhrase(props);

    expect(result).toEqual({});
  });

  it('deve analisar um texto com mais de 5000 caracteres', () => {

    const phrase = 'Eu vi Leões Tigres Jaguars Leopardos Cavalos Zebras Asnos Bois Búfalos Antílopes Cabras Gorilas Chimpanzés Orangotangos Águias Falcões Corujas Milhafres Canários Papagaios Pardais Rouxinóis'.repeat(27);

    const props = {
      tree: tree as any,
      phrase,
      depth: 4
    } as Props;


    const { result } = analyzePhrase(props);
    
    expect(phrase.length).toBeGreaterThanOrEqual(5000);
    expect(result).toEqual({ bovideos: 4, equideos: 3, felinos: 4, passaros: 4, primatas: 3, rapinas: 3 });
  });
});
