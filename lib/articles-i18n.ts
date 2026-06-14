import type { Lang } from '@/lib/i18n'
import { articleContentEN } from '@/lib/article-content'

export interface BlogChromeDict {
  eyebrow: string
  h1pre: string
  h1em: string
  sub: string
  backToBlog: string
  ctaTitle: string
  ctaSub: string
  ctaShop: string
  ctaQuiz: string
  more: string
}

export const blogChrome: Record<Lang, BlogChromeDict> = {
  en: {
    eyebrow: `bloom focus blog`, h1pre: `Understanding your `, h1em: `ADHD brain`,
    sub: `No jargon, no shame, no "just try harder." Real information about how neurodivergent brains work — and what actually helps.`,
    backToBlog: `← Back to blog`, ctaTitle: `Ready to try tools that actually work?`,
    ctaSub: `Browse the bloom focus toolkit — designed for ADHD brains, built with care.`,
    ctaShop: `Shop the toolkit ✨`, ctaQuiz: `Take the free ADHD test 🧠`, more: `More from the blog`,
  },
  de: {
    eyebrow: `bloom focus Blog`, h1pre: `Verstehe dein `, h1em: `ADHS-Gehirn`,
    sub: `Kein Fachjargon, keine Scham, kein „streng dich einfach mehr an". Echte Informationen darüber, wie neurodivergente Gehirne funktionieren – und was wirklich hilft.`,
    backToBlog: `← Zurück zum Blog`, ctaTitle: `Bereit für Werkzeuge, die wirklich funktionieren?`,
    ctaSub: `Entdecke das bloom focus Toolkit – für ADHS-Köpfe gestaltet, mit Sorgfalt gemacht.`,
    ctaShop: `Zum Toolkit ✨`, ctaQuiz: `Kostenlosen ADHS-Test machen 🧠`, more: `Mehr aus dem Blog`,
  },
  fr: {
    eyebrow: `blog bloom focus`, h1pre: `Comprendre ton `, h1em: `cerveau TDAH`,
    sub: `Pas de jargon, pas de honte, pas de « fais juste plus d'efforts ». De vraies informations sur le fonctionnement des cerveaux neurodivergents – et ce qui aide vraiment.`,
    backToBlog: `← Retour au blog`, ctaTitle: `Prêt·e à essayer des outils qui marchent vraiment ?`,
    ctaSub: `Découvre la boîte à outils bloom focus – pensée pour les cerveaux TDAH, conçue avec soin.`,
    ctaShop: `Découvrir les outils ✨`, ctaQuiz: `Faire le test TDAH gratuit 🧠`, more: `Plus d'articles du blog`,
  },
  es: {
    eyebrow: `blog bloom focus`, h1pre: `Entender tu `, h1em: `cerebro con TDAH`,
    sub: `Sin jerga, sin culpa, sin «solo esfuérzate más». Información real sobre cómo funcionan los cerebros neurodivergentes, y qué ayuda de verdad.`,
    backToBlog: `← Volver al blog`, ctaTitle: `¿Listo·a para probar herramientas que de verdad funcionan?`,
    ctaSub: `Explora el kit bloom focus: diseñado para cerebros con TDAH, hecho con cariño.`,
    ctaShop: `Ver las herramientas ✨`, ctaQuiz: `Hacer el test TDAH gratis 🧠`, more: `Más del blog`,
  },
}

// English blog tag -> localized
export const blogTagMap: Record<Lang, Record<string, string>> = {
  en: {},
  de: { 'Understanding ADHD': `ADHS verstehen`, 'Tools & Tips': `Tools & Tipps` },
  fr: { 'Understanding ADHD': `Comprendre le TDAH`, 'Tools & Tips': `Outils & astuces` },
  es: { 'Understanding ADHD': `Entender el TDAH`, 'Tools & Tips': `Herramientas y consejos` },
}

// Localized title + excerpt per slug (en comes from lib/articles).
export const articleMeta: Record<string, Partial<Record<Lang, { title: string; excerpt: string }>>> = {
  'adhd-rejection-sensitive-dysphoria': {
    de: { title: `ADHS und Rejection Sensitive Dysphoria: Warum Kritik so weh tut`, excerpt: `Wenn eine kleine Kritik deinen ganzen Tag ruinieren kann, bist du nicht zu empfindlich – vielleicht erlebst du RSD, einen der schmerzhaftesten und am wenigsten bekannten Teile von ADHS.` },
  },
  'adhd-and-sleep': {
    de: { title: `ADHS und Schlaf: Warum dein Gehirn nachts nicht abschaltet`, excerpt: `Gedankenkarussell um Mitternacht, ein zweiter Wind genau dann, wenn du schlafen solltest, Morgen, die unmöglich scheinen – ADHS und Schlafprobleme gehören zusammen. Hier ist, warum, und was hilft.` },
  },
  'body-doubling-adhd': {
    de: { title: `Body Doubling: Der ADHS-Fokus-Trick, der wirklich funktioniert`, excerpt: `Warum fällt das Arbeiten so viel leichter, wenn jemand anderes im Raum ist? Body Doubling macht daraus eine Strategie – eines der zuverlässigsten ADHS-Fokus-Werkzeuge überhaupt.` },
  },
  'adhd-burnout': {
    de: { title: `ADHS-Burnout: Die Anzeichen, dass du auf dem Zahnfleisch gehst (und wie du dich erholst)`, excerpt: `ADHS-Burnout ist keine gewöhnliche Müdigkeit – es ist der Zusammenbruch nach Monaten des Maskierens und Überkompensierens. Hier ist, wie du es erkennst und sanft genesen kannst.` },
  },
  'how-to-clean-with-adhd': {
    de: { title: `Wie du mit ADHS dein Zuhause putzt – ohne Überforderung`, excerpt: `Wenn Putzen unmöglich scheint, bis es zur Krise wird, bist du nicht faul – dein Gehirn braucht nur einen anderen Ansatz. So putzt du mit einem ADHS-Gehirn, Schritt für sanften Schritt.` },
  },
  'why-adhd-brains-struggle-with-planning': {
    de: { title: `Warum ADHS-Gehirne mit Planung kämpfen (und was wirklich hilft)`, excerpt: `Planung fühlt sich unmöglich an – nicht weil du faul bist, sondern weil dein Gehirn anders verdrahtet ist. Hier ist die Wissenschaft dahinter und was du tun kannst.` },
    fr: { title: `Pourquoi les cerveaux TDAH peinent à planifier (et ce qui aide vraiment)`, excerpt: `Planifier semble impossible – non parce que tu es paresseux·se, mais parce que ton cerveau est câblé différemment. Voici la science, et ce que tu peux y faire.` },
    es: { title: `Por qué a los cerebros con TDAH les cuesta planificar (y qué ayuda de verdad)`, excerpt: `Planificar parece imposible, no porque seas perezoso·a, sino porque tu cerebro está cableado de otra forma. Aquí tienes la ciencia y qué puedes hacer.` },
  },
  'dopamine-menu-guide': {
    de: { title: `Was ist ein Dopamin-Menü und wie erstellst du eines, das funktioniert`, excerpt: `Ein Dopamin-Menü ist eines der wirksamsten ADHS-Werkzeuge – und überraschend einfach. So baust du deins.` },
    fr: { title: `Qu'est-ce qu'un menu dopamine et comment en créer un qui marche`, excerpt: `Le menu dopamine est l'un des outils TDAH les plus efficaces – et étonnamment simple. Voici comment créer le tien.` },
    es: { title: `Qué es un menú de dopamina y cómo crear uno que funcione`, excerpt: `Un menú de dopamina es una de las herramientas TDAH más eficaces, y sorprendentemente simple. Así creas el tuyo.` },
  },
  'time-blindness-adhd': {
    de: { title: `Zeitblindheit: Warum du das Vergehen der Zeit nicht spürst (und was hilft)`, excerpt: `Zeitblindheit ist eines der am meisten missverstandenen ADHS-Symptome. Es geht nicht um Verantwortungslosigkeit – es ist neurologisch.` },
    fr: { title: `Cécité temporelle : pourquoi tu ne sens pas le temps passer (et ce qui aide)`, excerpt: `La cécité temporelle est l'un des symptômes du TDAH les plus mal compris. Ce n'est pas de l'irresponsabilité – c'est neurologique.` },
    es: { title: `Ceguera temporal: por qué no sientes pasar el tiempo (y qué ayuda)`, excerpt: `La ceguera temporal es uno de los síntomas del TDAH más malinterpretados. No es irresponsabilidad: es neurológico.` },
  },
  'habit-stacking-adhd': {
    de: { title: `Habit Stacking bei ADHS: Routinen aufbauen, die wirklich bleiben`, excerpt: `Die meisten Gewohnheits-Tipps versagen bei ADHS-Köpfen. Hier ist ein sanfterer Ansatz, der mit deinem Gehirn arbeitet.` },
    fr: { title: `Habit stacking et TDAH : construire des routines qui tiennent vraiment`, excerpt: `La plupart des conseils sur les habitudes échouent avec les cerveaux TDAH. Voici une approche plus douce, adaptée à ton fonctionnement.` },
    es: { title: `Habit stacking y TDAH: crear rutinas que de verdad se quedan`, excerpt: `La mayoría de los consejos sobre hábitos fallan con los cerebros con TDAH. Aquí tienes un enfoque más suave, hecho a tu medida.` },
  },
  'do-i-have-adhd-test': {
    de: { title: `Hast du ADHS? Wie du es erkennst – und was du als Nächstes tust`, excerpt: `Fragst du dich, ob du ADHS hast? Hier sind die Anzeichen, die Erwachsene wirklich erleben, wie sich unaufmerksamer und hyperaktiver Typ unterscheiden, und die nächsten Schritte.` },
    fr: { title: `As-tu un TDAH ? Comment le savoir – et que faire ensuite`, excerpt: `Tu te demandes si tu as un TDAH ? Voici les signes que vivent vraiment les adultes, en quoi les types inattentif et hyperactif diffèrent, et les étapes à suivre.` },
    es: { title: `¿Tienes TDAH? Cómo saberlo y qué hacer después`, excerpt: `¿Te preguntas si tienes TDAH? Aquí están las señales que viven de verdad los adultos, en qué se diferencian el tipo inatento y el hiperactivo, y los pasos a seguir.` },
  },
  'adhd-paralysis': {
    de: { title: `ADHS-Paralyse: Warum du erstarrst – und wie du wieder ins Tun kommst`, excerpt: `Du weißt genau, was zu tun ist, du willst es tun, und kommst trotzdem nicht von der Stelle. Das ist ADHS-Paralyse. Hier ist, warum sie passiert, und sanfte Wege heraus.` },
    fr: { title: `Paralysie TDAH : pourquoi tu te figes – et comment te débloquer`, excerpt: `Tu sais exactement quoi faire, tu veux le faire, et tu n'arrives toujours pas à bouger. C'est la paralysie TDAH. Voici pourquoi elle arrive et des façons douces de briser le gel.` },
    es: { title: `Parálisis por TDAH: por qué te bloqueas y cómo desatascarte`, excerpt: `Sabes exactamente qué hacer, quieres hacerlo y aun así no logras moverte. Eso es la parálisis por TDAH. Aquí está por qué ocurre y formas suaves de romper el bloqueo.` },
  },
  'best-planner-for-adhd': {
    de: { title: `Der beste Planer für ADHS (und warum die meisten Planer dich im Stich lassen)`, excerpt: `Die meisten Planer sind für neurotypische Gehirne gemacht – deshalb verstauben sie ab Woche zwei. Das sollte ein ADHS-freundlicher Planer wirklich können.` },
    fr: { title: `Le meilleur agenda pour le TDAH (et pourquoi la plupart te laissent tomber)`, excerpt: `La plupart des agendas sont pensés pour les cerveaux neurotypiques – d'où la poussière dès la deuxième semaine. Voici ce qu'un agenda adapté au TDAH doit vraiment avoir.` },
    es: { title: `La mejor agenda para el TDAH (y por qué la mayoría te fallan)`, excerpt: `La mayoría de las agendas están hechas para cerebros neurotípicos, por eso acumulan polvo en la segunda semana. Esto es lo que una agenda apta para el TDAH necesita de verdad.` },
  },
  'adhd-in-women': {
    de: { title: `ADHS bei Frauen: Die Anzeichen, die jahrelang übersehen werden`, excerpt: `ADHS bei Frauen wird chronisch unterdiagnostiziert, weil es oft wie Angst, Perfektionismus oder einfach „Zerstreutheit" aussieht. Hier sind die übersehenen Anzeichen.` },
    fr: { title: `Le TDAH chez les femmes : les signes que l'on rate pendant des années`, excerpt: `Le TDAH chez les femmes est chroniquement sous-diagnostiqué car il ressemble souvent à de l'anxiété, du perfectionnisme ou à de la « tête en l'air ». Voici les signes que l'on néglige.` },
    es: { title: `TDAH en mujeres: las señales que se pasan por alto durante años`, excerpt: `El TDAH en mujeres está crónicamente infradiagnosticado porque a menudo parece ansiedad, perfeccionismo o simplemente ser «despistada». Aquí están las señales que se pasan por alto.` },
  },
}

// Localized article bodies (paragraph arrays) per slug. Filled in language by
// language; any slug/lang not present here falls back to the English body.
export const articleBody: Record<string, Partial<Record<Lang, string[]>>> = {
  'adhd-rejection-sensitive-dysphoria': {
    de: [
      `Rejection Sensitive Dysphoria, kurz RSD, ist der intensive emotionale Schmerz, der auf echte oder vermeintliche Ablehnung, Kritik oder Misserfolg folgt. Für viele Menschen mit ADHS ist es das störendste Symptom von allen, und doch wird fast niemand bei der Diagnose davor gewarnt. Eine beiläufige Bemerkung einer Kollegin, eine Nachricht, die unbeantwortet bleibt, oder ein winziger Fehler bei der Arbeit kann jeweils eine Welle von Schmerz auslösen, die sich körperlich anfühlt und in keinem Verhältnis zu dem steht, was tatsächlich passiert ist.`,
      `Der Grund ist neurologisch, keine Frage von Dünnhäutigkeit. ADHS-Gehirne regulieren Emotionen anders, und Gefühle kommen tendenziell schneller, lauter und schwerer abschaltbar. Dieselben Dopamin- und Noradrenalin-Systeme, die das Fokussieren erschweren, machen auch die emotionale Intensität schwerer herunterzuregeln – wo eine neurotypische Person einen kleinen Stich spürt, kann ein ADHS-Gehirn innerhalb von Sekunden etwas erleben, das echter Verzweiflung näherkommt.`,
      `RSD trägt viele verschiedene Verkleidungen. Manchmal sieht es aus wie People-Pleasing, bei dem du zu allem Ja sagst, damit niemand je von dir enttäuscht ist. Manchmal sieht es aus wie Perfektionismus oder das stille Vermeiden von Dingen, bei denen du scheitern könntest. Manchmal kippt es nach außen in plötzliche Wut oder Abwehr. Und sehr oft sieht es aus wie Rückzug: Pläne absagen, Feedback meiden oder dich von Menschen zurückziehen, sobald du spürst, dass du beurteilt werden könntest.`,
      `Weil der Schmerz unsichtbar ist, wird Menschen mit RSD oft gesagt, sie würden überreagieren oder seien dramatisch. Diese Reaktion macht alles schlimmer, weil sie Scham auf ein ohnehin überwältigendes Gefühl stapelt. Zu verstehen, dass RSD ein anerkanntes Muster innerhalb von ADHS ist und kein Charakterfehler, ist oft das Erleichterndste, was ein Mensch lernen kann, weil es endlich ein Leben voller Reaktionen erklärt, die nie Sinn zu ergeben schienen.`,
      `Was hilft, ist eine Mischung aus Benennen und Distanz. Den Moment als „das ist RSD, nicht die Wahrheit" zu erkennen, schafft einen kleinen Abstand zwischen dem Gefühl und deiner Reaktion darauf. Zu warten, bevor du auf eine auslösende Nachricht antwortest, deine Deutung an den tatsächlichen Fakten zu prüfen und dir sanfte Skripte für das Annehmen von Feedback vorzubereiten, senken alle die Intensität. Genauso hilft offenes Reden mit Menschen, denen du vertraust und die dich daran erinnern, dass ein Kommentar kein Urteil über deinen Wert ist.`,
      `Vor allem reagiert RSD auf Selbstmitgefühl statt auf Selbstkritik. Das Gefühl ist real und es ist schmerzhaft, aber es ist auch vorübergehend, und es geht schneller vorbei, wenn du ihm mit Freundlichkeit begegnest, statt es zu bekämpfen. Du bist nicht zu viel, und du bist nicht kaputt. Du hast einfach ein Gehirn, das Dinge in voller Lautstärke fühlt – und dieselbe Intensität, in eine andere Richtung gelenkt, ist oft auch dort, wo deine Wärme und Kreativität herkommen.`,
    ],
  },
  'adhd-and-sleep': {
    de: [
      `Wenn dein Gehirn in dem Moment lebendig wird, in dem dein Kopf das Kissen berührt, bist du alles andere als allein. Schlafprobleme gehören zu den häufigsten und am wenigsten besprochenen Seiten von ADHS und betreffen eine große Mehrheit der Erwachsenen mit dieser Diagnose. Das Muster ist schmerzhaft vertraut: den ganzen Tag erschöpft, dann plötzlich nachts hellwach, mit einem Kopf, der durch Gespräche, Ideen, Sorgen und die To-do-Liste von morgen rast – genau dann, wenn du ihn am dringendsten still bräuchtest.`,
      `Ein Teil davon ist schlicht biologisch. Viele Menschen mit ADHS haben einen verschobenen zirkadianen Rhythmus, was bedeutet, dass ihr natürliches Schlafsignal ein paar Stunden später eintrifft, als der Rest der Welt es erwartet. Hinzu kommt, dass das ADHS-Gehirn unterstimuliert ist, wenn es nichts zu tun gibt, sodass sich die Stille der Schlafenszeit eher unerträglich als erholsam anfühlt und der Geist nach Stimulation sucht – in Form von rasenden Gedanken oder noch einer Folge.`,
      `Hier kommt der berüchtigte zweite Wind ins Spiel. Gerade wenn dein Körper endlich bereit ist herunterzufahren, taucht ein Energie- oder Fokusschub auf, und plötzlich putzt du um Mitternacht gründlich die Küche oder beginnst ein Projekt. Forschende nennen das weitere Muster manchmal Revenge Bedtime Procrastination: Wenn der Tag dir keine Zeit gelassen hat, die sich nach dir anfühlt, wird die späte Nacht zum einzigen Fenster für Freiheit – und der Schlaf verliert leise.`,
      `Die Morgen zahlen dann den Preis. ADHS-Gehirne erleben oft eine intensive Schlafträgheit, jenen schweren, nebligen Zustand, der das Aufstehen fast unmöglich macht, egal wie viele Wecker gestellt sind. Das ist keine Faulheit und kein moralisches Versagen. Es ist das vorhersehbare Ergebnis eines Gehirns, das viel zu spät eingeschlafen ist und nun auf einem Zeitplan aufwachen soll, der für die innere Uhr von jemand anderem gemacht wurde.`,
      `Was hilft, ist sanft und beständig statt streng. Eine Einschlafroutine, die früher beginnt, als nötig scheint, ein Brain Dump auf Papier, um die rasenden Gedanken vor dem Schlafen zu leeren, gedämpftes Licht am Abend und helles Licht am Morgen sowie eine Aufstehzeit, die auch am Wochenende ungefähr gleich bleibt, schieben den Rhythmus alle zurück an seinen Platz. Die Aufgaben von morgen zu externalisieren, damit dein Gehirn darauf vertraut, dass sie sicher festgehalten sind, ist oft der Unterschied zwischen Wachliegen und Loslassen.`,
      `Sei geduldig mit dir, während du experimentierst, denn Schlaf wird selten in einer einzigen Nacht repariert. Das Ziel ist keine perfekte Lehrbuch-Schlafhygiene; es ist eine Handvoll kleiner, wiederholbarer Gewohnheiten, die das Einschlafen ein wenig leichter und die Morgen ein wenig freundlicher machen. Mit deiner inneren Uhr zu arbeiten statt gegen sie ist weit nachhaltiger, als einen Zeitplan zu erzwingen, der nie für ein ADHS-Gehirn gebaut wurde.`,
    ],
  },
  'body-doubling-adhd': {
    de: [
      `Ist dir schon aufgefallen, wie viel leichter dir Dinge von der Hand gehen, wenn einfach jemand anderes im Raum ist? Genau das ist die Idee hinter Body Doubling, einer der zuverlässigsten Fokus-Strategien für ADHS-Gehirne. Ein Body Double ist eine Person, die neben dir arbeitet – nicht bei deiner Aufgabe hilft, sondern nur anwesend ist – und deren ruhige Gegenwart die unmögliche Aufgabe irgendwie plötzlich machbar macht.`,
      `Es funktioniert, weil ADHS im Kern eine Herausforderung der Selbstregulation ist und nicht des Wissens. Meist weißt du genau, was zu tun ist; das Schwierige ist das Anfangen und Dranbleiben. Eine andere Person dort zu haben, schafft sanfte äußere Verbindlichkeit und ein geliehenes Gefühl von Fokus, und es fügt gerade genug Neuheit und milde soziale Präsenz hinzu, um deinem Gehirn den Dopamin-Schubs zu geben, den es zum Beginnen und Weitermachen braucht.`,
      `Body Doubling gibt es in vielen Formen, du kannst also wählen, was zu deinem Leben passt. Es kann eine Freundin sein, die auf dem Sofa liest, während du Papierkram sortierst, ein Partner, der kocht, während du aufräumst, oder ein Videoanruf, bei dem zwei Menschen in Stille an völlig getrennten Dingen arbeiten. Es gibt auch eigene virtuelle Coworking-Plattformen und ADHS-freundliche Fokus-Apps, bei denen du dich einer Sitzung mit Fremden anschließt und einfach parallel arbeitest.`,
      `Die Einrichtung ist erfrischend einfach. Entscheide, woran du arbeiten wirst, sag deinem Body Double, was du beginnst, einigt euch auf eine Zeitspanne und fangt dann gemeinsam an. Ein kurzer Check-in am Ende, bei dem ihr benennt, was jede und jeder geschafft hat, schließt den Kreis und beschert ein kleines Gefühl von Zufriedenheit. Entscheidend ist, dass dich niemand beaufsichtigt oder bewertet; der Zauber liegt rein in der geteilten Anwesenheit.`,
      `Body Doubling glänzt genau bei den Aufgaben, die ADHS-Gehirne am meisten meiden: langweiliger Papierkram, Putzen, E-Mail-Rückstände, Formulare ausfüllen und alles, was seit Wochen unangetastet liegt. Es geht weniger um die Fähigkeiten der anderen Person und mehr darum, den Bann des Vermeidens zu brechen – deshalb kann selbst ein nahezu stiller Begleiter, der nichts von deiner Arbeit versteht, völlig verändern, was du zu erledigen schaffst.`,
      `Wenn du immer schon besser in einem belebten Café gearbeitet oder dich seltsam produktiv gefühlt hast, wenn eine Freundin in der Nähe war, dann macht Body Doubling aus diesem Instinkt einfach ein Werkzeug, nach dem du bewusst greifen kannst. Es ist keine Krücke und kein Schummeln. Es ist eine kluge Anpassung, die mit der Verdrahtung deines Gehirns arbeitet, und viele erleben es als eine ihrer verlässlichsten Arten, anzufangen.`,
    ],
  },
  'adhd-burnout': {
    de: [
      `ADHS-Burnout ist nicht dasselbe wie gewöhnliche Müdigkeit, und es ist nicht dasselbe wie alltäglicher Stress. Es ist die tiefe, den ganzen Körper erfassende Erschöpfung, die nach Monaten oder Jahren kommt, in denen ein Gehirn gezwungen wurde, auf Arten zu funktionieren, für die es nie gebaut war. Oft folgt es auf eine lange Phase des Maskierens, Überkompensierens und Sich-durch-den-Alltag-Beißens, bis eines Tages die Systeme, die kaum noch hielten, schließlich alle auf einmal versagen.`,
      `ADHS-Gehirne sind besonders anfällig dafür, weil so viel unsichtbare Anstrengung darin steckt, in Ordnung zu wirken. Erinnern, Planen, Impulse unterdrücken, Emotionen steuern und neurotypische Erwartungen erfüllen kosten alle exekutive Energie, die ohnehin knapp ist. In einem ständigen Zustand des Aufholens zu leben, erzeugt eine Art chronischen exekutiven Überziehungskredit, und irgendwann wird die Rechnung in Form von Burnout fällig.`,
      `Die Anzeichen werden leicht für etwas anderes gehalten. Aufgaben, die einst machbar waren, beginnen sich unmöglich anzufühlen, die Motivation verschwindet völlig, und selbst kleine Entscheidungen werden überwältigend. Du fühlst dich vielleicht emotional flach oder ungewöhnlich nah am Wasser gebaut, wirst öfter krank, ziehst dich von den Menschen um dich herum zurück und bemerkst, wie deine ADHS-Symptome – von Vergesslichkeit über Zeitblindheit bis Ablenkbarkeit – dramatisch schlimmer werden als sonst.`,
      `Was ADHS-Burnout so grausam macht, ist die Scham, die danebenherläuft. Viele deuten den Zusammenbruch als Beweis, dass sie faul sind oder versagen, und versuchen dann, sich mit genau der Anstrengung hindurchzuzwingen, die ihn überhaupt verursacht hat. Diese Reaktion vertieft das Loch nur, denn Burnout löst man nicht durch mehr Anstrengung; man löst es, indem man für eine Weile wirklich – und oft unbequem – weniger tut.`,
      `Erholung beginnt mit der Erlaubnis, zu ruhen, ohne es sich zu verdienen. Die Messlatte bewusst niedriger zu legen, jede nicht zwingende Verpflichtung fallenzulassen, Aufgaben zu externalisieren, damit dein Gehirn aufhören kann, sie zu halten, und um Unterstützung zu bitten, sind keine Nachgiebigkeiten; sie sind die eigentliche Behandlung. Es hilft auch, ehrlich anzuschauen, was hierher geführt hat, denn Burnout ist häufig ein Zeichen, dass dein Leben mehr von deiner exekutiven Funktion verlangt, als irgendein Gehirn nachhaltig geben kann.`,
      `Von ADHS-Burnout zu heilen geht selten schnell, und es kommt eher in Wellen als in einer geraden Linie. Sei geduldig und sanft mit dir, schütze deine Energie, als ob sie zählt – denn das tut sie wirklich –, und baue deine Routinen langsam wieder auf, mit weit mehr Raum für Ruhe, als vernünftig scheint. Das Ziel ist nicht, zurück zum Laufen auf Reserve zu kommen; es ist, ein Leben zu bauen, das den Tank gar nicht erst leert.`,
    ],
  },
  'how-to-clean-with-adhd': {
    de: [
      `Wenn dein Zuhause zwischen makellos und totalem Chaos pendelt, mit sehr wenig dazwischen, bist du nicht faul und kein Schlamper. Putzen ist für ADHS-Gehirne wirklich schwerer, weil es genau auf den Fähigkeiten sitzt, die ADHS erschwert: anfangen, in eine Reihenfolge bringen, die Aufmerksamkeit halten und sich von einer Aufgabe motivieren lassen, die keine Neuheit und sehr wenig Belohnung bietet, bis sie vollständig fertig ist.`,
      `Ein großer Teil des Kampfes ist das Alles-oder-nichts-Denken. Viele Menschen mit ADHS empfinden, dass Putzen nur zählt, wenn sie das ganze Haus perfekt machen, sodass die Aufgabe zu etwas so Riesigem anschwillt, dass das Gehirn sich weigert, überhaupt zu beginnen. Das Chaos wächst dann, bis es zur echten Krise wird, die endlich genug Dringlichkeit und Adrenalin erzeugt, um zu handeln – in einem erschöpfenden und nicht haltbaren Kreislauf.`,
      `Der Ausweg ist, den ersten Schritt fast lächerlich klein zu machen. Statt „die Küche putzen" wird die Aufgabe „einen Abschnitt der Arbeitsfläche frei räumen". Einen Timer auf nur fünf oder zehn Minuten zu stellen, wirkt Wunder, weil es deinem Gehirn einen klaren, begrenzten Endpunkt und die volle Erlaubnis gibt, aufzuhören, wenn er klingelt. Meistens ist das Anfangen der schwerste Teil, und ein wenig Schwung trägt dich weiter, als du erwartet hast.`,
      `Sich etwas Dopamin zu leihen, macht das Ganze leichter. Eine Lieblings-Playlist, ein fesselnder Podcast oder ein Hörbuch verwandeln eine langweilige Aufgabe in etwas Erträgliches oder sogar Angenehmes. Body Doubling hilft auch, denn neben einer Freundin, einem Partner oder sogar bei einem Videoanruf zu putzen, hält dich verankert, und dir selbst eine kleine, konkrete Belohnung am Ende zu versprechen, gibt deinem Gehirn etwas Greifbares, worauf es zugehen kann.`,
      `Es hilft auch, einen Reset statt einen Grundputz anzustreben. Dein Ziel ist an den meisten Tagen einfach, den Raum wieder funktional zu machen, nicht magazin-perfekt, und „gut genug" ist eine völlig legitime Ziellinie. Putzutensilien sichtbar und griffbereit zu halten, deine Ansprüche bewusst zu senken und einen Raum oder sogar eine Fläche nach der anderen anzugehen, verringern alle die Reibung, die dich vom Anfangen abhält.`,
      `Am wichtigsten: lass das moralische Gewicht los, das du an ein aufgeräumtes Zuhause geknüpft hast. Ein unordentlicher Raum ist kein Beweis für einen unordentlichen Charakter; er ist schlicht ein Zeichen, dass Standard-Putztipps nie für die Art gemacht waren, wie dein Gehirn funktioniert. Mit winzigen Schritten, einem Timer, etwas Dopamin und sehr viel weniger Scham wird ein ruhigeres Zuhause weit erreichbarer – und ein sanfter Planer, der die Arbeit in kleine Stücke zerlegt, kann überraschend viel dieser Last für dich tragen.`,
    ],
  },
  'why-adhd-brains-struggle-with-planning': {
    de: [
      `Wenn du ADHS hast, fühlt sich Planung wahrscheinlich an, als würdest du Wasser in den Händen halten wollen. Du startest mit guten Vorsätzen – ein frischer Planer, ein neues System, ein optimistischer Montagmorgen – und irgendwie ist bis Dienstag schon alles wieder zerfallen. Das ist kein Charakterfehler. Das ist Neurowissenschaft.`,
      `ADHS betrifft den präfrontalen Kortex, den Teil des Gehirns, der für die exekutiven Funktionen zuständig ist – Planen, Priorisieren, Zeitmanagement und das Beginnen von Aufgaben. Wenn dieses System nicht so funktioniert wie bei neurotypischen Menschen, helfen herkömmliche Planungsmethoden nicht nur nicht. Sie machen es sogar schlimmer.`,
      `Herkömmliche Planer setzen voraus, dass du auf eine Liste schaust und dich motiviert fühlst, anzufangen. Für ADHS-Gehirne funktioniert Motivation nicht so. ADHS-Gehirne werden von Interesse, Dringlichkeit, Neuheit und Herausforderung angetrieben – nicht von Wichtigkeit oder Priorität. Eine Aufgabe kann entscheidend wichtig sein und sich trotzdem unmöglich anfühlen, während eine völlig belanglose, aber interessante Aufgabe sofort erledigt wird.`,
      `Zeitblindheit ist ein weiterer wichtiger Faktor. Die meisten Menschen haben eine innere Uhr, die ihnen hilft, das Vergehen der Zeit zu spüren. ADHS-Gehirnen fehlt das oft – was dazu führt, dass man plötzlich merkt, dass Stunden vergangen sind, oder dass eine Deadline morgen ist, obwohl sie sich wie Wochen entfernt anfühlte.`,
      `Was hilft wirklich? Systeme, die mit diesen Mustern arbeiten statt gegen sie. Energiebasierte Planung (Aufgaben nach deinem natürlichen Energielevel planen). Time-Timer (visuelle Darstellungen des Vergehens der Zeit). Body Doubling (an der Seite einer anderen Person arbeiten). Und die Schamspirale auflösen, die aus dem Scheitern eines Systems entsteht – denn genau diese Scham macht das Anfangen oft noch schwerer.`,
      `Das Ziel ist nicht, dein ADHS-Gehirn zu reparieren. Das Ziel ist, ein Leben zu bauen, das zu dem Gehirn passt, das du hast.`,
    ],
  },
  'dopamine-menu-guide': {
    de: [
      `Ein Dopamin-Menü ist genau das, wonach es klingt: eine kuratierte Liste von Aktivitäten, die deinem Gehirn einen Dopamin-Schub geben, aufgebaut wie eine Speisekarte. Schnelle Kicks. Mittlere Pausen. Optionen zum vollständigen Aufladen. Die Idee ist einfach, aber für ADHS-Gehirne kann sie wirklich lebensverändernd sein.`,
      `ADHS ist in vielerlei Hinsicht eine Störung der Dopaminregulation. Das Gehirn produziert oder verarbeitet Dopamin nicht auf die typische Weise – deshalb suchen ADHS-Gehirne ständig nach Stimulation, Neuheit und Belohnung. Ohne genug Dopamin fühlt sich das Beginnen von Aufgaben unmöglich an. Die Konzentration verflüchtigt sich. Die Motivation verschwindet völlig.`,
      `Ein Dopamin-Menü gibt dir eine vorgeplante, schuldfreie Möglichkeit, deinen Dopaminspiegel zu regulieren. Statt Doomscrolling oder impulsiv eine ganze Tüte Chips zu essen (beides völlig nachvollziehbares dopaminsuchendes Verhalten), hast du Optionen bereit. Optionen, die du gewählt hast, als dein Gehirn in einem guten Zustand war – nicht, als es verzweifelt war.`,
      `So baust du deins: Beginne damit, Aktivitäten aufzulisten, die dich wirklich aufleuchten lassen. Nicht Dinge, die du genießen solltest – Dinge, die tatsächlich wirken. In der Küche tanzen. Ein bestimmter YouTube-Kanal. Ein Fünf-Minuten-Spaziergang. Einer Freundin etwas Nettes schreiben. Ordne sie dann nach Zeit- und Energieaufwand.`,
      `Schnelle Kicks (1–5 Minuten): Dinge, die du zwischen Aufgaben tun kannst, ohne den Schwung zu verlieren. Mittlere Pausen (10–20 Minuten): echte Erholungszeit. Tiefes Aufladen (30+ Minuten): für die Momente, in denen du wirklich erschöpft bist. Der Schlüssel ist, die Liste bereit zu haben, bevor du sie brauchst – denn wenn das Dopamin niedrig ist, fällt das Entscheiden noch schwerer.`,
      `Druck sie aus. Häng sie irgendwo gut sichtbar auf. Und denk daran: dein Dopamin-Menü zu nutzen, ist kein Aufschieben. Es ist Pflege.`,
    ],
  },
  'time-blindness-adhd': {
    de: [
      `Zeitblindheit gehört zu den am meisten missverstandenen Aspekten von ADHS. Es ist nicht so, dass Menschen mit ADHS sich nicht um Zeit kümmern, dass sie verantwortungslos wären oder sich einfach „mehr anstrengen" müssten. Zeitblindheit ist neurologisch – das ADHS-Gehirn erlebt Zeit wirklich anders.`,
      `Dr. Russell Barkley, einer der führenden ADHS-Forscher, beschreibt es so: Die meisten Menschen erleben Zeit als einen kontinuierlichen Fluss, den sie spüren können. ADHS-Gehirne neigen dazu, nur zwei Zeiten zu erleben: jetzt und nicht jetzt. Der Abstand zwischen „in einer Stunde" und „in drei Wochen" ist im Grunde derselbe – beides ist „nicht jetzt".`,
      `Das erklärt so vieles. Warum Deadlines weit weg wirken und dann plötzlich zu nah sind. Warum sich 20 Minuten unter der Dusche wie 5 anfühlen. Warum du nicht spürst, dass du zu spät dran bist, bis du schon sehr spät dran bist. Warum Hyperfokus Stunden verschlingen kann, ohne dass du es merkst.`,
      `Was hilft? Zeit sichtbar machen. Eine große analoge Uhr an deinem Arbeitsplatz. Ein Time-Timer (ein visueller Timer, der das Vergehen der Zeit als schrumpfenden roten Bogen zeigt). Wecker stellen – nicht nur für den Moment, in dem du los musst, sondern auch für 30 Minuten vorher, 15 Minuten vorher. In zeitlich begrenzten Blöcken arbeiten statt in offenen Sitzungen.`,
      `Übergangswarnungen helfen ebenfalls enorm – gib dir selbst eine Vorwarnung von 5 Minuten, bevor du die Aufgabe wechselst, statt zu erwarten, dass dein Gehirn sofort umschaltet. Viele ADHS-Gehirne empfinden Übergänge als wirklich schmerzhaft, und ein Teil davon ist der abrupte Sprung vom „jetzt" hin zu der plötzlichen Notwendigkeit, „nicht jetzt"-Aufgaben anzuerkennen.`,
      `Zeitblindheit ist real. Sie ist keine Ausrede – sie ist ein Symptom. Und wie alle ADHS-Symptome reagiert sie am besten auf Anpassung statt auf Bestrafung.`,
    ],
  },
  'habit-stacking-adhd': {
    de: [
      `Die meisten Ratschläge zu Gewohnheiten sind für neurotypische Gehirne gemacht. Mach es 21 Tage lang jeden Tag, und es wird automatisch. Wähle einen Auslöser, eine Routine und eine Belohnung. Bau deine Willenskraft auf. Für ADHS-Gehirne scheitern diese Ratschläge oft völlig – nicht weil der Rat falsch wäre, sondern weil er einen konstanten, vorhersehbaren inneren Zustand voraussetzt, den ADHS schlicht nicht liefert.`,
      `Habit Stacking ist anders. Statt zu versuchen, isolierte Gewohnheiten durch Wiederholung aufzubauen, knüpfst du neue Verhaltensweisen an bestehende. Die bestehende Gewohnheit wird zum Auslöser. Das funktioniert für ADHS-Gehirne viel besser, weil es eine der größten Hürden beseitigt: sich daran zu erinnern, das Ding überhaupt zu tun.`,
      `Die wichtigste Anpassung für ADHS ist, kleiner anzufangen, als du denkst. Peinlich klein. Das Ziel einer neuen Gewohnheit ist nicht, jeden Tag die ganze Sache zu tun – sondern das Verhalten automatisch zu machen. Eine Ein-Minuten-Gewohnheit, die du jeden Tag tust, ist unendlich wertvoller als eine 20-Minuten-Gewohnheit, die du dreimal tust und dann aufgibst.`,
      `Knüpf deine neue Gewohnheit an etwas, das ohnehin zuverlässig passiert. Nachdem ich meinen Morgenkaffee gemacht habe → schreibe ich drei Vorsätze für den Tag. Nachdem ich mich an meinen Schreibtisch gesetzt habe → mache ich einen 2-minütigen Brain Dump. Nachdem ich mir abends die Zähne geputzt habe → schreibe ich die erste Aufgabe von morgen auf einen Zettel.`,
      `Rechne mit Unbeständigkeit. ADHS bedeutet, dass deine Kapazität von Tag zu Tag enorm schwankt. An schlechten Tagen sieht deine Gewohnheit vielleicht wie eine 10-Sekunden-Version aus. Das zählt trotzdem. Die Serie ist nicht der Punkt – die Richtung ist es.`,
      `Und wenn du Tage auslässt? Das ist kein Scheitern. Das ist ADHS. Die Gewohnheit zerbricht nicht durch ausgelassene Tage. Sie stirbt nur, wenn du entscheidest, dass sie tot ist. Fang einfach wieder an. Jeder Tag ist eine neue Chance, das Leben aufzubauen, zu dem dein Gehirn fähig ist.`,
    ],
  },
  'do-i-have-adhd-test': {
    de: [
      `Wenn du dich um 1 Uhr nachts dabei ertappt hast, „habe ich ADHS" zu googeln, bist du in guter Gesellschaft. Für sehr viele Erwachsene – besonders Frauen und Menschen, die in der Schule gut waren – kommt die Frage erst auf, wenn das Leben kompliziert genug wird, dass die Bewältigungsstrategien nicht mehr greifen. Ein fordernder Job, Elternschaft oder einfach das eigene Leben zu führen kann lebenslange Muster plötzlich unübersehbar machen.`,
      `ADHS bei Erwachsenen sieht selten aus wie das Klischee eines hyperaktiven Kindes, das von den Wänden abprallt. Es sieht aus wie ein brillanter Mensch, der den Bericht nicht anfangen kann, der morgen fällig ist. Es sieht aus wie das Vergessen von Terminen trotz drei Erinnerungen, vierzig offene Browser-Tabs und hundert weitere im Kopf, und die Erschöpfung durch Aufgaben, die für alle anderen mühelos scheinen. Der Kampf ist real, und er ist keine Frage der Willenskraft.`,
      `Es gibt drei Erscheinungsformen. Der vorwiegend unaufmerksame Typ dreht sich um Konzentration, Gedächtnis und Organisation – das „in Gedanken verloren"-Muster, das oft völlig übersehen wird. Der vorwiegend hyperaktiv-impulsive Typ dreht sich um Unruhe, Impulsivität und emotionale Intensität – das „immer an"-Muster. Der kombinierte Typ, der am häufigsten ist, bedeutet, dass du deutliche Merkmale aus beiden erlebst, und das Gleichgewicht kann sich je nach Stress, Umgebung und der Aufgabe vor dir verschieben.`,
      `Ein paar Anzeichen tauchen immer wieder auf: Schwierigkeiten, Aufgaben zu beginnen, selbst wenn du sie wirklich tun willst, Zeitblindheit (Deadlines wirken weit weg und sind dann plötzlich da), ständig Dinge verlieren, Hyperfokus auf das, was dich interessiert, während alles andere liegen bleibt, und ein Nervensystem, das intensiver reagiert, als die Situation zu verlangen scheint. Keines davon allein bedeutet ADHS – aber ein beständiges Bündel über Jahre hinweg ist es wert, dass man hinschaut.`,
      `Eine Selbsteinschätzung kann dich nicht diagnostizieren, und das sollte sie auch nicht versuchen. Was eine gute Einschätzung tun kann: dir helfen, Muster in Worte zu fassen, die du seit Jahren spürst, aber nie benannt hast, und dir etwas Konkretes geben, das du zu einer Fachperson mitnehmen kannst. Unser kostenloser ADHS-Test führt dich durch 40 Fragen auf Basis der DSM-5-Kriterien und zeigt dir, zu welchem Typ deine Antworten tendieren – in etwa fünf Minuten, ohne Scham und ohne Fachjargon.`,
      `Wenn dich deine Ergebnisse ansprechen, ist der nächste Schritt ein Gespräch mit einer approbierten Psychiaterin oder einem Psychologen, die eine echte Abklärung vornehmen und Optionen besprechen können. Sei in der Zwischenzeit sanft mit dir. Zu verstehen, wie dein Gehirn funktioniert, heißt nicht, etwas Falsches an dir zu finden – es heißt, endlich ein Leben bauen zu dürfen, das zu dem Gehirn passt, das du tatsächlich hast.`,
    ],
  },
  'adhd-paralysis': {
    de: [
      `ADHS-Paralyse gehört zu den frustrierendsten und am wenigsten verstandenen Seiten von ADHS. Es ist die Erfahrung, genau zu wissen, was du tun musst, es wirklich tun zu wollen, die Folgen des Nichtstuns zu verstehen – und trotzdem völlig unfähig zu sein, anzufangen. Du bist nicht faul. Du vermeidest es nicht absichtlich. Du bist erstarrt.`,
      `Es gibt ein paar Spielarten davon. Aufgaben-Paralyse ist die Unfähigkeit, eine einzelne Aufgabe zu beginnen. Entscheidungs-Paralyse trifft, wenn es zu viele Optionen gibt und dein Gehirn sich schlicht weigert, eine zu wählen. Und Überforderungs-Paralyse stellt sich ein, wenn alles gleich dringend wirkt, sodass du am Ende gar nichts tust – oft begleitet von starker Schuld. Alle drei kommen vom selben Ort: einem exekutiven System, das vorübergehend überlastet ist.`,
      `Die Neurowissenschaft erklärt, warum „mach es einfach" nie funktioniert. Eine Aufgabe zu beginnen verlangt vom Gehirn, den Aufwand abzuschätzen, Schritte zu ordnen und genug Dopamin zu erzeugen, um die Bewegung anzustoßen. In ADHS-Gehirnen ist dieses Anstoß-System unzuverlässig. Wenn eine Aufgabe groß, langweilig oder unklar wirkt, kann das Gehirn die Aktivierungsenergie nicht aufbringen – und je mehr du drückst, desto stärker blockiert es.`,
      `Der Ausweg ist fast nie, härter zu drücken. Es ist, den ersten Schritt absurd klein zu machen. Nicht „die Küche putzen", sondern „eine Tasse in die Spüle stellen". Nicht „den Bericht schreiben", sondern „das Dokument öffnen und den Titel tippen". Das Ziel ist nicht, fertig zu werden – es ist, die Starre zu durchbrechen. Bewegung erzeugt Dopamin, und Dopamin macht den nächsten Schritt möglich. Deshalb fühlt sich Schwung so gut an, sobald er einmal beginnt.`,
      `Was sonst noch wirklich hilft: Body Doubling, bei dem du neben einer anderen Person arbeitest (auch per Videoanruf), damit dein Gehirn sich deren Fokus ausleiht. Die Schritte externalisieren, damit sie auf Papier leben statt im Kopf zu kreisen. Einen Timer auf nur fünf Minuten stellen, mit der ausdrücklichen Erlaubnis, danach aufzuhören. Und ein Brain Dump, um das mentale Durcheinander zu klären, bevor du wählst, was zählt. Jedes davon senkt die Aktivierungsenergie, die die Aufgabe verlangt.`,
      `Vor allem: lass die Scham los. Paralyse ist ein Symptom, kein Charakterfehler, und Scham ist Brennstoff für die Starre – sie lässt die Aufgabe noch bedrohlicher wirken, was dein Gehirn noch fester blockiert. Das Freundlichste und Wirksamste, was du tun kannst, ist, einen festgefahrenen Moment als Information zu behandeln, den Schritt zu verkleinern und dir zu erlauben, schlecht anzufangen. Schlecht anzufangen zählt trotzdem als Anfangen.`,
    ],
  },
  'best-planner-for-adhd': {
    de: [
      `Wenn du einen schönen Planer gekauft, ihn neun Tage lang gewissenhaft genutzt und dann zugesehen hast, wie er zum teuren Briefbeschwerer wurde, dann war weder der Planer das Problem noch du. Die meisten Planer sind für neurotypische Gehirne gemacht – sie setzen voraus, dass du daran denkst, sie zu öffnen, dass dich eine ordentliche Liste motiviert und dass du Zeit als steten, vorhersehbaren Fluss erlebst. ADHS-Gehirne funktionieren nicht so, also bringt dich das Werkzeug leise zum Scheitern.`,
      `Ein ADHS-freundlicher Planer muss etwas anderes leisten. Er muss Zeit externalisieren, weil ADHS-Gehirne sie schwer vergehen spüren. Er muss das Anfangen leicht machen, weil der Aufgabenbeginn der schwierigste Teil ist. Und er muss nachsichtig sein, denn ein System, das dich für einen ausgelassenen Tag bestraft, wird in dem Moment aufgegeben, in dem du in Rückstand gerätst – was bei ADHS unvermeidlich und völlig normal ist.`,
      `Das Erste, worauf du achten solltest, ist eingebaute Aufgabenzerlegung. „Event planen" ist lähmend; „dem Veranstaltungsort schreiben, drei Termine auswählen, die Einladung entwerfen" ist machbar. Ein Planer, der dir Raum gibt, Aufgaben in winzige, konkrete Schritte zu zerlegen, beseitigt die größte Hürde, vor der ADHS-Gehirne stehen. Wenn der Planer dir nur eine leere To-do-Zeile gibt, verlangt er von deiner exekutiven Funktion genau die Arbeit, die ihr am schwersten fällt.`,
      `Das Zweite ist eine energiebasierte Struktur statt einer starren Stundenplanung. ADHS-Energie schwankt dramatisch, und ein Planer, der davon ausgeht, dass du jeden Tag pünktlich um 9 Uhr Tiefarbeit leistest, liegt an den meisten Tagen falsch. Rund um deine natürlichen Energiefenster zu planen – fordernde Aufgaben an energiereiche Zeiten, Admin an energiearme – arbeitet mit deinem Gehirn statt gegen es.`,
      `Das Dritte, und am meisten Übersehene, ist eingebaute Freundlichkeit. Die besten ADHS-Planer machen Platz für Brain Dumps, für „gut genug"-Tage, für das Feiern kleiner Erfolge und für das Neuanfangen ohne Schuld. Sie behandeln einen ausgelassenen Tag als frische Seite, nicht als gebrochene Serie. Das ist nicht weich – es ist strategisch, denn Scham ist einer der größten Gründe, warum ADHS-Systeme zusammenbrechen.`,
      `Genau darum ist das bloom focus Toolkit herum gebaut: Planer, die Aufgaben für dich zerlegen, Struktur rund um Energie statt starrer Uhren, und ein Ton, der dir nie das Gefühl gibt, im Rückstand zu sein. Wenn du dir jeden aufgegebenen Planer selbst vorgeworfen hast, war es vielleicht das Design, das versagt hat – nicht deine Disziplin. Das richtige Werkzeug fühlt sich weniger wie ein Test an, den du immer wieder nicht bestehst, und mehr wie eine Hand in deinem Rücken.`,
    ],
  },
  'adhd-in-women': {
    de: [
      `Jahrzehntelang wurde ADHS fast ausschließlich an kleinen Jungen erforscht – den hyperaktiven, die im Unterricht nicht stillsitzen konnten. Das Ergebnis ist ein diagnostisches Bild, das verfehlt, wie ADHS bei Frauen und Mädchen am häufigsten auftritt – weshalb so viele Frauen erst mit dreißig, vierzig oder später diagnostiziert werden, häufig nachdem ein eigenes Kind abgeklärt wird und die Symptome plötzlich vertraut wirken.`,
      `Bei Frauen ist ADHS häufiger unaufmerksam als hyperaktiv – und unaufmerksames ADHS ist leise. Es stört den Unterricht nicht. Es sieht aus wie Tagträumen, wie „zerstreut" oder „schusselig" sein, wie ein kluges Mädchen, das hinter seinem Potenzial zurückbleibt. Weil es niemandem sonst Ärger macht, wird es übersehen, und das Mädchen lernt, es zu maskieren – oft zu enormen inneren Kosten.`,
      `Dieses Maskieren ist ein riesiger Teil der Geschichte. Viele Frauen mit ADHS werden zu intensiven Perfektionistinnen und Über-Vorbereiterinnen und bauen aufwendige Systeme, um ein Gehirn auszugleichen, das sie nicht verstehen. Von außen wirken sie organisiert und leistungsstark. Innen sind sie erschöpft, ängstlich und überzeugt, nur eine verrutschte Maske davon entfernt zu sein, dass alle herausfinden, wie hart sie in Wahrheit arbeiten, um mitzuhalten.`,
      `Deshalb wird ADHS bei Frauen so oft als Angst oder Depression fehldiagnostiziert. Diese Zustände können durchaus gleichzeitig bestehen – aber häufig ist die Angst eine Folge jahrelangen undiagnostizierten ADHS: der chronische Stress verpasster Deadlines, die Scham des Vergessens, der Tribut, doppelt so hart für dasselbe Ergebnis zu arbeiten. Die Angst zu behandeln, ohne das ADHS darunter zu erkennen, erfasst nur die Hälfte des Bildes.`,
      `Hormone fügen eine weitere Ebene hinzu, die die alte Forschung völlig ignoriert hat. Östrogen beeinflusst Dopamin, daher verstärken sich ADHS-Symptome oft prämenstruell, nach der Geburt und in der Perimenopause. Viele Frauen beschreiben, dass ihre Symptome mit vierzig plötzlich unbeherrschbar werden – nicht weil etwas neu falsch ist, sondern weil eine hormonelle Verschiebung den Puffer entfernt hat, auf den sie sich jahrelang unbewusst verlassen haben.`,
      `Wenn sich irgendetwas davon liest wie dein eigenes Tagebuch, dann bist du nicht kaputt, nicht dramatisch und bildest dir nichts ein. Du hast vielleicht einfach ein Gehirn, das nie zu seinen eigenen Bedingungen abgeklärt wurde. Eine Selbsteinschätzung kann dir helfen, das Muster zu benennen, und eine approbierte Fachperson kann dir eine echte Abklärung geben. Es zu verstehen ändert alles – nicht weil du ein anderer Mensch wirst, sondern weil du endlich aufhören darfst, dir selbst Vorwürfe zu machen, einer zu sein.`,
    ],
  },
}

// ---- helpers ----
export function blogTitle(slug: string, lang: Lang, enTitle: string) {
  if (lang === 'en') return enTitle
  return articleMeta[slug]?.[lang]?.title || enTitle
}
export function blogExcerpt(slug: string, lang: Lang, enExcerpt: string) {
  if (lang === 'en') return enExcerpt
  return articleMeta[slug]?.[lang]?.excerpt || enExcerpt
}
export function blogTag(enTag: string, lang: Lang) {
  if (lang === 'en') return enTag
  return blogTagMap[lang][enTag] || enTag
}
export function blogBody(slug: string, lang: Lang): string[] {
  if (lang !== 'en') {
    const t = articleBody[slug]?.[lang]
    if (t && t.length) return t
  }
  return articleContentEN[slug] || []
}
export function readTimeLabel(lang: Lang, raw: string) {
  const n = parseInt(String(raw).replace(/\D+/g, '')) || 0
  if (lang === 'de') return `${n} Min. Lesezeit`
  if (lang === 'fr') return `${n} min de lecture`
  if (lang === 'es') return `${n} min de lectura`
  return raw
}
