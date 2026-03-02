/**
 * @project   Batak Lingua
 * @file      toba-converter.js
 * @author    Renol Simanjuntak
 * @license   MIT License - Copyright (c) 2026 Batak Lingua
 */

import BATAK_TOBA_MAP from '../data/toba-map.js';

export function latinToBatak(text) {
    const { ina_ni_surat, anak_ni_surat, special } = BATAK_TOBA_MAP;
    let input = text.toLowerCase();
    let result = "";
    let i = 0;

    while (i < input.length) {
        let char = input[i];

        if (!/[a-z]/.test(char)) {
            result += char;
            i++;
            continue;
        }

        let found = false;

        if (i + 2 < input.length) {
            let trio = input.substring(i, i + 3);
            if (ina_ni_surat[trio]) {
                result += ina_ni_surat[trio];
                let vNext = input[i + 3];
                if (vNext && /[eiou]/.test(vNext)) {
                    result += (anak_ni_surat[vNext] || "");
                    i += 4;
                } else {
                    i += (vNext === 'a') ? 4 : 3;
                }
                found = true;
            }
        }

        if (!found && i < input.length) {
            let key = (char === 'k') ? "ha" : char + "a";
            if (ina_ni_surat[key]) {
                let nxt = input[i + 1];
                if (nxt && /[aeiou]/.test(nxt)) {
                    result += ina_ni_surat[key];
                    if (nxt !== 'a') result += (anak_ni_surat[nxt] || "");
                    i += 2;
                    found = true;
                } else {
                    result += ina_ni_surat[key] + special.pangolat;
                    i += 1;
                    found = true;
                }
            }
        }

        if (!found) {
            if (/[aeiou]/.test(char)) {
                result += ina_ni_surat[char] || (ina_ni_surat['a'] + (anak_ni_surat[char] || ""));
            } else {
                result += char;
            }
            i++;
        }
    }
    return result;
}

if (typeof document !== 'undefined') {
    const inputArea = document.getElementById('input');
    const outputArea = document.getElementById('output');
    if (inputArea && outputArea) {
        inputArea.addEventListener('input', () => {
            outputArea.innerText = latinToBatak(inputArea.value);
        });
    }
    }
