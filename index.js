const calculate = (data) => { 
        if (Object.prototype.toString.call(data) !== '[object Array]') throw new TypeError("Speech-metrics module needs an array!");
        const removePunctuation = (str) => str.replace(/(~|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g, "");

        let result = [],
            SER = 0,
            WCRavg = 0, 
            WERavg = 0;

        data.forEach((item, index, arr) => {
            if (item.length !== 2) {
                throw new TypeError("All array elements should be an array with length 2.");
            }
            let r = removePunctuation(item[0].toLowerCase().trim()).split(' '),
                h = removePunctuation(item[1].toLowerCase().trim()).split(' ');

            let deletion = 0, substitution = 0, insertion = 0, correct = 0;
            let d = [...Array(r.length + 1)].map((x) => {
                return Array(h.length + 1).fill(0);
            });

            for(let i = 0; i < r.length; i++) {
                for(let j = 0; j < h.length; j++) {
                    if (i == 0) {
                        d[0][j] = j;
                    } else if (j == 0) {
                        d[i][0] = i;
                    }
                }
            }
          
            for(let i = 1; i < r.length + 1; i++) {
                for(let j = 1; j < h.length + 1; j++) {
                    if (r[i-1] == h[j-1]) {
                        d[i][j] = d[i-1][j-1];
                    } else {
                        substitution = d[i - 1][j - 1] + 1;
                        insertion = d[i][j - 1] + 1;
                        deletion = d[i - 1][j] + 1;
                        d[i][j] = Math.min(substitution, insertion, deletion);
                    }
                }
            }

            let WER = d[r.length][h.length] / r.length,
                WCR = 0,
                x = r.length,
                y = h.length;

            while (true) {
                if (x == 0 || y == 0) {
                    break;
                }

                if (r[x - 1] == h[y - 1]) {
                    x--;
                    y--;
                    WCR++;
                }
            }

            if (WER > 0) {
                SER++;
            }

            WERavg += WER;
            WCRavg += WCR;

            WCR /= r.length;
            result.push({
                "reference": r.join(" "), 
                "hypothesis": h.join(" "),
                WER,
                WCR
            });
        });

        WERavg /= data.length;
        WCRavg /= data.length;
        SER /= data.length;

        return {
            "results": result,
            "WER": WERavg,
            "WCR": WCRavg,
            "SER": SER
        };
};