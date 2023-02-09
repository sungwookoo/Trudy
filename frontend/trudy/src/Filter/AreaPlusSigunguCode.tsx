import React, { useState } from "react";

// export const AreaPlusSigungu = {1: [1, 1], 2: [1, 2], 3: [1, 3], 4: [1, 4], 5: [1, 5], 6: [1, 6], 7: [1, 7], 8: [1, 8], 9: [1, 9], 10: [1, 10], 11: [1, 11], 12: [1, 12], 13: [1, 13], 14: [1, 14], 15: [1, 15], 16: [1, 16], 17: [1, 17], 18: [1, 18], 19: [1, 19], 20: [1, 20], 21: [1, 21], 22: [1, 22], 23: [1, 23], 24: [1, 24], 25: [1, 25], 26: [2, 1], 27: [2, 2], 28: [2, 3], 29: [2, 4], 30: [2, 5], 31: [2, 6], 32: [2, 7], 33: [2, 8], 34: [2, 9], 35: [2, 10], 36: [3, 1], 37: [3, 2], 38: [3, 3], 39: [3, 4], 40: [3, 5], 41: [4, 1], 42: [4, 2], 43: [4, 3], 44: [4, 4], 45: [4, 5], 46: [4, 6], 47: [4, 7], 48: [4, 8], 49: [5, 1], 50: [5, 2], 51: [5, 3], 52: [5, 4], 53: [5, 5], 54: [6, 1], 55: [6, 2], 56: [6, 3], 57: [6, 4], 58: [6, 5], 59: [6, 6], 60: [6, 7], 61: [6, 8], 62: [6, 9], 63: [6, 10], 64: [6, 11], 65: [6, 12], 66: [6, 13], 67: [6, 14], 68: [6, 15], 69: [6, 16], 70: [7, 1], 71: [7, 2], 72: [7, 3], 73: [7, 4], 74: [7, 5], 75: [8, 1], 76: [31, 1], 77: [31, 2], 78: [31, 3], 79: [31, 4], 80: [31, 5], 81: [31, 6], 82: [31, 7], 83: [31, 8], 84: [31, 9], 85: [31, 10], 86: [31, 11], 87: [31, 12], 88: [31, 13], 89: [31, 14], 90: [31, 15], 91: [31, 16], 92: [31, 17], 93: [31, 18], 94: [31, 19], 95: [31, 20], 96: [31, 21], 97: [31, 22], 98: [31, 23], 99: [31, 24], 100: [31, 25], 101: [31, 26], 102: [31, 27], 103: [31, 28], 104: [31, 29], 105: [31, 30], 106: [31, 31], 107: [32, 1], 108: [32, 2], 109: [32, 3], 110: [32, 4], 111: [32, 5], 112: [32, 6], 113: [32, 7], 114: [32, 8], 115: [32, 9], 116: [32, 10], 117: [32, 11], 118: [32, 12], 119: [32, 13], 120: [32, 14], 121: [32, 15], 122: [32, 16], 123: [32, 17], 124: [32, 18], 125: [33, 1], 126: [33, 2], 127: [33, 3], 128: [33, 4], 129: [33, 5], 130: [33, 6], 131: [33, 7], 132: [33, 8], 133: [33, 9], 134: [33, 10], 135: [33, 11], 136: [33, 12], 137: [34, 1], 138: [34, 2], 139: [34, 3], 140: [34, 4], 141: [34, 5], 142: [34, 6], 143: [34, 7], 144: [34, 8], 145: [34, 9], 146: [34, 11], 147: [34, 12], 148: [34, 13], 149: [34, 14], 150: [34, 15], 151: [35, 1], 152: [35, 2], 153: [35, 3], 154: [35, 4], 155: [35, 5], 156: [35, 6], 157: [35, 7], 158: [35, 8], 159: [35, 9], 160: [35, 10], 161: [35, 11], 162: [35, 12], 163: [35, 13], 164: [35, 14], 165: [35, 15], 166: [35, 16], 167: [35, 17], 168: [35, 18], 169: [35, 19], 170: [35, 20], 171: [35, 21], 172: [35, 22], 173: [35, 23], 174: [36, 1], 175: [36, 2], 176: [36, 3], 177: [36, 4], 178: [36, 5], 179: [36, 6], 180: [36, 7], 181: [36, 8], 182: [36, 9], 183: [36, 10], 184: [36, 12], 185: [36, 13], 186: [36, 14], 187: [36, 15], 188: [36, 16], 189: [36, 17], 190: [36, 18], 191: [36, 19], 192: [36, 20], 193: [36, 21], 194: [37, 1], 195: [37, 2], 196: [37, 3], 197: [37, 4], 198: [37, 5], 199: [37, 6], 200: [37, 7], 201: [37, 8], 202: [37, 9], 203: [37, 10], 204: [37, 11], 205: [37, 12], 206: [37, 13], 207: [37, 14], 208: [38, 1], 209: [38, 2], 210: [38, 3], 211: [38, 4], 212: [38, 5], 213: [38, 6], 214: [38, 7], 215: [38, 8], 216: [38, 9], 217: [38, 10], 218: [38, 11], 219: [38, 12], 220: [38, 13], 221: [38, 16], 222: [38, 17], 223: [38, 18], 224: [38, 19], 225: [38, 20], 226: [38, 21], 227: [38, 22], 228: [38, 23], 229: [38, 24], 230: [39, 3], 231: [39, 4]}
export const AreaPlusSigungu: any = [
  [0, 0],
  [1, 1],
  [1, 2],
  [1, 3],
  [1, 4],
  [1, 5],
  [1, 6],
  [1, 7],
  [1, 8],
  [1, 9],
  [1, 10],
  [1, 11],
  [1, 12],
  [1, 13],
  [1, 14],
  [1, 15],
  [1, 16],
  [1, 17],
  [1, 18],
  [1, 19],
  [1, 20],
  [1, 21],
  [1, 22],
  [1, 23],
  [1, 24],
  [1, 25],
  [2, 1],
  [2, 2],
  [2, 3],
  [2, 4],
  [2, 5],
  [2, 6],
  [2, 7],
  [2, 8],
  [2, 9],
  [2, 10],
  [3, 1],
  [3, 2],
  [3, 3],
  [3, 4],
  [3, 5],
  [4, 1],
  [4, 2],
  [4, 3],
  [4, 4],
  [4, 5],
  [4, 6],
  [4, 7],
  [4, 8],
  [5, 1],
  [5, 2],
  [5, 3],
  [5, 4],
  [5, 5],
  [6, 1],
  [6, 2],
  [6, 3],
  [6, 4],
  [6, 5],
  [6, 6],
  [6, 7],
  [6, 8],
  [6, 9],
  [6, 10],
  [6, 11],
  [6, 12],
  [6, 13],
  [6, 14],
  [6, 15],
  [6, 16],
  [7, 1],
  [7, 2],
  [7, 3],
  [7, 4],
  [7, 5],
  [8, 1],
  [31, 1],
  [31, 2],
  [31, 3],
  [31, 4],
  [31, 5],
  [31, 6],
  [31, 7],
  [31, 8],
  [31, 9],
  [31, 10],
  [31, 11],
  [31, 12],
  [31, 13],
  [31, 14],
  [31, 15],
  [31, 16],
  [31, 17],
  [31, 18],
  [31, 19],
  [31, 20],
  [31, 21],
  [31, 22],
  [31, 23],
  [31, 24],
  [31, 25],
  [31, 26],
  [31, 27],
  [31, 28],
  [31, 29],
  [31, 30],
  [31, 31],
  [32, 1],
  [32, 2],
  [32, 3],
  [32, 4],
  [32, 5],
  [32, 6],
  [32, 7],
  [32, 8],
  [32, 9],
  [32, 10],
  [32, 11],
  [32, 12],
  [32, 13],
  [32, 14],
  [32, 15],
  [32, 16],
  [32, 17],
  [32, 18],
  [33, 1],
  [33, 2],
  [33, 3],
  [33, 4],
  [33, 5],
  [33, 6],
  [33, 7],
  [33, 8],
  [33, 9],
  [33, 10],
  [33, 11],
  [33, 12],
  [34, 1],
  [34, 2],
  [34, 3],
  [34, 4],
  [34, 5],
  [34, 6],
  [34, 7],
  [34, 8],
  [34, 9],
  [34, 11],
  [34, 12],
  [34, 13],
  [34, 14],
  [34, 15],
  [35, 1],
  [35, 2],
  [35, 3],
  [35, 4],
  [35, 5],
  [35, 6],
  [35, 7],
  [35, 8],
  [35, 9],
  [35, 10],
  [35, 11],
  [35, 12],
  [35, 13],
  [35, 14],
  [35, 15],
  [35, 16],
  [35, 17],
  [35, 18],
  [35, 19],
  [35, 20],
  [35, 21],
  [35, 22],
  [35, 23],
  [36, 1],
  [36, 2],
  [36, 3],
  [36, 4],
  [36, 5],
  [36, 6],
  [36, 7],
  [36, 8],
  [36, 9],
  [36, 10],
  [36, 12],
  [36, 13],
  [36, 14],
  [36, 15],
  [36, 16],
  [36, 17],
  [36, 18],
  [36, 19],
  [36, 20],
  [36, 21],
  [37, 1],
  [37, 2],
  [37, 3],
  [37, 4],
  [37, 5],
  [37, 6],
  [37, 7],
  [37, 8],
  [37, 9],
  [37, 10],
  [37, 11],
  [37, 12],
  [37, 13],
  [37, 14],
  [38, 1],
  [38, 2],
  [38, 3],
  [38, 4],
  [38, 5],
  [38, 6],
  [38, 7],
  [38, 8],
  [38, 9],
  [38, 10],
  [38, 11],
  [38, 12],
  [38, 13],
  [38, 16],
  [38, 17],
  [38, 18],
  [38, 19],
  [38, 20],
  [38, 21],
  [38, 22],
  [38, 23],
  [38, 24],
  [39, 3],
  0,
];