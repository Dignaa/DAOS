const instruments: string[] = [
  '3. broguitar',
  'Accordina',
  'Harmonika',
  'Accordola',
  'Akustisk basguitar',
  'Akustisk guitar',
  '∆olisk harpe',
  'Aeolsklavier',
  'Agidigbo',
  'Agung / Agong',
  'Agung a tamlang',
  'Ajaeng',
  'Alimba',
  'AlphaSphere',
  'Alphorn',
  'Altklarinet',
  'Althorn',
  'Alto sarrusophone',
  'Altsaxofon',
  'AngÈlique',
  'Appalachian dulcimer',
  'Archlute',
  'Arpeggione',
  'Array mbira',
  'Audiocubes',
  'Autoharpe',
  'Babarak',
  'Babendil',
  'SÊkkepibe',
  'Balafon',
  'Balalaika',
  'BandoneÛn',
  'Bandura',
  'Banduria',
  'Banjo',
  'Banjo-mandolin',
  'Banjo ukulele',
  'Barbat',
  'Barytonhorn',
  'Baryton-sarrofon',
  'Barytonsaxofon',
  'Baryton-ukulele',
  'Baryton',
  'Basklarinet',
  'Stortromme',
  'Basguitar',
  'Bas-obo / baryton-obo',
  'Bas-sarrofon',
  'Bassaxofon',
  'Bassklarinet',
  'Basset-horn',
  'Fagot',
  'Bazooka',
  'Bell',
  'KlokketrÊ',
  'Berimbau',
  'Biniou',
  'Biwa',
  'Bock-a-da-bock',
  'Bodhr·n',
  'Bombarde',
  'Bongotromme',
  'Boomwhacker',
  'Bordonua',
  'Boungu',
  'Bouzouki',
  'Bugle',
  'Bullroarer',
  'C-melodisaxofon',
  'CajÛn',
  'Calliope',
  'Carillon',
  'Kastagnetter',
  'Cavaquinho',
  'Celesta',
  'Cello',
  'Chap',
  'Chapman-pind',
  'Charango',
  'Chimes',
  'Ching',
  'Chitarra battente',
  'Chuk',
  'Cigarkasse-guitar',
  'Cigarkasse-ukulele',
  'Cimbalom',
  'Cimbassi',
  'Citole',
  'Cittern',
  'Clapper',
  'KlaptrÊer',
  'Klarinet',
  'Klassisk guitar',
  'Claves',
  'Clavichord',
  'Clavicylinder',
  'Clavinet',
  'Kokosn¯ddeskaller',
  'Kam',
  'Koncert-ukulele',
  'Concertina',
  'Muslingeskal',
  'Conn-o-sax',
  'Kontra-alt-klarinet',
  'Kontrabasbalalajka',
  'Kontrabasklarinet',
  'Kontrabasklarinet (viklet metal)',
  'Kontrabas-sarrusofon',
  'Kontrabas-saxofon',
  'Kontrabasun',
  'Cor anglais',
  'Cornamuse',
  'Cornet',
  'Cornett',
  'Corrugaphone',
  'Cowbell',
  'Cricri',
  'Croix Sonore',
  'Cromorne',
  'Crotales',
  'Crumhorn',
  'Crwth',
  'Krystallofoner',
  'Cuatro',
  'CuÌca',
  'Cymbal',
  'BÊkkener (i par)',
  'Dabakan',
  'Dahu',
  'Daxophone',
  'D‡n bau',
  'D‡n g·o',
  'D‡n nguyet',
  'D‡n tam thap luc',
  'D‡n t? b‡',
  'D‡n tranh',
  "Denis d'or",
  'Dhantal',
  'Diddley bow',
  'Didgeridoo',
  'Dihu',
  'Djembe',
  'Dobro',
  'Domra',
  'Dotara',
  'Kontrabas',
  'Dobbelt flageolet',
  'Dobbelthalset guitjo',
  'Drejelire',
  'TrommesÊt',
  'Trommemaskine',
  'Drumbone',
  'Dubreq-stylofon',
  'Duda',
  'Dudelsack',
  'Dulcimer',
  'Dunun',
  'Dutar',
  'Duxianqin',
  'Eigenharp',
  'Guitar med otte strenge',
  'Ektara',
  'Elektrisk cymbalum',
  'Elektrisk guitar',
  'Elektrisk tommelfingerklaver',
  'Elektronisk orgel',
  'Eleke',
  'Engelsk horn',
  'Erhu',
  'Erxian',
  'Esraj',
  'Euphonium',
  'EWI',
  'Faglong/Fuglung',
  'Fangxiang',
  'Fiddle',
  'Fingerboard synthesizer',
  'Flamenco-guitar',
  'Flexatone',
  'Flugelhorn',
  'Fl¯jte',
  'Folgerphone',
  'Fortepiano',
  'Frankofon',
  'Fransk horn',
  'Fusetar',
  'Gaita',
  'Gandingan',
  'Gandingan a kayo',
  'Gangsa',
  'Gayageum',
  'G¸iro',
  'Gehu',
  'GendÈr',
  'Geomungo',
  'Gimbri',
  'Gittern',
  'Glass Armonica',
  'Glasharpe',
  'Glasschord',
  'Glockenspiel',
  'Gloggomobil',
  'Gopuz',
  'Gottuvadhyam',
  'Det store klaver',
  'Den store h¯jlandssÊkkepibe',
  'Guitar',
  'Guitarsynthesizer',
  'Guitarra quinta Huapanguera',
  'GuitarrÛn',
  'Guqin',
  'Gusli',
  'Guzheng',
  'Haegeum',
  'Hammered dulcimer',
  'Hammond-orgel',
  'Handpan/Hang',
  'Hardingfele / Hardanger fiddle',
  'Harmoneon',
  'Harmonica',
  'Harmonium',
  'Harpe',
  'Harpeguitar',
  'Cembalo',
  'Heckelphone',
  'Hirtenschalmei',
  'Hocchiku',
  'Horn',
  'Hosho',
  'Huluhu/Huqin',
  'Hurdy gurdy',
  'Hydraulofon',
  'Igil',
  'Ikembe',
  'Irsk bouzouki',
  'Jammer-tastatur',
  'Jarana de son jarocho',
  'Jarana huasteca',
  'Jarana-myggen',
  'Jarana segunda',
  'Jarana tercera',
  'KÊbeharpe',
  'Jegog',
  'Jiaohu',
  'Jingle bells',
  'Kande',
  'Kabosy',
  'Kadlong',
  'Kaffeklaver',
  'Kagul',
  'Kalimba',
  'Kamancha',
  'Kankles',
  'Kantele',
  'Katzenklavier',
  'Kazoos',
  'Kemenche',
  'Tastatur',
  'Keytar',
  'Khim',
  'Khloy',
  'Khlui',
  'Kimophone',
  'Kinnor (Davids lyre)',
  'Kisanji',
  'Kobza',
  'Kokle',
  'Kokyu',
  'Komungo',
  'Kora',
  'Koto',
  'Kouxian',
  'Kraakdoos',
  'Krin / Kolokolos',
  'Kubing',
  'Kudyapi',
  'Kulintang / kolintang',
  'Langeleik',
  'Laruan',
  'Laserharpe',
  'Leiqin',
  'Lesiba',
  'Likembe',
  'Lirone',
  'Lithofon',
  'Lokanga',
  'Lur',
  'Lute',
  'Lyra (byzantinsk)',
  'Lyra (kretensisk)',
  'Lyre',
  'Maguhu',
  'MajestÊtisk Bellowphone',
  'Mando-bass',
  'Mandocello',
  'Mandoharpe',
  'Mandola',
  'Mandolin',
  'Mandora',
  'Mandore',
  'Maracas',
  'MarÌmbula',
  'Marimba',
  'Marimbafon',
  'Marovany',
  'Mbira',
  'Mekanisk spilledÂse',
  'Mellofon',
  'Mellotron',
  'Melodica',
  'Metallofoner',
  'Mezzosopran-saxofon',
  'MIDI-keyboard',
  'Mohan veena',
  'Monster Tubulum',
  'Morin khuur',
  'Morsing',
  'Musette',
  'Musette de cour',
  'Musikalsk bue',
  'SpilledÂse',
  'Musikalsk sav',
  'N-Odaiko',
  'Negleviolin',
  'Naturligt horn',
  'Naturlig trompet',
  'Northumbrian smallpipes',
  'Nyck',
  'Nyckelharpa',
  'Oboe',
  "Oboe d'amore",
  'Oboe da caccia',
  'Ocarina',
  'Oktaveret mandolin',
  'Octavin',
  'Octoban',
  'Octobass',
  'Octocontra-alt-klarinet',
  'Octocontrabasklarinet',
  'Omnichord',
  'Ondes Martenot',
  'Oopoochawa',
  'Orgel',
  'Orpharion',
  'Oud',
  'Overtone zither',
  'Paiban',
  'Pak',
  'Palendag/Pulalu',
  'Pan r¯r',
  'Piano',
  'Piccolo',
  'Piccolo cello/violoncello piccolo',
  'Piccolo-klarinet',
  'Piccolo violino',
  'Pin pia',
  'Pipa',
  'R¯rorgel',
  'Stempelfl¯jte',
  'Piwancha',
  'Plasmaphone',
  'Portugisisk guitar',
  'Psalterium',
  'Pyrophone',
  'Quatro',
  'Quintephone',
  'Regnstav',
  'Ranat ek lek',
  'Ranat thum lek',
  'Ratchet',
  'Rattle',
  'Ravanahatha',
  'Rebab',
  'Rebec',
  'Optager',
  'R¯rorgel',
  'Requinto jarocho',
  'Reyong',
  'Rhodes piano',
  'Rommelpot',
  'Ruan',
  'Rubab',
  'Rudra vina',
  'Sackbut',
  'Sallameh',
  'Sampler',
  'Sansa',
  'Sanshin',
  'Santur',
  'Sanxian',
  'Sanza',
  'Sarangi',
  'Sarod',
  'Sarrusofon',
  'Saung',
  'Saw sam sai',
  'Saxofon',
  'Saz',
  'Saz Baglama',
  'Skotske smÂpiber',
  'Se',
  'Havets orgel',
  'Slange',
  'Setar (lut)',
  'Syvstrenget guitar',
  'Shakuhachi',
  'Shamisen',
  'Shawm',
  'Sheng',
  'Shishi odoshi',
  'Shofar',
  'Syngende skÂl',
  'Sirene',
  'Sitar',
  'Sitarla',
  'Sk8 Guitar',
  'Skoog',
  'Slapstick',
  'SlÊdeklokker',
  'Slide guitar',
  'Glidefl¯jte',
  'Spaltetromle',
  'Slit gong',
  'Lilletromme',
  'Sopranino-klarinet',
  'Sopranino-mandolin',
  'Sopranino-saxofon',
  'Sopranklarinet',
  'Sopran-sarrusofon',
  'Sopransaxofon',
  'Sopran-ukulele',
  'Soprillo (sopranissimo-saxofon)',
  'Sousafon',
  'Rumharpe',
  'Skeer',
  'StÂlguitar',
  'Steelpan',
  'Steelpan / stÂltromme',
  'Stroh-violin',
  'Subkontrabassaxofon',
  'Suikinkutsu',
  'Suling',
  'Surma',
  'Suroz',
  'Svensk sÊkkepibe',
  'Swordblade',
  'Synclavier',
  'Synthesizer',
  'Tabla',
  'Tafelbergliam',
  'Taiko',
  'Guitar med halebro',
  'Takuapu',
  'Talharpa',
  'Tamak',
  'Tamburin (med membran)',
  'Tamburin (uden membran)',
  'Tamburitza',
  'Tanktromle',
  'Tanpura',
  'TjÊre (lut)',
  'Tarogato (moderne)',
  'Te-bryst-bas',
  'Teleharmonium',
  'Temb˚r',
  'Tenorhorn',
  'Tenor-sarrusofon',
  'Tenorsaxofon',
  'Tenor-ukulele',
  'Tenorbratsch',
  'Tenori-on',
  'Tenoroon',
  'Teponaztli',
  'Theorbo',
  'Theremin',
  'Tredje broguitar',
  'Tommelfingerklaver',
  'Timpani',
  'Timple',
  'Tin whistle',
  'Tiple',
  'Tom',
  'Tom-tom',
  'Leget¯jsklaver',
  'Trembita',
  'Tres',
  'Triangle',
  'Triangle',
  'Tro',
  'Trombone',
  'Trompet',
  'Trompet marine/tromba marina',
  'Tsymbaly',
  'Tuba',
  'Tubax',
  'R¯rklokker',
  'R¯rformet trÊblok',
  'Tubulum',
  'Tuhu (Kina)',
  'Tumdak',
  'Tumpong',
  'Tolvstrenget guitar',
  'Udu',
  'Ugal',
  'Uilleann (irsk) sÊkkepibe',
  'Ukulele',
  'OpretstÂende klaver',
  'Valiha',
  'Veena',
  'Verrophone',
  'Lodret bratsch',
  'Vibrandoneon',
  'Vibrafon',
  'Vibraslap',
  'Vichitra vina',
  'Vielle',
  'Vihuela',
  'Viol',
  'Viola',
  "Viola d'amore",
  'Viola da gamba',
  'Viola organista',
  'Violin',
  'Violotta',
  'Volynka',
  'Vulcan Lute',
  'Vuvuzela',
  'Wagner-tuba',
  'Waj',
  'Waldzither',
  'VaskebrÊt',
  'Vaskekarsbas',
  'Vandtelefon',
  'Vestlig koncertfl¯jte',
  'Whamola',
  'Wheelharp',
  'Pisk',
  'Whistle',
  'Fl¯jte af pil',
  'Wobble board',
  'TrÊklods',
  'Xalam/Khalam',
  'Xun',
  'Xylofon',
  'Xylorimba',
  'Yangqin',
  'Yayli tanbur',
  'Yazheng',
  'Yotar',
  'Zampogna',
  'Zhonghu',
  'Zhuihu',
  'Zimbabwean Marimba',
  'Zither',
  'Zummara',
];
export default instruments;
