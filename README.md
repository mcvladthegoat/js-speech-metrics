# @mcvlad/speech-metrics

[![npm (scoped)](https://img.shields.io/npm/v/@mcvlad/speech-metrics.svg)](https://www.npmjs.com/package/@mcvlad/speech-metrics/)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@mcvlad/speech-metrics.svg)](https://www.npmjs.com/package/@mcvlad/speech-metrics/)

Calculates metrics for Speech-To-Text systems. Available metrics: WER, WCR, SER.

## Install

```
$ npm install @mcvlad/speech-metrics
```

## Usage

```js
const calculateMetrics = require("@mcvlad/speech-metrics");

// Each pair consists of: "reference" (input string) and "hypothesis" (output string)
const inputData = [
	[`Indigenous Australians have eaten kangaroos for millenia.`, `Indigenous australian sevington kangaroos for millennia`],
	[`Welcome to Australia.`,`Welcome to australia`]
];

const metrics = calculateMetrics(inputData);
console.log(metrics);

/* =>
{ 
	results: [{
	  hypothesis: "indigenous australian sevington kangaroos for millennia",
	  reference: "indigenous australians have eaten kangaroos for millenia",
	  WCR: 0,
	  WER: 0.5714285714285714
	}, {
	  hypothesis: "welcome to australia",
	  reference: "welcome to australia",
	  WCR: 1,
	  WER: 0
	}],
	SER: 0.5555555555555556,
	WER: 0.22857142857142854,
	WCR: 0.3333333333333335
}
*/
```

## Metrics explanation

**WER** detects the percent of recognition errors.

![WER equation](http://latex.codecogs.com/svg.latex?WER%3D%5Cfrac%7BSubstitutions%2BDeletions%2BInsertions%7D%7BN%7D%2C)

**WCR** detects the percent of correctly recognized words and ignores *Insertion* errors.

![WCR equation](http://latex.codecogs.com/svg.latex?WCR%3D%5Cfrac%7BN%20-%20Substitutions%20+%20Deletions%7D%7BN%7D)

**SER** shows the percent of sentences with 1 or more errors.
