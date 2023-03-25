// ライブラリの読み込み
const sharp = require('sharp');
const fs = require('fs');

// いろいろな設定値
const width = 100;
const height = 100;
const inDir = 'images';
const outDir = 'thumbs';

// フォルダ名をコマンドライン引数から取得する
const dir = process.argv[2] || inDir;
// dirフォルダが存在しなければ終わる
if (!fs.existsSync(dir)) {
    console.log(dir + 'フォルダが存在しません');
    return;
}

// フォルダ内の画像ファイル名を取得する
const files = fs.readdirSync(dir);

// outDir内のpngまたはjpgファイルをすべて取得する
const outfiles = fs.readdirSync(outDir)
    .filter(file => file.match(/\.png$|\.jpg$/))
// outfilesをすべて削除する
outfiles.forEach(function(file){
    fs.unlink(`${outDir}/${file}`, function(err){
      if(err){
        throw(err);
      }
      console.log(`deleted ${file}`);
    });
  });


// ファイル全部に処理する
files.forEach(file => {
    // ファイル名表示
    console.log(file);
    // ファイル名にtmbをつけたものを出力用ファイル名にする
    const outfile = file.replace(/(\.[^.]+$)/, '.tmb$1');

    // ファイル名を指定してsharpでリサイズ
    sharp('images/' + file)
        .resize(width, height, {
            fit: 'inside',
        })
        .toFile(outDir + '/' + outfile, (err, info) => {
            if (err) {
            console.error(err);
            } else {
            console.log(info);
            }
        });
});

