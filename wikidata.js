// Wikidata country Q-IDs for live leader updates
const wikidataIds = {
  "dz": "Q262", "ao": "Q916", "bj": "Q962", "bw": "Q963", "bf": "Q965",
  "bi": "Q967", "cm": "Q1009", "cv": "Q1011", "cf": "Q929", "td": "Q657",
  "km": "Q970", "cg": "Q971", "cd": "Q974", "ci": "Q1008", "dj": "Q977",
  "eg": "Q79", "gq": "Q983", "er": "Q986", "sz": "Q1050", "et": "Q115",
  "ga": "Q1000", "gm": "Q1005", "gh": "Q117", "gn": "Q1006", "gw": "Q1007",
  "ke": "Q114", "ls": "Q1013", "lr": "Q1014", "ly": "Q1016", "mg": "Q1019",
  "mw": "Q1020", "ml": "Q912", "mr": "Q1025", "mu": "Q1027", "ma": "Q1028",
  "mz": "Q1029", "na": "Q1030", "ne": "Q1032", "ng": "Q1033", "rw": "Q1037",
  "st": "Q1039", "sn": "Q1041", "sc": "Q1042", "sl": "Q1044", "so": "Q1045",
  "za": "Q258", "ss": "Q958", "sd": "Q1049", "tz": "Q924", "tg": "Q945",
  "tn": "Q948", "ug": "Q1036", "zm": "Q953", "zw": "Q954",
  "af": "Q889", "am": "Q399", "az": "Q227", "bh": "Q398", "bd": "Q902",
  "bt": "Q917", "bn": "Q921", "kh": "Q424", "cn": "Q148", "ge": "Q230",
  "in": "Q668", "id": "Q252", "ir": "Q794", "iq": "Q796", "il": "Q801",
  "jp": "Q17", "jo": "Q810", "kz": "Q232", "kw": "Q817", "kg": "Q813",
  "la": "Q819", "lb": "Q822", "my": "Q833", "mv": "Q826", "mn": "Q711",
  "mm": "Q836", "np": "Q837", "kp": "Q423", "om": "Q842", "pk": "Q843",
  "ps": "Q219060", "ph": "Q928", "qa": "Q846", "sa": "Q851", "sg": "Q334",
  "kr": "Q884", "lk": "Q854", "sy": "Q858", "tw": "Q865", "tj": "Q863",
  "th": "Q869", "tl": "Q574", "tm": "Q874", "ae": "Q878", "uz": "Q265",
  "vn": "Q881", "ye": "Q805",
  "al": "Q222", "ad": "Q228", "at": "Q40", "by": "Q184", "be": "Q31",
  "ba": "Q225", "bg": "Q219", "hr": "Q224", "cy": "Q229", "cz": "Q213",
  "dk": "Q35", "ee": "Q191", "fi": "Q33", "fr": "Q142", "de": "Q183",
  "gr": "Q41", "hu": "Q28", "is": "Q189", "ie": "Q27", "it": "Q38",
  "xk": "Q1246", "lv": "Q211", "li": "Q347", "lt": "Q37", "lu": "Q32",
  "mt": "Q233", "md": "Q217", "mc": "Q235", "me": "Q236", "nl": "Q55",
  "mk": "Q221", "no": "Q20", "pl": "Q36", "pt": "Q45", "ro": "Q218",
  "ru": "Q159", "sm": "Q238", "rs": "Q403", "sk": "Q214", "si": "Q215",
  "es": "Q29", "se": "Q34", "ch": "Q39", "tr": "Q43", "ua": "Q212",
  "gb": "Q145", "va": "Q237",
  "ag": "Q781", "bs": "Q778", "bb": "Q244", "bz": "Q242", "ca": "Q16",
  "cr": "Q800", "cu": "Q241", "dm": "Q784", "do": "Q786", "sv": "Q792",
  "gd": "Q769", "gt": "Q774", "ht": "Q790", "hn": "Q783", "jm": "Q766",
  "mx": "Q96", "ni": "Q811", "pa": "Q804", "kn": "Q763", "lc": "Q760",
  "vc": "Q757", "tt": "Q754", "us": "Q30",
  "ar": "Q414", "bo": "Q750", "br": "Q155", "cl": "Q298", "co": "Q739",
  "ec": "Q736", "gy": "Q734", "py": "Q733", "pe": "Q419", "sr": "Q730",
  "uy": "Q77", "ve": "Q717",
  "au": "Q408", "fj": "Q712", "ki": "Q710", "mh": "Q709", "fm": "Q702",
  "nr": "Q697", "nz": "Q664", "pw": "Q695", "pg": "Q691", "ws": "Q683",
  "sb": "Q685", "to": "Q678", "tv": "Q672", "vu": "Q686",
  "ck": "Q26988", "nu": "Q34020"
};

// Countries where we want head of state (P35) instead of head of government (P6)
// These are presidential systems or monarchies where the head of state is the real leader
const useHeadOfState = new Set([
  // Presidential systems (Africa)
  "Q262","Q916","Q962","Q963","Q965","Q967","Q1009","Q1011","Q929","Q657",
  "Q970","Q971","Q974","Q1008","Q977","Q79","Q983","Q986","Q1050","Q1000",
  "Q1005","Q117","Q1006","Q1007","Q114","Q1014","Q1016","Q1019","Q1020",
  "Q912","Q1025","Q1028","Q1029","Q1030","Q1032","Q1033","Q1037","Q1041",
  "Q1042","Q1045","Q258","Q958","Q1049","Q924","Q945","Q948","Q1036",
  "Q953","Q954",
  // Presidential systems (Asia) — Q801 (Israel) excluded: PM is the leader
  "Q889","Q227","Q902","Q148","Q668","Q252","Q794","Q796","Q232",
  "Q813","Q826","Q711","Q836","Q423","Q843","Q219060","Q928","Q884",
  "Q854","Q858","Q865","Q863","Q874","Q265","Q881","Q805",
  // Presidential systems (Americas)
  "Q800","Q241","Q786","Q792","Q774","Q790","Q96","Q811","Q804","Q30",
  "Q414","Q750","Q155","Q298","Q739","Q736","Q734","Q733","Q419","Q730",
  "Q77","Q717",
  // Presidential systems (Europe) — Q142 (France) is semi-presidential, president is the real leader
  "Q184","Q159","Q43","Q212","Q229","Q142",
  // Presidential systems (Oceania)
  "Q710","Q709","Q702","Q697","Q695",
  // Monarchies where king/sultan rules
  "Q398","Q917","Q921","Q810","Q817","Q842","Q846","Q851","Q878","Q1050",
  // Special
  "Q237","Q819"
]);

// Batch fetch leaders from Wikidata using SPARQL
async function fetchLiveLeaders() {
  const codeToQid = {};
  for (const [code, qid] of Object.entries(wikidataIds)) {
    codeToQid[qid] = code;
  }
  const qids = Object.values(wikidataIds);
  const batchSize = 50;
  const results = {};

  for (let i = 0; i < qids.length; i += batchSize) {
    const batch = qids.slice(i, i + batchSize);
    const values = batch.map(q => `wd:${q}`).join(' ');

    const query = `
      SELECT ?country ?leaderLabel ?prop ?startTime WHERE {
        VALUES ?country { ${values} }
        VALUES ?prop { "P6" "P35" }
        {
          ?country p:P6 ?stmt.
          ?stmt ps:P6 ?leader.
          OPTIONAL { ?stmt pq:P580 ?startTime. }
          FILTER NOT EXISTS { ?stmt pq:P582 ?end. }
          BIND("P6" AS ?prop)
        } UNION {
          ?country p:P35 ?stmt.
          ?stmt ps:P35 ?leader.
          OPTIONAL { ?stmt pq:P580 ?startTime. }
          FILTER NOT EXISTS { ?stmt pq:P582 ?end. }
          BIND("P35" AS ?prop)
        }
        SERVICE wikibase:label { bd:serviceParam wikibase:language "he,en". }
      }
    `;

    try {
      const url = 'https://query.wikidata.org/sparql?format=json&query=' + encodeURIComponent(query);
      const resp = await fetch(url, {
        headers: { 'Accept': 'application/sparql-results+json' }
      });
      if (!resp.ok) continue;
      const data = await resp.json();

      for (const row of data.results.bindings) {
        const qid = row.country.value.split('/').pop();
        const leader = row.leaderLabel?.value || '';
        const prop = row.prop?.value || '';
        const startTime = row.startTime?.value || '';
        const startYear = startTime ? new Date(startTime).getFullYear().toString() : '';

        const wantP35 = useHeadOfState.has(qid);
        const isPreferred = (wantP35 && prop === 'P35') || (!wantP35 && prop === 'P6');

        if (!results[qid]) {
          results[qid] = { leader, leaderSince: startYear, preferred: isPreferred };
        } else if (isPreferred && !results[qid].preferred) {
          results[qid] = { leader, leaderSince: startYear, preferred: true };
        }
      }
    } catch (e) {
      console.warn('Wikidata batch failed:', e);
    }
  }

  return results;
}

// Apply live data to countries array
async function updateCountriesFromWikidata() {
  const statusEl = document.getElementById('update-status');
  if (statusEl) statusEl.textContent = 'מעדכן נתונים מוויקידאטה...';

  try {
    const liveData = await fetchLiveLeaders();
    let updated = 0;

    for (const country of countries) {
      const qid = wikidataIds[country.code];
      if (!qid || !liveData[qid]) continue;

      const live = liveData[qid];
      if (live.leader && live.leader !== country.leader) {
        console.log(`Updated ${country.nameEn}: ${country.leader} → ${live.leader}`);
        country.leader = live.leader;
        if (live.leaderSince) country.leaderSince = live.leaderSince;
        updated++;
      }
    }

    if (statusEl) {
      if (updated > 0) {
        statusEl.textContent = `עודכנו ${updated} מנהיגים מוויקידאטה`;
        statusEl.style.color = '#059669';
      } else {
        statusEl.textContent = 'הנתונים עדכניים ✓';
        statusEl.style.color = '#059669';
      }
      setTimeout(() => { statusEl.style.opacity = '0'; }, 4000);
    }

    return updated;
  } catch (e) {
    console.warn('Wikidata update failed:', e);
    if (statusEl) {
      statusEl.textContent = 'לא ניתן לעדכן מוויקידאטה';
      statusEl.style.color = '#dc2626';
      setTimeout(() => { statusEl.style.opacity = '0'; }, 4000);
    }
    return 0;
  }
}
