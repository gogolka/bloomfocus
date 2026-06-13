'use client'
import { useState } from "react";
import { quiz } from "@/lib/i18n-quiz";
import type { Lang } from "@/lib/i18n";

// Question id + type only — the visible text comes from the locale dictionary
// (quiz[lang].questions), indexed in the same order as this array.
const QUESTIONS = [
  { id:1,  type:"I" }, { id:2,  type:"I" }, { id:3,  type:"I" }, { id:4,  type:"I" },
  { id:5,  type:"I" }, { id:6,  type:"I" }, { id:7,  type:"I" }, { id:8,  type:"I" },
  { id:9,  type:"I" }, { id:10, type:"I" }, { id:11, type:"I" }, { id:12, type:"I" },
  { id:13, type:"I" }, { id:14, type:"I" }, { id:15, type:"I" }, { id:16, type:"I" },
  { id:17, type:"I" }, { id:18, type:"I" }, { id:19, type:"I" }, { id:20, type:"I" },
  { id:21, type:"H" }, { id:22, type:"H" }, { id:23, type:"H" }, { id:24, type:"H" },
  { id:25, type:"H" }, { id:26, type:"H" }, { id:27, type:"H" }, { id:28, type:"H" },
  { id:29, type:"H" }, { id:30, type:"H" }, { id:31, type:"H" }, { id:32, type:"H" },
  { id:33, type:"H" }, { id:34, type:"H" }, { id:35, type:"H" }, { id:36, type:"H" },
  { id:37, type:"H" }, { id:38, type:"H" }, { id:39, type:"H" }, { id:40, type:"H" },
];

// Visual + product meta per result type (shared across locales).
const RESULT_META = {
  negative:    { color:"#A8C5A0", textColor:"#2A6B4A", products:[] as string[] },
  inattentive: { color:"#B8A4E8", textColor:"#5A3EA8", products:["Daily Planner","Brain Dump Journal","Task Decomposer","Habit Tracker"] },
  hyperactive: { color:"#FFB4A2", textColor:"#A84A2A", products:["Dopamine Menu","Weekly Planner","Habit Tracker","Daily Gratitude"] },
  combined:    { color:"#F0C070", textColor:"#8A6010", products:["Full ADHD Toolkit Bundle","Dopamine Menu","Daily Planner","Brain Dump Journal"] },
};
type ResultKey = keyof typeof RESULT_META;

function getResult(answers: Record<number, number>): ResultKey {
  const iQs = QUESTIONS.filter(q=>q.type==="I");
  const hQs = QUESTIONS.filter(q=>q.type==="H");
  const scoreI = iQs.reduce((s,q)=>s+(answers[q.id]||0),0);
  const scoreH = hQs.reduce((s,q)=>s+(answers[q.id]||0),0);
  const pI = scoreI/(iQs.length*4), pH = scoreH/(hQs.length*4);
  const T = 0.42;
  if(pI<T && pH<T) return "negative";
  if(pI>=T && pH<T) return "inattentive";
  if(pI<T && pH>=T) return "hyperactive";
  return "combined";
}

function getScores(answers: Record<number, number>) {
  const iQs = QUESTIONS.filter(q=>q.type==="I");
  const hQs = QUESTIONS.filter(q=>q.type==="H");
  const scoreI = iQs.reduce((s,q)=>s+(answers[q.id]||0),0);
  const scoreH = hQs.reduce((s,q)=>s+(answers[q.id]||0),0);
  return {
    pI: Math.round((scoreI/(iQs.length*4))*100),
    pH: Math.round((scoreH/(hQs.length*4))*100),
  };
}

const C = {
  bg:"#FAFAF8", card:"#FFFFFF",
  purple:"#B8A4E8", purpleDark:"#7B5FCC", purpleLight:"#F0EBFF",
  text:"#1A1814", mid:"#6B6058", soft:"#9B8F88", border:"#E8E4DC",
};

export default function ADHDQuiz({ lang = "en" as Lang }: { lang?: Lang }) {
  const t = quiz[lang] || quiz.en;
  const [step, setStep] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState<ResultKey | null>(null);
  const [scores, setScores] = useState<{pI:number;pH:number} | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const progress = Math.round((current/QUESTIONS.length)*100);
  const q = QUESTIONS[current];

  function selectAnswer(val: number) {
    setSelected(val);
    const newAnswers = {...answers,[q.id]:val};
    setAnswers(newAnswers);
    setTimeout(()=>{
      setSelected(null);
      if(current<QUESTIONS.length-1){
        setCurrent(c=>c+1);
      } else {
        setResult(getResult(newAnswers));
        setScores(getScores(newAnswers));
        setStep("email");
      }
    },280);
  }

  function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    if(!email) return;
    try {
      fetch("/api/quiz-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, result, lang }),
      }).catch(()=>{});
    } catch {}
    setStep("result");
  }

  const meta = result ? RESULT_META[result] : null;
  const R = result ? t.results[result] : null;

  return (
    <div style={{fontFamily:"'DM Sans',system-ui,sans-serif",background:C.bg,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px 16px"}}>
      <div style={{width:"100%",maxWidth:580}}>

        {/* INTRO */}
        {step==="intro" && (
          <div style={{background:C.card,borderRadius:20,overflow:"hidden",border:`1px solid ${C.border}`}}>
            <div style={{background:C.purpleLight,padding:"40px 40px 32px",textAlign:"center"}}>
              <div style={{fontSize:48,marginBottom:16}}>🧠</div>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",color:C.purpleDark,marginBottom:12}}>{t.eyebrow}</div>
              <h1 style={{fontSize:28,fontWeight:700,color:C.text,lineHeight:1.25,marginBottom:12}}>{t.titleA}<br/>{t.titleB}</h1>
              <p style={{fontSize:15,color:C.mid,lineHeight:1.7,maxWidth:420,margin:"0 auto"}}>{t.meta}</p>
            </div>
            <div style={{padding:"32px 40px"}}>
              <div style={{display:"grid",gap:12,marginBottom:28}}>
                {t.cards.map((card,i)=>(
                  <div key={i} style={{display:"flex",gap:14,alignItems:"flex-start",padding:"14px 16px",background:"#FAFAF8",borderRadius:10,border:`1px solid ${C.border}`}}>
                    <div style={{fontSize:20,flexShrink:0}}>{["🎯","📋","🔒"][i]}</div>
                    <div>
                      <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:2}}>{card.label}</div>
                      <div style={{fontSize:13,color:C.mid,lineHeight:1.6}}>{card.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{background:"#FFF8F0",border:"1px solid #FFD6C4",borderRadius:12,padding:"16px 18px",marginBottom:24}}>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#A86040",marginBottom:6}}>{t.importantNotice}</div>
                <p style={{fontSize:12,color:"#6B4A38",lineHeight:1.7,margin:0}}>{t.disclaimer}</p>
              </div>
              <button onClick={()=>setStep("quiz")} style={{background:C.purpleDark,color:"#fff",border:"none",borderRadius:12,padding:"16px",fontSize:16,fontWeight:600,cursor:"pointer",width:"100%"}}>
                {t.startBtn}
              </button>
            </div>
          </div>
        )}

        {/* QUIZ */}
        {step==="quiz" && (
          <div style={{background:C.card,borderRadius:20,padding:"36px 36px 32px",border:`1px solid ${C.border}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <span style={{fontSize:12,fontWeight:600,color:q.type==="I"?C.purpleDark:"#C06040",background:q.type==="I"?C.purpleLight:"#FFF0EB",borderRadius:100,padding:"3px 10px"}}>
                {q.type==="I"?t.catFocus:t.catEnergy}
              </span>
              <span style={{fontSize:12,color:C.soft}}>{current+1} / {QUESTIONS.length}</span>
            </div>
            <div style={{background:"#F0EBFF",borderRadius:100,height:5,overflow:"hidden",marginBottom:28}}>
              <div style={{height:"100%",width:`${progress}%`,background:C.purpleDark,borderRadius:100,transition:"width .35s ease"}}/>
            </div>
            <p style={{fontSize:18,fontWeight:600,color:C.text,lineHeight:1.5,marginBottom:24,minHeight:64}}>{t.questions[current]}</p>
            <div style={{display:"grid",gap:8,marginBottom:20}}>
              {t.options.map((label,val)=>(
                <button key={val} onClick={()=>selectAnswer(val)} style={{
                  background: selected===val ? C.purpleDark : answers[q.id]===val ? C.purpleLight : "#FAFAF8",
                  border:`1.5px solid ${selected===val?C.purpleDark:answers[q.id]===val?C.purpleDark:C.border}`,
                  borderRadius:10,padding:"13px 18px",fontSize:14,
                  fontWeight: answers[q.id]===val||selected===val ? 600 : 400,
                  color: selected===val ? "#fff" : answers[q.id]===val ? C.purpleDark : C.text,
                  cursor:"pointer",textAlign:"left",transition:"all .15s",
                  display:"flex",alignItems:"center",justifyContent:"space-between",
                }}>
                  <span>{label}</span>
                  {(answers[q.id]===val||selected===val) && <span>✓</span>}
                </button>
              ))}
            </div>
            {current>0 && (
              <button onClick={()=>setCurrent(c=>c-1)} style={{background:"transparent",border:"none",color:C.soft,fontSize:13,cursor:"pointer",padding:0}}>
                {t.prevBtn}
              </button>
            )}
          </div>
        )}

        {/* EMAIL GATE */}
        {step==="email" && (
          <div style={{background:C.card,borderRadius:20,padding:"48px 40px",border:`1px solid ${C.border}`,textAlign:"center"}}>
            <div style={{width:64,height:64,borderRadius:"50%",background:C.purpleLight,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",fontSize:28}}>✉️</div>
            <h2 style={{fontSize:24,fontWeight:700,color:C.text,marginBottom:12}}>{t.emailTitle}</h2>
            <p style={{fontSize:15,color:C.mid,lineHeight:1.7,marginBottom:28,maxWidth:400,margin:"0 auto 28px"}}>{t.emailSub}</p>
            <form onSubmit={handleEmail} style={{display:"grid",gap:12,textAlign:"left"}}>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder={t.namePlaceholder} style={{background:"#FAFAF8",border:`1.5px solid ${C.border}`,borderRadius:10,padding:"14px 16px",fontSize:15,fontFamily:"inherit",outline:"none",color:C.text}}/>
              <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder={t.emailPlaceholder} style={{background:"#FAFAF8",border:`1.5px solid ${C.border}`,borderRadius:10,padding:"14px 16px",fontSize:15,fontFamily:"inherit",outline:"none",color:C.text}}/>
              <button type="submit" style={{background:C.purpleDark,color:"#fff",border:"none",borderRadius:12,padding:"16px",fontSize:16,fontWeight:600,cursor:"pointer"}}>
                {t.seeResult}
              </button>
            </form>
            <p style={{fontSize:11,color:C.soft,marginTop:14}}>{t.noSpam}</p>
          </div>
        )}

        {/* RESULT */}
        {step==="result" && R && meta && (
          <div style={{display:"grid",gap:16}}>
            <div style={{background:C.card,borderRadius:20,overflow:"hidden",border:`1px solid ${C.border}`}}>
              <div style={{background:meta.color+"22",borderTop:`4px solid ${meta.color}`,padding:"32px 36px"}}>
                <div style={{display:"inline-block",background:meta.color+"33",borderRadius:100,padding:"4px 14px",fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:meta.textColor,marginBottom:16}}>
                  {t.yourResult}
                </div>
                <h2 style={{fontSize:26,fontWeight:700,color:C.text,lineHeight:1.2,marginBottom:6}}>{R.title}</h2>
                <p style={{fontSize:14,fontWeight:600,color:meta.textColor,marginBottom:20}}>{R.subtitle}</p>
                <p style={{fontSize:15,color:C.mid,lineHeight:1.8}}>{R.desc}</p>
                {R.desc2 && <p style={{fontSize:15,color:C.mid,lineHeight:1.8,marginTop:14}}>{R.desc2}</p>}
              </div>
              <div style={{padding:"20px 36px",background:"#FFF8F0",borderTop:"1px solid #FFD6C4"}}>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#A86040",marginBottom:6}}>
                  {t.pleaseRemember}
                </div>
                <p style={{fontSize:12,color:"#6B4A38",lineHeight:1.7,margin:0}}>
                  {t.resultDisclaimer}
                </p>
              </div>
            </div>

            {scores && (
              <div style={{background:C.card,borderRadius:20,padding:"24px 28px",border:`1px solid ${C.border}`}}>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:C.purpleDark,marginBottom:16}}>{t.scoreTitle}</div>
                {[[t.inattentiveTraits,scores.pI,"#B8A4E8"],[t.hyperactiveTraits,scores.pH,"#FFB4A2"]].map((row:any,i:number)=>(
                  <div key={i} style={{marginBottom:i===0?16:0}}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:C.text,marginBottom:6}}>
                      <span>{row[0]}</span><span style={{fontWeight:700,color:C.mid}}>{row[1]}%</span>
                    </div>
                    <div style={{background:"#F0EBFF",borderRadius:100,height:10,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${row[1]}%`,background:row[2],borderRadius:100}}/>
                    </div>
                  </div>
                ))}
                <p style={{fontSize:12,color:C.soft,lineHeight:1.7,marginTop:16,marginBottom:0}}>{t.scoreNote}</p>
              </div>
            )}

            {[
              R.strengths && {label:t.secStrengths,emoji:"🌟",items:R.strengths,color:"#5E9E4A"},
              R.challenges && {label:t.secChallenges,emoji:"🌧",items:R.challenges,color:"#C07A3E"},
              R.strategies && {label:t.secStrategies,emoji:"🛠",items:R.strategies,color:C.purpleDark},
            ].filter(Boolean).map((sec:any,i:number)=>(
              <div key={i} style={{background:C.card,borderRadius:20,padding:"24px 28px",border:`1px solid ${C.border}`}}>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:sec.color,marginBottom:16}}>{sec.emoji} {sec.label}</div>
                <div style={{display:"grid",gap:10}}>
                  {sec.items.map((it:string,j:number)=>(
                    <div key={j} style={{display:"flex",gap:10,alignItems:"flex-start",fontSize:14,color:C.text,lineHeight:1.6}}>
                      <span style={{color:sec.color,fontWeight:700,flexShrink:0,marginTop:1}}>›</span><span>{it}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {R.nextSteps && (
              <div style={{background:C.card,borderRadius:20,padding:"24px 28px",border:`1px solid ${C.border}`}}>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:C.purpleDark,marginBottom:12}}>{t.nextStepsLabel}</div>
                <p style={{fontSize:14,color:C.mid,lineHeight:1.8,margin:0}}>{R.nextSteps}</p>
              </div>
            )}

            {meta.products.length>0 && (
              <div style={{background:C.purpleLight,borderRadius:20,padding:"28px 36px",border:`1px solid ${C.purpleDark}22`}}>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:C.purpleDark,marginBottom:16}}>
                  {t.recommendedLabel}
                </div>
                <div style={{display:"grid",gap:8,marginBottom:24}}>
                  {meta.products.map((p: string,i: number)=>(
                    <div key={i} style={{background:"#fff",borderRadius:10,padding:"12px 16px",display:"flex",alignItems:"center",gap:10,fontSize:14,color:C.text,fontWeight:500}}>
                      <span style={{color:C.purpleDark,fontWeight:700}}>→</span>{p}
                    </div>
                  ))}
                </div>
                <div style={{background:C.purpleDark,borderRadius:12,padding:"16px 20px",textAlign:"center",marginBottom:16}}>
                  <p style={{fontSize:12,color:"rgba(255,255,255,.65)",margin:"0 0 4px"}}>{t.discountNote}</p>
                  <p style={{fontSize:24,fontWeight:700,color:"#fff",letterSpacing:".12em",margin:"0 0 4px"}}>BLOOM15</p>
                  <p style={{fontSize:11,color:"rgba(255,255,255,.5)",margin:0}}>{t.discountSub}</p>
                </div>
                <a href="https://bloomfocus.org/shop" style={{display:"block",background:C.purpleDark,color:"#fff",borderRadius:12,padding:"15px",fontSize:15,fontWeight:600,cursor:"pointer",textAlign:"center",textDecoration:"none"}}>
                  {t.shopBtn}
                </a>
              </div>
            )}

            <button onClick={()=>{setStep("intro");setCurrent(0);setAnswers({});setEmail("");setResult(null);setScores(null);setSelected(null);}} style={{background:"transparent",border:`1px solid ${C.border}`,borderRadius:10,padding:"12px",fontSize:13,color:C.soft,cursor:"pointer"}}>
              {t.retake}
            </button>
          </div>
        )}

        <p style={{textAlign:"center",fontSize:11,color:C.soft,marginTop:16}}>{t.footerNote}</p>
      </div>
    </div>
  );
}
