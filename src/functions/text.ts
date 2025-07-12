export function uwuifyText(text: string): string {
  return text
    .replace(/r|l/g, 'w')
    .replace(/R|L/g, 'W')
    .replace(/n([aeiou])/g, 'ny$1')
    .replace(/N([aeiou])/g, 'Ny$1')
    .replace(/ove/g, 'uv')
    .replace(/!+/g, ' >w<')
    .replace(/\./g, ' uwu.')
    .replace(/\?/g, ' owo?')
    .replace(/, /g, ' uwu, ')
    .replace(/\bi\b/g, 'me')
    .replace(/\bmy\b/g, 'muh')
    .replace(/\bthe\b/g, 'da')
    .replace(/\byou\b/g, 'u')
    .replace(/\bwe\b/g, 'w-we')
    .replace(/\bthis\b/g, 'dis')
    .replace(/\bis\b/g, 'ish')
    .replace(/\bthat\b/g, 'dat')
    .replace(/\bwas\b/g, 'w-was')
    .replace(/\bwith\b/g, 'wif')
    .replace(/\bsay\b/g, 's-sey')
    .replace(/\bdon't\b/g, 'dun')
    .replace(/\byour\b/g, 'ur')
    .replace(/\bI'm\b/g, 'I\'mz')
    .replace(/\bwhat\b/g, 'w-what')
    .replace(/\byes\b/g, 'yus')
    .replace(/\bno\b/g, 'nu')
    .replace(/\bhello\b/g, 'hewwo')
    .replace(/\bokay\b/g, 'okie')
    .replace(/\bgood\b/g, 'gud')
    .replace(/\blove\b/g, 'wuv')
    .replace(/\bvery\b/g, 'v-vwery')
    .replace(/\bwow\b/g, 'owo')
    .replace(/\bso\b/g, 'sowwy')
    .replace(/\bsure\b/g, 's-suwre')
    .replace(/\bmaster\b/g, 'm-master >w<')
    .replace(/\bfriend\b/g, 'fwend')
    .replace(/\bcute\b/g, 'kawaii~')
    .replace(/\bfuck\b/g, 'f-fudge')
    .replace(/\bbad\b/g, 'naughty')
    .replace(/\bhard\b/g, 'hawd')
    .replace(/\bcool\b/g, 'coowo')
    .replace(/\bhappy\b/g, 'h-happy~')
    .replace(/\bshit\b/g, 'p-poopoo')
    .replace(/\bass\b/g, 'b-buwwy')
    .replace(/\bdamn\b/g, 'd-darn')
    .replace(/\bsad\b/g, 'sowwy')
    .replace(/\bbye\b/g, 'b-baii')
    .replace(/\bplease\b/g, 'pwease')
    .replace(/\bexcuse me\b/g, 'e-excuse m-me')
    .replace(/\bwhy\b/g, 'w-why')
    .replace(/\bsorry\b/g, 'sowwy')
    .replace(/\balso\b/g, 'awso')
    .replace(/\ba lot\b/g, 'a wot')
    .replace(/\bthing\b/g, 'ting')
    .replace(/\bhurt\b/g, 'huwt')
    .replace(/\bhome\b/g, 'homu')
    .replace(/\bkill\b/g, 'kiww')
    .replace(/\bgive\b/g, 'gib')
    .replace(/\bschool\b/g, 'skuwl')
    .replace(/\battack\b/g, 'attwack')
    .replace(/\byawn\b/g, 'yawn~ *stretch*')
    .replace(/\bscary\b/g, 'scawy')
    .replace(/\bfight\b/g, 'fwight')
    .replace(/\bsleep\b/g, 'sweepy')
    .replace(/\bbecause\b/g, 'becwause')
    .replace(/\bbug\b/g, 'buggo')
    .replace(/\bcat\b/g, 'kitty')
    .replace(/\bdog\b/g, 'puppy')
    .replace(/\bmom\b/g, 'm-mommy')
    .replace(/\bdad\b/g, 'daddy')
    .replace(/\bgirl\b/g, 'gurl')
    .replace(/\bboy\b/g, 'boi')
    .replace(/\bhot\b/g, 'hawt')
    .replace(/\bstrong\b/g, 'stwong')
    .replace(/\bweak\b/g, 'weak uwu')
    .replace(/\bfast\b/g, 'fastie~')
    .replace(/\bsnack\b/g, 'nom nom')
    .replace(/\bdrink\b/g, 'dwink')
    .replace(/\bmeat\b/g, 'm-meaty')
    .replace(/\bwater\b/g, 'wawa')
    .replace(/\bcar\b/g, 'vwoom vwoom')
    .replace(/\bbike\b/g, 'b-biky')
    .replace(/\bplane\b/g, 'big bwird')
    .replace(/\btrain\b/g, 'choo choo')
    .replace(/\bboat\b/g, 'floaty')
    .replace(/\bhungry\b/g, 'hungy')
    .replace(/\bthirsty\b/g, 'thiwsty')
    .replace(/\btired\b/g, 'tiwed')
    .replace(/\bwork\b/g, 'wowk')
    .replace(/\bplay\b/g, 'pway')
    .replace(/\bhelp\b/g, 'hewlp')
    .replace(/\bjump\b/g, 'boing~')
    .replace(/\bwalk\b/g, 'w-walkies')
    .replace(/\brun\b/g, 'zooom')
    .replace(/\bsee\b/g, 'wook')
    .replace(/\bhear\b/g, 'wisten')
    .replace(/\bsing\b/g, 's-swing')
    .replace(/\bdance\b/g, 'shakey shakey')
    .replace(/\bdrive\b/g, 'dwive')
    .replace(/\bhigh\b/g, 'hi~')
    .replace(/\blow\b/g, 'wow')
    .replace(/\bfar\b/g, 'fwaw')
    .replace(/\bclose\b/g, 'cwose')
    .replace(/\bthank\b/g, 't-thankies')
    .replace(/\bgoodbye\b/g, 'b-bai bai')
    .replace(/\bsecret\b/g, 'secwet~')
    .replace(/\bmagic\b/g, 'majik')
    .replace(/\bmonster\b/g, 'm-monstah')
    .replace(/\bwizard\b/g, 'wizawd')
    .replace(/\bwitch\b/g, 'witchy')
    .replace(/\bprince\b/g, 'p-pwince')
    .replace(/\bprincess\b/g, 'p-pwincess')
    .replace(/\bstar\b/g, 'stwaw')
    .replace(/\bmoon\b/g, 'moony')
    .replace(/\bsun\b/g, 'sunny~')
    .replace(/\bcloud\b/g, 'fwuffy cwoud')
    .replace(/\bwind\b/g, 'bweeze')
    .replace(/\brain\b/g, 'd-dwizzles')
    .replace(/\bsnow\b/g, 'snuggwy snuw')
    .replace(/\bfire\b/g, 'fwaimz')
    .replace(/\bwater\b/g, 'spwashies')
    .replace(/\bearth\b/g, 'earf')
    .replace(/\blight\b/g, 'wight')
    .replace(/\bdark\b/g, 'dawk')
    .replace(/\bgreat\b/g, 'gweat')
    .replace(/\bpower\b/g, 'powah')
    .replace(/\bhug\b/g, 'huggies~')
    .replace(/\bkiss\b/g, 'smoochies')
    .replace(/\bwonderful\b/g, 'wondwufuw')
    .replace(/\brich\b/g, 'woady')
    .replace(/\bpoor\b/g, 'poow')
    .replace(/\bmagic\b/g, 'majikw')
    .replace(/\bprincess\b/g, 'pwincess~')
    .replace(/\bprince\b/g, 'pwince~')
    .replace(/\bangry\b/g, 'angy')
    .replace(/\bnervous\b/g, 'nyervous')
    .replace(/\bexcited\b/g, 'e-excited')
    .replace(/\bembarrassed\b/g, 'embawwassed')
    .replace(/\blonely\b/g, 'wonely')
    .replace(/\bbrave\b/g, 'bwave')
    .replace(/\bshy\b/g, 'sh-shy')
    .replace(/\bproud\b/g, 'pwoud')
    .replace(/\bconfused\b/g, 'confuwsed')
    .replace(/\bjealous\b/g, 'jewous')
    .replace(/\bwrite\b/g, 'wwite')
    .replace(/\bread\b/g, 'wead')
    .replace(/\blisten\b/g, 'wistwen')
    .replace(/\bwatch\b/g, 'w-watch')
    .replace(/\bcall\b/g, 'caww')
    .replace(/\bthink\b/g, 'fink')
    .replace(/\bremember\b/g, 'wemembew')
    .replace(/\bforget\b/g, 'fowget')
    .replace(/\bchoose\b/g, 'choosie~')
    .replace(/\blaugh\b/g, 'gigglwe')
    .replace(/\bstorm\b/g, 'stowm')
    .replace(/\blightning\b/g, 'wightning')
    .replace(/\bthunder\b/g, 'fundew')
    .replace(/\bocean\b/g, 'oceawn')
    .replace(/\bforest\b/g, 'fowest')
    .replace(/\bflower\b/g, 'fwower')
    .replace(/\bmountain\b/g, 'mounty')
    .replace(/\briver\b/g, 'wiver')
    .replace(/\bdesert\b/g, 'desewt')
    .replace(/\bisland\b/g, 'iswand')
    .replace(/\bsweet\b/g, 'sweety')
    .replace(/\bspicy\b/g, 'spicey-wicey')
    .replace(/\bsour\b/g, 'sowwy')
    .replace(/\bsalty\b/g, 'sawty')
    .replace(/\bmilk\b/g, 'miwk')
    .replace(/\bcoffee\b/g, 'cawffee')
    .replace(/\btea\b/g, 'teawy')
    .replace(/\bcookie\b/g, 'cwookie')
    .replace(/\bchocolate\b/g, 'chocwate')
    .replace(/\bhoney\b/g, 'hunny~')
    .replace(/\bbook\b/g, 'bwook')
    .replace(/\bpen\b/g, 'pwenn')
    .replace(/\bphone\b/g, 'phownie')
    .replace(/\bcomputer\b/g, 'compuwter')
    .replace(/\bkeyboard\b/g, 'keybawd')
    .replace(/\bmouse\b/g, 'mwouse')
    .replace(/\bwindow\b/g, 'windwow')
    .replace(/\bdoor\b/g, 'doow')
    .replace(/\btable\b/g, 'tabew')
    .replace(/\bchair\b/g, 'chawir')
    .replace(/\bfox\b/g, 'fowxy')
    .replace(/\bbear\b/g, 'beaw')
    .replace(/\brabbit\b/g, 'wabbit')
    .replace(/\bfish\b/g, 'fwishie~')
    .replace(/\bturtle\b/g, 'tuwtle')
    .replace(/\bbird\b/g, 'bwirdie')
    .replace(/\bfrog\b/g, 'fwoggy')
    .replace(/\blion\b/g, 'wyion')
    .replace(/\bwolf\b/g, 'wulf')
    .replace(/\bdragon\b/g, 'dwagon~')
    .replace(/\bfairy\b/g, 'fwaiwy')
    .replace(/\belf\b/g, 'ewfie')
    .replace(/\bdemon\b/g, 'demown')
    .replace(/\bangel\b/g, 'anygel')
    .replace(/\bghost\b/g, 'gwoostie')
    .replace(/\bvampire\b/g, 'vam-pwior')
    .replace(/\bzombie\b/g, 'zombiewie')
    .replace(/\bspell\b/g, 'spweww')
    .replace(/\bcurse\b/g, 'cwurse')
    .replace(/\bpotion\b/g, 'powshun')
    .replace(/\bcastle\b/g, 'cawsle')
    .replace(/\bvillage\b/g, 'viwwage')
    .replace(/\btown\b/g, 't-towny')
    .replace(/\bcity\b/g, 'cwity')
    .replace(/\bcountry\b/g, 'countwy')
    .replace(/\bkingdom\b/g, 'kingdwom')
    .replace(/\bdungeon\b/g, 'dungywon')
    .replace(/\bmarket\b/g, 'mwarket')
    .replace(/\bstreet\b/g, 'stweet')
    .replace(/\bpark\b/g, 'pwark')
    .replace(/\bdanger\b/g, 'dangew~')
    .replace(/\bpeace\b/g, 'pweace')
    .replace(/\bproblem\b/g, 'pwobwem')
    .replace(/\bjoke\b/g, 'jwoke')
    .replace(/\btruth\b/g, 'twuth')
    .replace(/\blie\b/g, 'wiewie')
    .replace(/\bdream\b/g, 'dweam~')
    .replace(/\bnightmare\b/g, 'nyightmawe')
    .replace(/\bluck\b/g, 'wuckie')
    .replace(/\bwish\b/g, 'wiiish~')
    .replace(/\bsneeze\b/g, 'sneezies~')
    .replace(/\byummy\b/g, 'yummy-wummy')
    .replace(/\bhungry\b/g, 'hungwy~')
    .replace(/\bthirsty\b/g, 'thiws-ty~')
    .replace(/\btired\b/g, 'tiwed~')
    .replace(/\bwarm\b/g, 'wawm')
    .replace(/\bcold\b/g, 'cowld')
    .replace(/\bstrong\b/g, 'stwong~')
    .replace(/\bweak\b/g, 'weawky')
    .replace(/\bslow\b/g, 'swow~')
    .replace(/\bsecret\b/g, 'secwet~')
    .replace(/\bmystery\b/g, 'mystewy~')
    .replace(/\bhappy\b/g, 'h-happy~')
    .replace(/\bsad\b/g, 'sowwy~')
    .replace(/\bangry\b/g, 'angwy~')
    .replace(/\bscared\b/g, 'scawedy~')
    .replace(/\bbored\b/g, 'bowed~')
    .replace(/\bamazing\b/g, 'amawzing~')
    .replace(/\bawesome\b/g, 'awsome~')
    .replace(/\bterrible\b/g, 'tewwible~')
    .replace(/\bwin\b/g, 'w-win')
    .replace(/\blose\b/g, 'wose~')
    .replace(/\bhug\b/g, 'huggies~')
    .replace(/\bkiss\b/g, 'kissies~')
    .replace(/\bsnuggle\b/g, 'snuggwe~')
    .replace(/\bcuddle\b/g, 'cuddwy~')
    .replace(/\bnuzzle\b/g, 'nuzzwy~')
    .replace(/\bpat\b/g, 'patties~')
    .replace(/\bpoke\b/g, 'pokie~')
    .replace(/\bboop\b/g, 'boop-boop~')
    .replace(/\bblush\b/g, '*bwushies*')
    .replace(/\bstare\b/g, 'stawwy~')
    .replace(/\blook\b/g, 'wookie~')
    .replace(/\bsee\b/g, 'w-wook')
    .replace(/\bhear\b/g, 'wisten~')
    .replace(/\btaste\b/g, 'twastey~')
    .replace(/\btouch\b/g, 'twouchie~')
    .replace(/\bfeel\b/g, 'feewy~')
    .replace(/\bsmell\b/g, 'smeww~')
    .replace(/\bsound\b/g, 'sownd~')
    .replace(/\bsleepy\b/g, 'sweepy~')
    .replace(/\bdream\b/g, 'dweamy~')
    .replace(/\bnight\b/g, 'nyight~')
    .replace(/\bday\b/g, 'daii~')
    .replace(/\bmorning\b/g, 'mowrning~')
    .replace(/\bevening\b/g, 'evwening~')
    .replace(/\bsunset\b/g, 'sunswet~')
    .replace(/\bsunrise\b/g, 'sunswise~')
    .replace(/\bmidnight\b/g, 'midnyight~')
    .replace(/\bnoon\b/g, 'noonie~')
    .replace(/\bwish\b/g, 'wishies~')
    .replace(/\bhope\b/g, 'howpe~')
    .replace(/\bdream\b/g, 'dweam~')
    .replace(/\bmagic\b/g, 'majick~')
    .replace(/\bmiracle\b/g, 'miwacle~')
    .replace(/\bluck\b/g, 'wuck~')
    .replace(/\bfortune\b/g, 'fowtune~')
    .replace(/\bdestiny\b/g, 'destiny-winy~')
    .replace(/\bfate\b/g, 'fwate~')
    .replace(/\bwonder\b/g, 'wondwy~')
    .replace(/\bhug\b/g, 'huggles~')
    .replace(/\bnuzzle\b/g, 'nuzzles~')
    .replace(/\btickle\b/g, 'tickwy~')
    .replace(/\bwiggle\b/g, 'wiggwly~')
    .replace(/\bsquish\b/g, 'squishie~')
    .replace(/\bpounce\b/g, 'pouncie~')
    .replace(/\bjump\b/g, 'jumpy~')
    .replace(/\bsniff\b/g, 'sneff~')
    .replace(/\blick\b/g, 'wiick~')
    .replace(/\bboop\b/g, 'boopity~')
    .replace(/\bfuzzy\b/g, 'fwuzzy~')
    .replace(/\bfluffy\b/g, 'fwuffy~')
    .replace(/\bsoft\b/g, 'sooft~')
    .replace(/\bsmooth\b/g, 'smwooth~')
    .replace(/\brough\b/g, 'wough~')
    .replace(/\bcozy\b/g, 'cowzy~')
    .replace(/\bcomfy\b/g, 'comfwy~')
    .replace(/\bwarm\b/g, 'wawm~')
    .replace(/\bcold\b/g, 'cowd~')
    .replace(/\bchilly\b/g, 'chiwwy~');

  return text;
}

// Conversion //
// 🔢 ASCII Binary Conversion
export function convertToASCII(text: string): string {
  return '; converted: ' + text
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
}

export function convertFromASCII(binary: string): string {
  if (/^[   if (/^[\x20-~  if (/^[\x20-\x7E]+$/.test(binary)) {
    return '; the input is already normal text!';
  }

  try {
    return '; converted: ' + binary
      .split(' ')
      .map(bin => String.fromCharCode(parseInt(bin, 2)))
      .join('');
  } catch {
    return '; invalid ASCII binary format!';
  }
}

// 🔤 Unicode Conversion
export function convertToUnicode(text: string): string {
  return '; converted: ' + text
    .split('')
    .map(char => char.codePointAt(0)?.toString(16).toUpperCase() || '')
    .join(' ');
}

export function convertFromUnicode(unicode: string): string {
  if (/^[\p{L}\p{N}\p{P}\p{Z}]+$/u.test(unicode)) {
    return '; the input is already normal text!';
  }

  try {
    return '; converted: ' + unicode
      .split(' ')
      .map(hex => String.fromCodePoint(parseInt(hex, 16)))
      .join('');
  } catch {
    return '; invalid Unicode format!';
  }
}

// Encryption //
import crypto from 'crypto';

export function encryptAES(text: string, key: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key.padEnd(32, ' ')), iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return `; encrypted: aes:${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decryptAES(text: string, key: string): string {
  try {
    const parts = text.split(':');
    if (parts.length !== 3 || parts[0] !== 'aes') return '; encryption algorithm mismatch!';
    const iv = Buffer.from(parts[1], 'hex');
    const encryptedData = Buffer.from(parts[2], 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key.padEnd(32, ' ')), iv);
    const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]).toString('utf8');
    return `; decrypted: ${decrypted}`;
  } catch {
    return '; incorrect secret key!';
  }
}

export function encryptChaCha20(text: string, key: string): string {
  const nonce = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('chacha20', Buffer.from(key.padEnd(32, ' ')), nonce);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return `; encrypted: chacha:${nonce.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decryptChaCha20(text: string, key: string): string {
  try {
    const parts = text.split(':');
    if (parts.length !== 3 || parts[0] !== 'chacha') return '; encryption algorithm mismatch!';
    const nonce = Buffer.from(parts[1], 'hex');
    const encryptedData = Buffer.from(parts[2], 'hex');
    const decipher = crypto.createDecipheriv('chacha20', Buffer.from(key.padEnd(32, ' ')), nonce);
    const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]).toString('utf8');
    return `; decrypted: ${decrypted}`;
  } catch {
    return '; incorrect secret key!';
  }
}