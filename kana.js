var kana = [
  ['A ', 'あ', 'ア'],
  ['I ', 'い', 'イ'],
  ['U ', 'う', 'ウ'],
  ['E ', 'え', 'エ'],
  ['O ', 'お', 'オ'],
  ['KA', 'か', 'カ'],
  ['KI', 'き', 'キ'],
  ['KU', 'く', 'ク'],
  ['KE', 'け', 'ケ'],
  ['KO', 'こ', 'コ'],
  ['SA', 'さ', 'サ'],
  ['SI', 'し', 'シ'],
  ['SU', 'す', 'ス'],
  ['SE', 'せ', 'セ'],
  ['SO', 'そ', 'ソ'],
  ['TA', 'た', 'タ'],
  ['TI', 'ち', 'チ'],
  ['TU', 'つ', 'ツ'],
  ['TE', 'て', 'テ'],
  ['TO', 'と', 'ト'],
  ['NA', 'な', 'ナ'],
  ['NI', 'に', 'ニ'],
  ['NU', 'ぬ', 'ヌ'],
  ['NE', 'ね', 'ネ'],
  ['NO', 'の', 'ノ'],
  ['HA', 'は', 'ハ'],
  ['HI', 'ひ', 'ヒ'],
  ['HU', 'ふ', 'フ'],
  ['HE', 'へ', 'ヘ'],
  ['HO', 'ほ', 'ホ'],
  ['MA', 'ま', 'マ'],
  ['MI', 'み', 'ミ'],
  ['MU', 'む', 'ム'],
  ['ME', 'め', 'メ'],
  ['MO', 'も', 'モ'],
  ['YA', 'や', 'ヤ'],
  ['YU', 'ゆ', 'ユ'],
  ['YO', 'よ', 'ヨ'],
  ['RA', 'ら', 'ラ'],
  ['RI', 'り', 'リ'],
  ['RU', 'る', 'ル'],
  ['RE', 'れ', 'レ'],
  ['RO', 'ろ', 'ロ'],
  ['WA', 'わ', 'ワ'],
  ['WO', 'を', 'ヲ'],
  ['N ', 'ん', 'ン']
];

var preamble = '<!doctype html>\n<html>\n<head>\n<title>kana</title>\n<meta charset="utf-8" />\n</head>\n<body>\n<h1>';
var postamble = '</h1>\n<form method="post">\n<input type="text" name="userinput">\n<input type="submit">\n</form>\n</body>\n</html>';

module.exports = function() {
    return(preamble +  kana[Math.floor(Math.random() * kana.length)] + postamble)
}

module.exports.kana = kana

module.exports.kanaMatched = function (s1, s2, lol) {
  if (s1 === s2) {
    return(false);
  }
  var s1pos = -1;
  var s2pos = -2;
  for (var i = 0; i < lol.length; i++) {
    for (var j = 0; j < lol[i].length; j++) {
      if (s1.toUpperCase().trim() === lol[i][j].trim()) {
        s1pos = i;
      }
      if (s2.toUpperCase().trim() === lol[i][j].trim()) {
        s2pos = i;
      }
    }
  }
  return(s1pos === s2pos);
}
